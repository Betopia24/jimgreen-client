import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnalysisLabState {
  analysisLabData: {} | null;
  coolingTower: any | null;
  batchSimulation: any | null;
}

const inisialState: AnalysisLabState = {
  analysisLabData: null,
  coolingTower: null,
  batchSimulation: null,
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
    setBatchSaturationData: (state, action: PayloadAction<any>) => {
      state.batchSimulation = action.payload;
    },
    clearBatchSaturationData: (state) => {
      state.batchSimulation = null;
    },
  },
});

export const {
  setAnalysisLabData,
  setCoolingTowerData,
  clearCoolingTowerData,
  setBatchSaturationData,
  clearBatchSaturationData,
} = analysisLabSlice.actions;
export default analysisLabSlice.reducer;
