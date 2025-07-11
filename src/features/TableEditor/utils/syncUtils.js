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
    // Format the payload to match the expected structure
    const payload = {
      name: tableData.name,
      description: tableData.description || "",
      schema: {
        TableName: tableData.name,
        Columns:
          tableData.schema?.Columns?.map((column) => ({
            TableName: tableData.name,
            ColumnName: column.ColumnName,
            DataType: column.DataType?.toLowerCase(),
            IsNullable:
              column.IsNullable !== undefined ? column.IsNullable : null,
            ColumnDefault: null,
            // For integer types, CharacterMaximumLength must be null
            CharacterMaximumLength:
              column.DataType?.toLowerCase() === "integer"
                ? null
                : column.CharacterMaximumLength,
            NumericPrecision:
              column.DataType?.toLowerCase() === "integer" ? 32 : null,
            NumericScale:
              column.DataType?.toLowerCase() === "integer" ? 0 : null,
            OrdinalPosition: column.OrdinalPosition || null,
          })) || [],
        Constraints:
          tableData.schema?.Constraints?.map((constraint) => {
            const constraintPayload = {
              TableName: tableData.name,
              ConstraintName:
                constraint.ConstraintName ||
                `${
                  tableData.name
                }_${constraint.ConstraintType?.toLowerCase().replace(
                  " ",
                  "_",
                )}_${Date.now()}`,
              ConstraintType: constraint.ConstraintType,
              ColumnName: constraint.ColumnName,
              ForeignTableName: null,
              ForeignColumnName: null,
              CheckClause: null,
              OrdinalPosition: null,
            };

            // Add specific constraint properties based on type
            if (constraint.ConstraintType === "PRIMARY KEY") {
              constraintPayload.OrdinalPosition = 1;
            } else if (
              constraint.ConstraintType === "FOREIGN KEY" &&
              constraint.ForeignTableName &&
              constraint.ForeignColumnName
            ) {
              constraintPayload.ForeignTableName = constraint.ForeignTableName;
              constraintPayload.ForeignColumnName =
                constraint.ForeignColumnName;
            } else if (
              constraint.ConstraintType === "CHECK" &&
              constraint.CheckClause
            ) {
              constraintPayload.CheckClause = constraint.CheckClause;
            }

            return constraintPayload;
          }) || [],
        // Handle the case when Indexes is null
        Indexes: tableData.schema?.Indexes || null,
      },
    };

    // Send the payload to the API
    const result = await createTable(projectId, payload);

    // If successful, return the result from the backend
    if (result) {
      return {
        ...tableData,
        oid: result.oid || `table_oid_${Date.now()}`,
        id: result.id || tableData.id,
      };
    }

    return null;
  } catch (error) {
    console.error("Failed to sync table with backend:", error);
    throw error;
  }
};
