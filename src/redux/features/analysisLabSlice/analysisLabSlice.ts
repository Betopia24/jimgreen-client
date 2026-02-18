import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnalysisLabState {
    analysisLabData: {} | null;
}

const inisialState: AnalysisLabState = {
    analysisLabData: null,
}


const analysisLabSlice = createSlice({
    name: "analysisLab",
    initialState: inisialState,
    reducers: {
        setAnalysisLabData: (state, action: PayloadAction<AnalysisLabData>) => { 
            state.analysisLabData = action.payload;
        }
    }
})

export const { setAnalysisLabData } = analysisLabSlice.actions;
export default analysisLabSlice.reducer;