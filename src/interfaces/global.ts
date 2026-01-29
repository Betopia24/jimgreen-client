export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  isEmailVerified: boolean;
  role: "USER";
  status: "UNBLOCK";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  companyMember: {
    role: "owner";
    companyId: string;
    status: "active";
  };
}

export type ErrorTypes = {
  success: boolean;
  message: string;
};
