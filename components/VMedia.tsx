import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Movie, TV } from "../api";
import Poster from "./Poster";
import Votes from "./Votes";

const Container = styled.View`
  align-items: center;
`;

const Title = styled.Text<{ isDark: boolean }>`
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  isDark: boolean;
  fullData: Movie | TV;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
  isDark,
  fullData,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: "Detail",
      params: { ...fullData },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <Container>
        <Poster path={posterPath} />
        <Title isDark={isDark}>
          {originalTitle.slice(0, 12)}
          {originalTitle.length > 12 ? "..." : null}
        </Title>
        <Votes isDark={isDark} votes={voteAverage} />
      </Container>
    </TouchableOpacity>
  );
};

export default VMedia;
