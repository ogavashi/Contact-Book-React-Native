import { Navigation } from "./screens/Navigation";
import { AppContext } from "./context";
import { useState } from "react";
import { IContact } from "./types";

export default function App() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  return (
    <AppContext.Provider value={{ contacts, setContacts }}>
      <Navigation />
    </AppContext.Provider>
  );
}
