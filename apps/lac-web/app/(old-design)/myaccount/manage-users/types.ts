export type Permission = "ADMIN" | "BUYER";

export type SignedData = {
  payload: string;
  sign: string;
};

export type ApproveContact = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  permission: Permission;
  signedData: SignedData;
};

export type Status =
  | "PENDING"
  | "ACTIVE"
  | "DEACTIVE"
  | "INACTIVE"
  | "DISABLED"
  | "SUSPENDED";

export type UserProfile = {
  id: number;
  status: Status;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  roleDescription: string;
  permission: string;
  soldToAccountStatus: string;
};

export type ManageContact = {
  your_profile: UserProfile;
  contact_list: UserProfile[];
};

export type ManageUsers = {
  approve_contacts: ApproveContact[];
  manage_contact: ManageContact;
};

export type ForgetPasswordResponse = {
  data: { status: Status };
  message: string | null;
  isSuccess: boolean;
};

export type UpdateField = {
  field: string;
  value: string;
};

export type CurrentUser = {
  email: string;
};

// Types used in new-design
export type UpdateUser = {
  userId: number;
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  password?: string;
  permission: string;
  status: string;
};
