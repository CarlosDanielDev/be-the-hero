import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import logoImage from "../../assets/logo.png";
import Header from "../../components/Header";
import {
  Container,
  Image,
  HeaderText,
  Strong,
  Title,
  Description,
  IncidentList,
  Incident,
  Property,
  Value,
  DetailButton,
  DetailButtonText
} from "./styles";

export default function Incidents() {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);

  function navigateToDetail() {
    navigation.navigate("Detail");
  }

  async function loadIncidents(page = 1) {
    try {
      const response = await api.get("/incidents", {
        params: {
          page
        }
      });
      const { data, headers } = response;
      console.log("Headers", headers);

      setTotal(headers["x-total-count"]);

      setIncidents(data);
    } catch (error) {}
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <Container>
      <Header>
        <Image source={logoImage} />
        <HeaderText>
          Total de <Strong>{total} casos</Strong>.
        </HeaderText>
      </Header>
      <Title>Bem-vindo!</Title>
      <Description>Escolha um dos casos abaixo e salve o dia.</Description>

      <IncidentList
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: incident }) => (
          <Incident>
            <Property>ONG:</Property>
            <Value>{incident.name}</Value>

            <Property>CASO:</Property>
            <Value>{incident.title}</Value>

            <Property>VALOR:</Property>
            <Value>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </Value>

            <DetailButton onPress={navigateToDetail}>
              <DetailButtonText>Ver mais detalhes</DetailButtonText>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </DetailButton>
          </Incident>
        )}
      />
    </Container>
  );
}
