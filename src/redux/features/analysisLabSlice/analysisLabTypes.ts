// analysisLab.types.ts

// ===============================
// Base Type
// ===============================
export interface BaseResult {
    interpretation: string;
    risk?: string;
    risk_level?: string;
}

// ===============================
// Larson Skold
// ===============================
export interface LarsonSkold extends BaseResult {
    index: number | null;
    components?: {
        chloride_meq: number;
        sulfate_meq: number;
        bicarbonate_meq: number;
        carbonate_meq: number;
    };
}

// ===============================
// Stiff Davis
// ===============================
export interface StiffDavis extends BaseResult {
    index: number | null;
    components?: {
        pH: number;
        pCa: number;
        pAlk: number;
        K: number;
    };
}

// ===============================
// Puckorius
// ===============================
export interface Puckorius extends BaseResult {
    index: number | null;
    components?: {
        pHs: number;
        pHeq: number;
        A: number;
        B: number;
        C: number;
        D: number;
    };
}

// ===============================
// CCPP
// ===============================
export interface CCPP extends BaseResult {
    ccpp_ppm: number;
    calcite_moles: number;
}

// ===============================
// LSI
// ===============================
export interface LSI extends BaseResult {
    lsi: number;
    pH_actual: number;
    pHs: number;
}

// ===============================
// Ryznar
// ===============================
export interface Ryznar extends BaseResult {
    ri: number;
    pH_actual: number;
    pHs: number;
}

// ===============================
// Main API Response Type
// ===============================
export interface AnalysisLabData {
    larson_skold: LarsonSkold;
    stiff_davis: StiffDavis;
    puckorius: Puckorius;
    ccpp: CCPP;
    lsi: LSI;
    ryznar: Ryznar;
}

export interface AnalysisLabResponse {
  success?: boolean;
  data?: {
    data: AnalysisLabData;
  };
}