export type ErrorTypes = {
  success: boolean;
  message: string;
};

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  provider: "EMAIL" | string;
  isEmailVerified: boolean;
  role: "USER" | "ADMIN" | string;
  status: "UNBLOCK" | "BLOCK" | string;
  createdAt: string;
  updatedAt: string;
  companyMember: CompanyMember;
  activeSubscription: ActiveSubscription;
}

export interface CompanyMember {
  role: string;
  company: Company;
  status: string;
}

export interface Company {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

export interface ActiveSubscription {
  id: string;
  status: "ACTIVE" | "INACTIVE" | "CANCELED" | string;
  startDate: string;
  endDate: string;
  canceledAt: string | null;
  planSnapshot: PlanSnapshot;
  remainingReportGeneration: number;
  remainingAccountAddition: number;
}

export interface PlanSnapshot {
  name: string;
  price: number;
  maxReports: number;
  maxAccounts: number;
  features: string[];
}
