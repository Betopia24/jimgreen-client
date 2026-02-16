import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnalysisData } from "@/redux/features/analysisDataSaveSlice/analysisTypes";

interface AnalysisState {
  analysisData: AnalysisData | null;
}

const initialState: AnalysisState = {
  analysisData: null,
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
  },
});

export const { setAnalysisData, clearAnalysisData } = analysisSlice.actions;

export default analysisSlice.reducer;
