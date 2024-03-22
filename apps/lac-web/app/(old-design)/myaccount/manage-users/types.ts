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
  | "DISABLED";

export type UserProfile = {
  uuid: string;
  pimid: string;
  status: Status;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  role_description: string;
  permission: Permission;
  sold_to_status: Status;
  signed_data: SignedData;
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
