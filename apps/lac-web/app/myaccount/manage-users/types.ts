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

export type Status = "ACTIVE" | "DEACTIVE";

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
