import styled from "styled-components/native";
import Constants from "expo-constants";

const paddingTop = `${Constants.statusBarHeight + 20}px`;
export const Container = styled.View`
  flex: 1;
  padding: 0 24px;
  padding-top: ${paddingTop};
`;

export const Image = styled.Image``;

export const HeaderText = styled.Text`
  font-size: 15px;
  color: #737380;
`;

export const Strong = styled.Text`
  font-weight: bold;
`;

export const Title = styled.Text`
  font-size: 30px;
  margin: 48px 0 16px 0;
  color: #13131a;
  font-weight: bold;
`;

export const Description = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: #737380;
`;

export const IncidentList = styled.FlatList`
  margin-top: 32px;
`;

export const Incident = styled.View`
  padding: 24px;
  border-radius: 8px;
  background: #fff;
  margin-bottom: 16px;
`;

export const Property = styled.Text`
  font-size: 14px;
  color: #41414d;
  font-weight: bold;
`;

export const Value = styled.Text`
  margin-top: 8px;
  font-size: 15px;
  margin-bottom: 24px;
  color: #737380;
`;

export const DetailButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DetailButtonText = styled.Text`
  color: #e02041;
  font-size: 15px;
  font-weight: bold;
`;
