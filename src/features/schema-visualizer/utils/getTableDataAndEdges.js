const addEdge = (id, source, sourceHandleId, target, targetHandleId, edges) => {
  edges.push({
    id,
    source,
    sourceHandle: sourceHandleId,
    target,
    targetHandle: targetHandleId,
  });
};

export const getTableDataAndEdges = (fetchedTables = []) => {
  const edges = [];

  const tableData = fetchedTables.map((table) => ({
    tableId: table.id,
    tableName: table.name,
    columns: table.schema.Columns.map((col) => ({
      ColumnName: col.ColumnName,
      dataType: col.DataType,
      isNullable: col.IsNullable,
      isPrimaryKey: col.isPrimaryKey,
      isUnique: col.isUnique,
      isIdentity: col.isIdentity,
    })),
  }));

  for (const table of fetchedTables)
    for (const constraint of table.schema.Constraints)
      if (constraint.ForeignColumnName && constraint.ForeignColumnName !== "") {
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

  return {
    edges,
    tableData,
  };
};
