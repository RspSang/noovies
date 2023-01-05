import React from "react";
import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import Poster from "./Poster";
import Votes from "./Votes";

const BgImg = styled.Image``;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "rgba(255,255,255)" : "rgba(0,0,0)")};
  margin-bottom: 10px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
`;

const Column = styled.View`
  width: 60%;
`;

const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
  isDark: boolean;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
  isDark,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImgPath(backdropPath) }}
        blurRadius={10}
        resizeMode="cover"
      />
      <Wrapper>
        <Poster path={posterPath} />
        <Column>
          <Title isDark={isDark}>{originalTitle}</Title>
          <Votes isDark={isDark} votes={voteAverage} />
          <Overview isDark={isDark}>{overview.slice(0, 80)}...</Overview>
        </Column>
      </Wrapper>
    </View>
  );
};

export default Slide;
