import axios from "axios";
import React, { FC, useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ContactElement from "../components/ContactElement";
import { AppContext } from "../context";
import useDebounce from "../hooks/useDebounce";
import { IContact } from "../types";

type ContactPros = {
  navigation: any;
};

const Contacts: FC<ContactPros> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { contacts, setContacts } = useContext(AppContext);
  const debouncedValue = useDebounce<string>(searchValue);
  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("https://62ebb372705264f263de6919.mockapi.io/Contacts");
      setContacts(data);
    } catch (error) {
      Alert.alert("Can't fetch contacts");
    } finally {
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate("Add Contact")} title="Add Contact" />
      ),
      headerLeft: () => (
        <TextInput
          style={styles.search}
          placeholder="Search..."
          defaultValue={searchValue}
          onChangeText={(newText) => setSearchValue(newText)}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    fetchContacts();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 15 }}>Loading...</Text>
      </View>
    );
  }

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(debouncedValue.toLowerCase())
  );
  return (
    <View>
      {filteredContacts.length === 0 ? (
        <Text style={styles.emptyMessage}>No Contacts</Text>
      ) : (
        <FlatList
          style={styles.contacts}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchContacts} />}
          data={filteredContacts}
          renderItem={({ item }: { item: IContact }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Contact", { contact: item })}>
              <ContactElement contact={item} />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contacts: {
    height: "100%",
  },
  modal: {
    height: "50%",
    width: "50%",
  },
  search: {
    fontSize: 15,
    padding: 8,
    backgroundColor: "#D8D8D8",
    borderRadius: 15,
    width: 120,
  },
  emptyMessage: {
    fontSize: 40,
    display: "flex",
    marginTop: "50%",
    textAlign: "center",
  },
});

export default Contacts;
