import { createSlice } from "@reduxjs/toolkit";

// Initial state for the table editor
const initialState = {
  isModalOpen: false,
  isColumnModalOpen: false,
  selectedTableId: null,
  tables: [
    {
      description: "Stores user information",
      id: 1,
      name: "users",
      oid: "user_table_oid_123",
      project_id: 1,
      schema: {
        Columns: [
          {
            CharacterMaximumLength: 255,
            ColumnDefault: "",
            ColumnName: "id",
            DataType: "INTEGER",
            IsNullable: false,
            NumericPrecision: 32,
            NumericScale: 0,
            OrdinalPosition: 1,
            TableName: "users",
          },
          {
            CharacterMaximumLength: 50,
            ColumnDefault: "",
            ColumnName: "name",
            DataType: "VARCHAR",
            IsNullable: false,
            NumericPrecision: null,
            NumericScale: null,
            OrdinalPosition: 2,
            TableName: "users",
          },
          {
            CharacterMaximumLength: 10,
            ColumnDefault: "",
            ColumnName: "major",
            DataType: "VARCHAR",
            IsNullable: true,
            NumericPrecision: null,
            NumericScale: null,
            OrdinalPosition: 3,
            TableName: "users",
          },
        ],
        Constraints: [
          {
            CheckClause: "",
            ColumnName: "id",
            ConstraintName: "users_pkey",
            ConstraintType: "PRIMARY KEY",
            ForeignColumnName: "",
            ForeignTableName: "",
            OrdinalPosition: 1,
            TableName: "users",
          },
        ],
        Indexes: [
          {
            ColumnName: "id",
            IndexName: "users_pkey",
            IndexType: "btree",
            IsPrimary: true,
            IsUnique: true,
            TableName: "users",
          },
        ],
        TableName: "users",
      },
      data: [
        { id: 1, name: "zyad", major: "CS" },
        { id: 3, name: "rana", major: "IS" },
        { id: 2, name: "omar", major: "CS" },
      ],
    },
    {
      description: "Stores blog posts",
      id: 2,
      name: "posts",
      oid: "posts_table_oid_456",
      project_id: 1,
      schema: {
        Columns: [
          {
            CharacterMaximumLength: null,
            ColumnDefault: "",
            ColumnName: "id",
            DataType: "INTEGER",
            IsNullable: false,
            NumericPrecision: 32,
            NumericScale: 0,
            OrdinalPosition: 1,
            TableName: "posts",
          },
          {
            CharacterMaximumLength: 200,
            ColumnDefault: "",
            ColumnName: "name",
            DataType: "VARCHAR",
            IsNullable: false,
            NumericPrecision: null,
            NumericScale: null,
            OrdinalPosition: 2,
            TableName: "posts",
          },
          {
            CharacterMaximumLength: 50,
            ColumnDefault: "",
            ColumnName: "major",
            DataType: "VARCHAR",
            IsNullable: true,
            NumericPrecision: null,
            NumericScale: null,
            OrdinalPosition: 3,
            TableName: "posts",
          },
        ],
        Constraints: [
          {
            CheckClause: "",
            ColumnName: "id",
            ConstraintName: "posts_pkey",
            ConstraintType: "PRIMARY KEY",
            ForeignColumnName: "",
            ForeignTableName: "",
            OrdinalPosition: 1,
            TableName: "posts",
          },
        ],
        Indexes: [
          {
            ColumnName: "id",
            IndexName: "posts_pkey",
            IndexType: "btree",
            IsPrimary: true,
            IsUnique: true,
            TableName: "posts",
          },
        ],
        TableName: "posts",
      },
      data: [
        { id: 1, name: "First Post", major: "Technology" },
        { id: 2, name: "Second Post", major: "Science" },
      ],
    },
  ],
  tableData: {
    name: "",
    description: "",
    project_id: 1,
    schema: {
      Columns: [
        {
          CharacterMaximumLength: 1,
          ColumnDefault: "",
          ColumnName: "id",
          DataType: "INTEGER",
          IsNullable: false,
          NumericPrecision: 1,
          NumericScale: 1,
          OrdinalPosition: 1,
          TableName: "",
        },
        {
          CharacterMaximumLength: 1,
          ColumnDefault: "",
          ColumnName: "",
          DataType: "VARCHAR",
          IsNullable: true,
          NumericPrecision: 1,
          NumericScale: 1,
          OrdinalPosition: 2,
          TableName: "",
        },
      ],
      Constraints: [
        {
          CheckClause: "",
          ColumnName: "id",
          ConstraintName: "pk_id",
          ConstraintType: "PRIMARY KEY",
          ForeignColumnName: "",
          ForeignTableName: "",
          OrdinalPosition: 1,
          TableName: "",
        },
      ],
      Indexes: [
        {
          ColumnName: "id",
          IndexName: "pk_id",
          IndexType: "btree",
          IsPrimary: true,
          IsUnique: true,
          TableName: "",
        },
      ],
      TableName: "",
    },
  },
};

// Create the tableEditorSlice
const tableEditorSlice = createSlice({
  name: "tableEditor",
  initialState,
  reducers: {
    // Open the create table modal
    openCreateTableModal: (state) => {
      state.isModalOpen = true;
    },
    // Close the create table modal
    closeCreateTableModal: (state) => {
      state.isModalOpen = false;
    },
    // Open the add column modal
    openColumnModal: (state) => {
      state.isColumnModalOpen = true;
    },
    // Close the add column modal
    closeColumnModal: (state) => {
      state.isColumnModalOpen = false;
    },
    // Update the table data
    updateTableData: (state, action) => {
      state.tableData = {
        ...state.tableData,
        ...action.payload,
      };
    },
    // Reset the table data to its initial state
    resetTableData: (state) => {
      state.tableData = initialState.tableData;
    },
    // Add a table to the list
    addTable: (state, action) => {
      state.tables.push(action.payload);
    },
    // Update tables list
    updateTables: (state, action) => {
      state.tables = action.payload;
    },
    // Set selected table
    setSelectedTable: (state, action) => {
      state.selectedTableId = action.payload;
    },
    // Handle tables data from API
    setTablesFromApi: (state, action) => {
      // Expecting format: { data: [...tables], message: "Operation successful" }
      if (action.payload && action.payload.data) {
        // Store the tables from the API response
        const tablesWithData = action.payload.data.map((table) => ({
          ...table,
          data: [],
        }));
        state.tables = tablesWithData;
      }
    },
    // Add a direct tables setter action
    setTables: (state, action) => {
      // Set tables directly from an array
      state.tables = action.payload;
    },
  },
});

// Export the actions
export const {
  openCreateTableModal,
  closeCreateTableModal,
  openColumnModal,
  closeColumnModal,
  updateTableData,
  resetTableData,
  addTable,
  updateTables,
  setSelectedTable,
  setTablesFromApi,
  setTables,
} = tableEditorSlice.actions;

// Export the reducer
export default tableEditorSlice.reducer;
