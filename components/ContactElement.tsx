import React, { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { IContact } from "../types";

const SeparatorView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

type ContactProps = {
  contact: IContact;
};

const ContactElement: FC<ContactProps> = ({ contact }) => {
  return (
    <View>
      <View style={styles.card}>
        <View>
          <Image
            style={styles.avatar}
            source={{
              uri: `${contact.avatar}`,
            }}
          />
        </View>
        <View>
          <View>
            <Text style={styles.name}>{contact.name}</Text>
            <Text style={styles.email}>{contact.email}</Text>
          </View>
        </View>
        <View style={styles.info}>
          <Feather name="info" size={24} color="black" />
        </View>
      </View>
      <SeparatorView>
        <View style={styles.separator} />
      </SeparatorView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  name: {
    fontSize: 20,
    color: "black",
  },
  email: {
    color: "black",
  },
  info: {
    marginLeft: "auto",
  },
  separator: {
    height: 1,
    width: "90%",
    display: "flex",
    backgroundColor: "#999999",
  },
});

export default ContactElement;
