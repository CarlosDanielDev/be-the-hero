import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
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
  const [loading, setLoading] = useState();

  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);

  function navigateToDetail(incident) {
    navigation.navigate("Detail", { incident });
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);
    try {
      const response = await api.get("/incidents", {
        params: {
          page
        }
      });

      const { data, headers } = response;

      setIncidents([...incidents, ...data]);
      setTotal(headers["x-total-count"]);
      setPage(page + 1);
      setLoading(false);
    } catch (error) {
      console.log("Load Incidents", error);
    }
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
        keyExtractor={incident => String(incident.id + Math.random() * 100)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
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

            <DetailButton onPress={() => navigateToDetail(incident)}>
              <DetailButtonText>Ver mais detalhes</DetailButtonText>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </DetailButton>
          </Incident>
        )}
      />
    </Container>
  );
}
