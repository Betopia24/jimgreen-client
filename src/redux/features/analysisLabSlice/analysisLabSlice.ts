import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnalysisLabResponse } from "./analysisLabTypes";

interface AnalysisLabState {
    analysisLabData: AnalysisLabResponse | null;
}

const initialState: AnalysisLabState = {
    analysisLabData: null,
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
export default analysisLabSlice.reducer;