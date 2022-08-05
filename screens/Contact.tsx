import React, { FC, useContext, useEffect, useState } from "react";
import { Alert, Button, Image, Modal, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import { Linking } from "react-native";
import { IContact } from "../types";
import Dialog from "react-native-dialog";

import axios from "axios";
import { AppContext } from "../context";
import { RootStackParamList } from "./Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

const ContactAvatarBlock = styled.View`
  display: flex;
  align-items: center;
`;

const ContactInfoBlock = styled.View`
  display: flex;
  justify-content: flex-start;
  margin: 15px;
`;

const ContactAvatar = styled.Image`
  border-radius: 100px;
  width: 150px;
  height: 150px;
  margin-top: 15px;
`;

const ContactInfo = styled.Text`
  font-size: 15px;
`;

const ContactData = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const ContactBlock = styled.View`
  border-radius: 16px;
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
`;

const ContactButtons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const ButtonWrapper = styled.View`
  padding: 30px;
`;

const DialogTitle = styled.Text`
  padding: 20px;
  font-size: 30px;
`;

type ScreenNavigationProp<T extends keyof RootStackParamList> = NativeStackNavigationProp<
  RootStackParamList,
  T
>;

type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;

type Props<T extends keyof RootStackParamList> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

const Contact: FC<Props<"Contact">> = ({ route, navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { contact } = route.params;
  const { setContacts } = useContext(AppContext);

  const deleteContact = async () => {
    try {
      await axios.delete(`https://62ebb372705264f263de6919.mockapi.io/Contacts/${contact.id}`);
      setContacts((prev: IContact[]) => prev.filter((c: IContact) => c.id !== contact.id));
      setIsVisible(false);
      await Alert.alert("Success!");
      navigation.navigate("Contacts");
    } catch (error) {
      Alert.alert("Could not delete contact");
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: contact.name,
      headerRight: () => (
        <Button onPress={() => navigation.navigate("Update Contact", { contact })} title="Edit" />
      ),
    });
  });

  return (
    <View>
      <Dialog.Container visible={isVisible}>
        <Dialog.Title>Account delete</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this contact? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setIsVisible(false)} />
        <Dialog.Button label="Delete" onPress={deleteContact} />
      </Dialog.Container>

      <ContactAvatarBlock>
        <ContactAvatar
          source={{
            uri: `${contact.avatar}`,
          }}
        />
      </ContactAvatarBlock>
      <ContactInfoBlock>
        <ContactBlock>
          <ContactInfo>Name</ContactInfo>
          <ContactData>{contact.name}</ContactData>
        </ContactBlock>
        <ContactBlock>
          <ContactInfo>Phone number:</ContactInfo>
          <ContactData>{contact.phoneNumber}</ContactData>
        </ContactBlock>
        <ContactBlock>
          <ContactInfo>Email:</ContactInfo>
          <ContactData>{contact.email}</ContactData>
        </ContactBlock>
      </ContactInfoBlock>
      <ContactButtons>
        <ButtonWrapper>
          <Button
            title="Call"
            color="black"
            onPress={() => Linking.openURL(`tel:${contact.phoneNumber}`)}
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <Button title="Delete" color="red" onPress={() => setIsVisible(true)} />
        </ButtonWrapper>
      </ContactButtons>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonDelete: {
    color: "red",
  },
});

export default Contact;
