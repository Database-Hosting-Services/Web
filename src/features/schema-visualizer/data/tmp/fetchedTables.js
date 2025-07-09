const fetchedTables = [
  {
    id: "1",
    name: "users",
    schema: {
      Columns: [
        {
          ColumnName: "id",
          DataType: "serial",
          IsNullable: false,
          isPrimaryKey: true,
          isUnique: true,
          isIdentity: true,
        },
        {
          ColumnName: "email",
          DataType: "varchar(255)",
          IsNullable: false,
          isPrimaryKey: false,
          isUnique: true,
          isIdentity: false,
        },
        {
          ColumnName: "created_at",
          DataType: "timestamp",
          IsNullable: false,
          isPrimaryKey: false,
          isUnique: false,
          isIdentity: false,
        },
      ],
      Constraints: [],
    },
  },
  {
    id: "2",
    name: "posts",
    schema: {
      Columns: [
        {
          ColumnName: "id",
          DataType: "serial",
          IsNullable: false,
          isPrimaryKey: true,
          isUnique: true,
          isIdentity: true,
        },
        {
          ColumnName: "title",
          DataType: "varchar(100)",
          IsNullable: false,
          isPrimaryKey: false,
          isUnique: false,
          isIdentity: false,
        },
        {
          ColumnName: "user_id",
          DataType: "integer",
          IsNullable: false,
          isPrimaryKey: false,
          isUnique: false,
          isIdentity: false,
        },
      ],
      Constraints: [
        {
          ColumnName: "user_id",
          ForeignTableName: "users",
          ForeignColumnName: "id",
        },
      ],
    },
  },
  {
    id: "3",
    name: "comments",
    schema: {
      Columns: [
        {
          ColumnName: "id",
          DataType: "serial",
          IsNullable: false,
          isPrimaryKey: true,
          isUnique: true,
          isIdentity: true,
        },
        {
          ColumnName: "content",
          DataType: "text",
          IsNullable: false,
          isPrimaryKey: false,
          isUnique: false,
          isIdentity: false,
        },
        {
          ColumnName: "post_id",
          DataType: "integer",
          IsNullable: false,
          isPrimaryKey: false,
          isUnique: false,
          isIdentity: false,
        },
        {
          ColumnName: "user_id",
          DataType: "integer",
          IsNullable: false,
          isPrimaryKey: false,
          isUnique: false,
          isIdentity: false,
        },
      ],
      Constraints: [
        {
          ColumnName: "post_id",
          ForeignTableName: "posts",
          ForeignColumnName: "id",
        },
        {
          ColumnName: "user_id",
          ForeignTableName: "users",
          ForeignColumnName: "id",
        },
      ],
    },
  },
];

export default fetchedTables;
