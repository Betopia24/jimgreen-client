import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnalysisLabState {
  analysisLabData: {} | null;
  coolingTower: any | null;
}

const inisialState: AnalysisLabState = {
  analysisLabData: null,
  coolingTower: null,
};

const analysisLabSlice = createSlice({
  name: "analysisLab",
  initialState: inisialState,
  reducers: {
    setAnalysisLabData: (state, action: PayloadAction<AnalysisLabData>) => {
      state.analysisLabData = action.payload;
    },

    setCoolingTowerData: (state, action) => {
      state.coolingTower = action.payload;
    },
    clearCoolingTowerData: (state) => {
      state.coolingTower = null;
    },
  },
});

export const {
  setAnalysisLabData,
  setCoolingTowerData,
  clearCoolingTowerData,
} = analysisLabSlice.actions;
export default analysisLabSlice.reducer;
