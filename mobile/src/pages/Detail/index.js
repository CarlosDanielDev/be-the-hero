import React from "react";
import { Linking } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
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
  const route = useRoute();
  const { incident } = route.params;
  const navigation = useNavigation();
  const message = `Olá ${
    incident.name
  }, estou entrando em contato pois gostaria de ajudar no caso "${
    incident.title
  }"com o valor de ${Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(incident.value)} `;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
    );
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
        <Value>
          {incident.name} de {incident.city}/{incident.uf}
        </Value>

        <Property>CASO:</Property>
        <Value>{incident.title}</Value>

        <Property>VALOR:</Property>
        <Value>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(incident.value)}
        </Value>
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
