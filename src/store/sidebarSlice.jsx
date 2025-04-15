import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "home", // Default active tab
  showSecondary: false, // Will be computed based on activeTab
  mainMargin: "ml-[348px]", // Will be computed based on activeTab
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    // Action to set the active tab
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      // Compute derived state
      state.showSecondary = action.payload !== "home";
      state.mainMargin = action.payload === "home" ? "ml-[88px]" : "ml-[348px]";
    },
  },
});

// actions and reducer
export const { setActiveTab } = sidebarSlice.actions;
export default sidebarSlice.reducer;

// Selectors
export const selectActiveTab = (state) => state.sidebar.activeTab;
export const selectShowSecondary = (state) => state.sidebar.showSecondary;
export const selectMainMargin = (state) => state.sidebar.mainMargin;
