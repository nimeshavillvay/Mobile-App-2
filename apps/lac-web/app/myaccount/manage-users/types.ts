export type UserContact = {
  uuid: string;
  pimid: string;
  status: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  role_description: string;
  permission: string;
  sold_to_status: string;
  signed_data: {
    payload: string;
    sign: string;
  };
};
