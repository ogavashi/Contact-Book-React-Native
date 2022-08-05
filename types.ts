export type IContact = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phoneNumber: string;
};

export type IContacts = {
  contacts: IContact[];
};
