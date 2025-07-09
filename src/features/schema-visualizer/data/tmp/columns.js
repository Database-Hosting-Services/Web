const tmpColumns = [
  {
    ColumnName: "id",
    dataType: "serial",
    isPrimaryKey: true,
    isIdentity: true,
    isNullable: false,
  },
  {
    ColumnName: "email",
    dataType: "varchar(255)",
    isUnique: true,
    isNullable: false,
  },
  {
    ColumnName: "created_at",
    dataType: "timestamp",
    isNullable: false,
    defaultValue: "CURRENT_TIMESTAMP",
  },
  {
    ColumnName: "status",
    dataType: "enum",
    isNullable: false,
    defaultValue: "active",
  },
  {
    ColumnName: "profile_id",
    dataType: "int8",
    isNullable: true,
    isForeignKey: true,
  },
  { ColumnName: "last_login", dataType: "timestamp", isNullable: true },
];

export default tmpColumns;
