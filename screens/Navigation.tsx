import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Contacts from "./Contacts";
import Contact from "./Contact";
import AddContact from "./AddContact";
import { IContact } from "../types";
import UpdateContact from "./UpdateContact";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Contacts: undefined;
  Contact: {
    contact: IContact;
  };
  "Add Contact": undefined;
  "Update Contact": {
    contact: IContact;
  };
};

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Contacts" component={Contacts} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="Add Contact" component={AddContact} />
        <Stack.Screen name="Update Contact" component={UpdateContact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
