const addEdge = (id, source, sourceHandleId, target, targetHandleId, edges) => {
  edges.push({
    id,
    source,
    sourceHandle: sourceHandleId,
    target,
    targetHandle: targetHandleId,
  });
};

const getTableDataAndEdges = (fetchedTables = []) => {
  const edges = [];

  const tableData = fetchedTables.map((table) => ({
    tableId: table.id,
    tableName: table.name,
    columns: table.schema.Columns.map((col) => ({
      ColumnName: col.ColumnName,
      dataType: col.DataType,
      isNullable: col.IsNullable || false,
      isPrimaryKey: col.isPrimaryKey || false,
      isUnique: col.isUnique || false,
      isIdentity: col.isIdentity || false,
    })),
  }));

  for (const table of fetchedTables)
    for (const constraint of table.schema.Constraints)
      if (constraint.ConstraintType === "FOREIGN KEY") {
        const sourceTableName = table.name;
        const sourceColumnName = constraint.ColumnName;

        const targetTableName = constraint.ForeignTableName;
        const targetColumnName = constraint.ForeignColumnName;

        const sourceHandle = sourceTableName + sourceColumnName;

        const targetHandle = targetTableName + targetColumnName;

        addEdge(
          sourceHandle + targetHandle,
          sourceTableName,
          sourceHandle,
          targetTableName,
          targetHandle,
          edges,
        );

        const sourceTable = tableData.find(
          (t) => t.tableName === sourceTableName,
        );
        const sourceColumn = sourceTable.columns.find(
          (c) => c.ColumnName === sourceColumnName,
        );

        sourceColumn.sourceId = sourceHandle;

        const targetTable = tableData.find(
          (t) => t.tableName === targetTableName,
        );
        const targetColumn = targetTable.columns.find(
          (c) => c.ColumnName === targetColumnName,
        );

        targetColumn.targetId = targetHandle;
      }

  const nodes = tableData.map((table) => ({
    id: table.tableName,
    type: "tableNode",
    position: { x: 0, y: 0 },
    data: table,
  }));

  return {
    edges,
    nodes,
  };
};

export const getTableDataAndEdges2 = (fetchedTables = []) => {
  const edges = [];

  const tableData = fetchedTables.map((table) => ({
    tableId: table.id,
    tableName: table.TableName,
    columns: table.Columns.map((col) => ({
      ColumnName: col.ColumnName,
      dataType: col.DataType,
      isNullable: col.IsNullable || false,
      isPrimaryKey: col.isPrimaryKey || false,
      isUnique: col.isUnique || false,
      isIdentity: col.isIdentity || false,
    })),
  }));

  for (const table of fetchedTables)
    for (const constraint of table.Constraints)
      if (constraint.ConstraintType === "FOREIGN KEY") {
        const sourceTableName = table.TableName;
        const sourceColumnName = constraint.ColumnName;

        const targetTableName = constraint.ForeignTableName;
        const targetColumnName = constraint.ForeignColumnName;

        const sourceHandle = sourceTableName + sourceColumnName;

        const targetHandle = targetTableName + targetColumnName;

        addEdge(
          sourceHandle + targetHandle,
          sourceTableName,
          sourceHandle,
          targetTableName,
          targetHandle,
          edges,
        );

        const sourceTable = tableData.find(
          (t) => t.tableName === sourceTableName,
        );

        const sourceColumn = sourceTable.columns.find(
          (c) => c.ColumnName === sourceColumnName,
        );

        sourceColumn.sourceId = sourceHandle;

        const targetTable = tableData.find(
          (t) => t.tableName === targetTableName,
        );
        const targetColumn = targetTable.columns.find(
          (c) => c.ColumnName === targetColumnName,
        );

        targetColumn.targetId = targetHandle;
      }

  const nodes = tableData.map((table) => ({
    id: table.tableName,
    type: "tableNode",
    position: { x: 0, y: 0 },
    data: table,
  }));

  return {
    edges,
    nodes,
  };
};

export default getTableDataAndEdges;
