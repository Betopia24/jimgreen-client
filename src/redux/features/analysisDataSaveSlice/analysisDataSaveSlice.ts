import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnalysisData } from "@/redux/features/analysisDataSaveSlice/analysisTypes";

interface AnalysisState {
  analysisData: AnalysisData | null;
  analysisAllData: null;
}

const initialState: AnalysisState = {
  analysisData: null,
  analysisAllData: null,
};

const analysisSlice = createSlice({
  name: "analysis",
  initialState,
  reducers: {
    setAnalysisData: (state, action: PayloadAction<AnalysisData>) => {
      state.analysisData = action.payload;
    },
    clearAnalysisData: (state) => {
      state.analysisData = null;
    },

    setAnalysisAllDetailsData: (state, action) => {
      state.analysisAllData = action.payload;
    },
    clearAnalysisAllDetailsData: (state) => {
      state.analysisAllData = null;
    },
  },
});

export const {
  setAnalysisData,
  clearAnalysisData,
  setAnalysisAllDetailsData,
  clearAnalysisAllDetailsData,
} = analysisSlice.actions;

export default analysisSlice.reducer;
