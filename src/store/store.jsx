import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import tableEditorReducer from "./tableEditorSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    tableEditor: tableEditorReducer,
  },
});

export default store;
