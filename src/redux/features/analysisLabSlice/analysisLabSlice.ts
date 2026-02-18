import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnalysisLabResponse } from "./analysisLabTypes";
interface CorrosionPrediction {
  metal_type: string;
  cr_mpy: number;
  cr_base_mpy: number;
  total_inhibition_percent?: number;
  rating: string;
}

interface AnalysisLabState {
  analysisLabData: {} | null;
  coolingTower: any | null;
  batchSimulation: any | null;
  corrsion: any | null;
    analysisLabData: AnalysisLabResponse | null;
}

const inisialState: AnalysisLabState = {
  analysisLabData: null,
  coolingTower: null,
  batchSimulation: null,
  corrsion: [],
};

const analysisLabSlice = createSlice({
    name: "analysisLab",
    initialState,
    reducers: {
        setAnalysisLabData: (state, action: PayloadAction<AnalysisLabResponse>) => {
            state.analysisLabData = action.payload;
        }
    }
})

export const { setAnalysisLabData } = analysisLabSlice.actions;
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
    SetCorrosionPrediction: (state, action) => {
      state.corrsion = action.payload;
    },
    clearCorrosionPrediction: (state) => {
      state.corrsion = [];
    },
  },
});

export const {
  setAnalysisLabData,
  setCoolingTowerData,
  clearCoolingTowerData,
  setBatchSaturationData,
  clearBatchSaturationData,
  clearCorrosionPrediction,
  SetCorrosionPrediction,
} = analysisLabSlice.actions;
export default analysisLabSlice.reducer;
