// types/analysisTypes.ts

export interface Parameter {
  name: string;
  value: number;
  unit: string;
  detection_limit: number | null;
}

export interface Validation {
  valid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export interface AnalysisData {
  parameters: Parameter[];
  validation: Validation;
}

export interface AnalysisApiResponse {
  success: boolean;
  message: string;
  data: AnalysisData;
}
