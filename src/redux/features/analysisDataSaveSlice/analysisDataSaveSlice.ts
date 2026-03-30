import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnalysisData } from "@/redux/features/analysisDataSaveSlice/analysisTypes";

interface AnalysisState {
  analysisData: AnalysisData | null;
  analysisAllData: {} | null;
  saturationAnalysis: {} | null;
}

const initialState: AnalysisState = {
  analysisData: null,
  analysisAllData: null,
  saturationAnalysis: null,
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

    setSaturationAnalysisAllData: (state, action) => {
      state.saturationAnalysis = action.payload;
    },
    clearSaturationAnalysisAllData: (state) => {
      state.saturationAnalysis = null;
    },
  },
});

export const {
  setAnalysisData,
  clearAnalysisData,
  setAnalysisAllDetailsData,
  clearAnalysisAllDetailsData,
  setSaturationAnalysisAllData,
  clearSaturationAnalysisAllData,
} = analysisSlice.actions;

export default analysisSlice.reducer;
