import { IContact } from "./types";
import { createContext, useContext } from "react";

export type GlobalContent = {
  contacts: IContact[];
  setContacts: React.Dispatch<React.SetStateAction<IContact[]>>;
};

export const AppContext = createContext<GlobalContent>({
  contacts: [],
  setContacts: () => {},
});
export const useGlobalContext = () => useContext(AppContext);
