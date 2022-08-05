import React, { FC, useContext } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IContact } from "../types";
import axios from "axios";
import { AppContext } from "../context";
import { RootStackParamList } from "./Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

type ScreenNavigationProp<T extends keyof RootStackParamList> = NativeStackNavigationProp<
  RootStackParamList,
  T
>;

type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;

type Props<T extends keyof RootStackParamList> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

const UpdateContact: FC<Props<"Update Contact">> = ({ route, navigation }) => {
  const { setContacts } = useContext(AppContext);
  const { contact } = route.params;

  const validationSchema = yup
    .object({
      name: yup.string().required("Please, enter name"),
      email: yup.string().email("Enter valid email"),
      phoneNumber: yup.string().required("Please, enter a phone number"),
      avatar: yup.string(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IContact>({
    defaultValues: {
      email: contact.email,
      avatar: contact.avatar,
      name: contact.name,
      phoneNumber: contact.phoneNumber,
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<IContact> = async (data) => {
    const avatar = data.avatar
      ? data.avatar
      : "https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744004?k=20&m=1016744004&s=612x612&w=0&h=Z4W8y-2T0W-mQM-Sxt41CGS16bByUo4efOIJuyNBHgI=";
    const newContact = { ...data, avatar };
    try {
      const { data } = await axios.put(
        `https://62ebb372705264f263de6919.mockapi.io/Contacts/${contact.id}`,
        newContact
      );
      setContacts((prev: IContact[]) =>
        prev.map((c) => {
          return c.id === data.id ? data : c;
        })
      );
      await Alert.alert("Success!");
      navigation.navigate("Contacts");
    } catch (error) {
      Alert.alert("Could not update contact");
    }
  };

  return (
    <View>
      <View style={styles.inputBlock}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Name..."
            />
          )}
          name="name"
        />
      </View>
      <Text style={styles.error}>{errors.name?.message}</Text>
      <View style={styles.inputBlock}>
        <Controller
          control={control}
          rules={{
            required: false,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="email..."
            />
          )}
          name="email"
        />
      </View>
      <View style={styles.inputBlock}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              keyboardType={"phone-pad"}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Phone number..."
            />
          )}
          name="phoneNumber"
        />
      </View>
      <Text style={styles.error}>{errors.phoneNumber?.message}</Text>
      <View style={styles.inputBlock}>
        <Controller
          control={control}
          rules={{
            required: false,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Avatar URL..."
              selectTextOnFocus={true}
            />
          )}
          name="avatar"
        />
      </View>
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    padding: 10,
  },
  error: {
    height: 15,
    marginLeft: 15,
    fontSize: 15,
    color: "red",
  },
  inputBlock: {
    backgroundColor: "white",
    borderRadius: 15,
    margin: 20,
    display: "flex",
    justifyContent: "center",
  },
});

export default UpdateContact;
