import React from "react";
import { Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";

import Header from "../../components/Header";
import logoImage from "../../assets/logo.png";

import {
  Container,
  Image,
  ButtonBack,
  Incident,
  Property,
  Value,
  ContactBox,
  HeroTitle,
  Action,
  ActionText,
  HeroDescription,
  Actions
} from "./styles";

export default function Detail() {
  const navigation = useNavigation();
  const message =
    'Olá ONG, estou entrando em contato pois gostaria de ajudar no caso "Caso de Teste"com o valor de R$ 120,00 ';

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: "Heróid fo caso: Cado de teste",
      recipients: ["danphp7@gmail.com"],
      body: message
    });
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=5591987293991&text=${message}`);
  }
  return (
    <Container>
      <Header>
        <Image source={logoImage} />
        <ButtonBack onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e02041" />
        </ButtonBack>
      </Header>

      <Incident>
        <Property style={{ marginTop: 0 }}>ONG:</Property>
        <Value>Teste</Value>

        <Property>CASO:</Property>
        <Value>Caso de Teste</Value>

        <Property>VALOR:</Property>
        <Value>R$ 120,00</Value>
      </Incident>

      <ContactBox>
        <HeroTitle>Salve o dia!</HeroTitle>
        <HeroTitle>Seja o herói desse caso.</HeroTitle>
        <HeroDescription>Entre em contato:</HeroDescription>

        <Actions>
          <Action onPress={sendWhatsapp}>
            <ActionText>Whatsapp</ActionText>
          </Action>

          <Action onPress={sendMail}>
            <ActionText>E-Mail</ActionText>
          </Action>
        </Actions>
      </ContactBox>
    </Container>
  );
}
