import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const Movie = styled.View`
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
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <Movie>
      <Poster path={posterPath} />
      <Title isDark={isDark}>
        {originalTitle.slice(0, 12)}
        {originalTitle.length > 12 ? "..." : null}
      </Title>
      <Votes isDark={isDark} votes={voteAverage} />
    </Movie>
  );
};

export default VMedia;
