import { createTable } from "../api";

/**
 * Syncs table data with the backend by creating a new table
 *
 * @param {string|number} projectId - The ID of the project
 * @param {object} tableData - The table data to be synchronized
 * @returns {Promise<object|null>} - The synchronized table data with backend-generated ID and OID, or null on failure
 */
export const syncTableWithBackend = async (projectId, tableData) => {
  try {
    // Create a deep copy of the tableData to avoid modifying the original object
    const tableDataCopy = JSON.parse(JSON.stringify(tableData));

    // Debug logging for the incoming tableData
    console.log("syncTableWithBackend received:", {
      tableData: tableDataCopy,
      hasConstraints: !!tableDataCopy?.schema?.Constraints,
      constraintsCount: tableDataCopy?.schema?.Constraints?.length || 0,
    });

    // Validate constraints before processing
    if (tableDataCopy?.schema?.Constraints) {
      // Log any foreign key constraints for debugging
      const foreignKeyConstraints = tableDataCopy.schema.Constraints.filter(
        (c) => c.ConstraintType === "FOREIGN KEY",
      );

      console.log(
        "Foreign key constraints before sync:",
        foreignKeyConstraints,
      );

      // Log primary key constraints for debugging
      const primaryKeyConstraints = tableDataCopy.schema.Constraints.filter(
        (c) => c.ConstraintType === "PRIMARY KEY",
      );

      console.log(
        "PRIMARY KEY constraints before sync:",
        primaryKeyConstraints,
      );

      // Verify PRIMARY KEY constraints have proper names that include the column name
      primaryKeyConstraints.forEach((constraint) => {
        if (!constraint.ConstraintName.includes(constraint.ColumnName)) {
          console.warn(
            "PRIMARY KEY constraint name does not include column name:",
            {
              constraintName: constraint.ConstraintName,
              columnName: constraint.ColumnName,
              tableName: constraint.TableName,
            },
          );

          // Update the constraint name to include the column name
          constraint.ConstraintName = `${
            constraint.TableName || tableDataCopy.name
          }_pk_${constraint.ColumnName}`;
          console.log(
            "Updated PRIMARY KEY constraint name:",
            constraint.ConstraintName,
          );
        }
      });

      // Create a new array with fixed constraints rather than modifying the original
      const updatedConstraints = tableDataCopy.schema.Constraints.map(
        (constraint) => {
          if (constraint.ConstraintType === "FOREIGN KEY") {
            // Make sure these values are never null
            return {
              ...constraint,
              ForeignTableName: constraint.ForeignTableName || "",
              ForeignColumnName: constraint.ForeignColumnName || "",
            };
          }
          return constraint;
        },
      );

      // Assign the new array to the constraints property
      tableDataCopy.schema.Constraints = updatedConstraints;
    }

    // Format the payload to match the expected structure
    const payload = {
      name: tableDataCopy.name,
      description: tableDataCopy.description || "",
      schema: {
        TableName: tableDataCopy.name,
        Columns:
          tableDataCopy.schema?.Columns?.map((column) => {
            // Check if this is a VARCHAR column
            const isVarcharType = column.DataType?.toLowerCase() === "varchar";

            // Determine the correct data type string
            let dataType = column.DataType?.toLowerCase();
            if (isVarcharType) {
              dataType = "varchar(256)"; // Add default length for varchar
            }

            return {
              TableName: tableDataCopy.name,
              ColumnName: column.ColumnName,
              DataType: dataType,
              IsNullable:
                column.IsNullable !== undefined ? column.IsNullable : null,
              ColumnDefault: null,
              // For integer types, CharacterMaximumLength must be null
              // For varchar types, set default length of 256
              CharacterMaximumLength:
                column.DataType?.toLowerCase() === "integer"
                  ? null
                  : isVarcharType
                  ? 256
                  : column.CharacterMaximumLength,
              NumericPrecision:
                column.DataType?.toLowerCase() === "integer" ? 32 : null,
              NumericScale:
                column.DataType?.toLowerCase() === "integer" ? 0 : null,
              OrdinalPosition: column.OrdinalPosition || null,
            };
          }) || [],
        Constraints:
          tableDataCopy.schema?.Constraints?.map((constraint) => {
            const constraintPayload = {
              TableName: tableDataCopy.name,
              ConstraintName:
                constraint.ConstraintName ||
                `${
                  tableDataCopy.name
                }_${constraint.ConstraintType?.toLowerCase().replace(
                  " ",
                  "_",
                )}_${constraint.ColumnName}_${Date.now()}`,
              ConstraintType: constraint.ConstraintType,
              ColumnName: constraint.ColumnName,
              ForeignTableName: constraint.ForeignTableName || null,
              ForeignColumnName: constraint.ForeignColumnName || null,
              CheckClause: null,
              OrdinalPosition: null,
            };

            // Log all constraints before modifications
            console.log(
              `Processing constraint of type ${constraint.ConstraintType}:`,
              {
                original: constraint,
                columnName: constraint.ColumnName,
              },
            );

            // Add specific constraint properties based on type
            if (constraint.ConstraintType === "PRIMARY KEY") {
              constraintPayload.OrdinalPosition = 1;

              // Log primary key constraint details for debugging
              console.log("Processing PRIMARY KEY constraint:", {
                original: constraint,
                processed: constraintPayload,
                columnName: constraint.ColumnName,
                tableName: tableDataCopy.name,
                constraintName: constraintPayload.ConstraintName,
              });

              // Ensure the constraint name is properly formatted for PRIMARY KEY
              if (
                !constraintPayload.ConstraintName.includes(
                  constraint.ColumnName,
                )
              ) {
                console.warn(
                  "PRIMARY KEY constraint name might not include column name:",
                  {
                    constraintName: constraintPayload.ConstraintName,
                    columnName: constraint.ColumnName,
                  },
                );
              }
            } else if (constraint.ConstraintType === "FOREIGN KEY") {
              // Ensure foreign key constraints always have these values set properly
              constraintPayload.ForeignTableName =
                constraint.ForeignTableName || "";
              constraintPayload.ForeignColumnName =
                constraint.ForeignColumnName || "";

              // Log foreign key constraint details for debugging
              console.log("Processing foreign key constraint:", {
                original: constraint,
                processed: constraintPayload,
                hasForeignTable: !!constraint.ForeignTableName,
                hasForeignColumn: !!constraint.ForeignColumnName,
              });

              // Log warning if values are missing
              if (
                !constraint.ForeignTableName ||
                !constraint.ForeignColumnName
              ) {
                console.warn(
                  "Foreign key constraint missing required values:",
                  constraint,
                );
              }
            } else if (
              constraint.ConstraintType === "CHECK" &&
              constraint.CheckClause
            ) {
              constraintPayload.CheckClause = constraint.CheckClause;
            }

            return constraintPayload;
          }) || [],
        // Handle the case when Indexes is null or needs TableName set
        Indexes: tableDataCopy.schema?.Indexes
          ? tableDataCopy.schema.Indexes.map((index) => ({
              ...index,
              TableName: tableDataCopy.name, // Ensure TableName is set for each index
            }))
          : null,
      },
      // project_id is explicitly NOT included here
    };

    // Send the payload to the API - project ID is passed as a parameter in the URL
    const result = await createTable(projectId, payload);

    // If successful, return the result from the backend
    if (result) {
      return {
        ...tableData, // Return the original tableData with the new id and oid
        oid: result.oid || `table_oid_${Date.now()}`,
        // id: result.id || tableData.id,
      };
    }

    return null;
  } catch (error) {
    console.error("Failed to sync table with backend:", error);
    throw error;
  }
};
