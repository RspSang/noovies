import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";


const BgImg = styled.Image``;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) =>
    props.isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"};
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

const Votes = styled(Overview)`
  font-size: 12px;
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImgPath(backdropPath) }}
        blurRadius={10}
        resizeMode="cover"
      />
      <Wrapper>
        <Poster source={{ uri: makeImgPath(posterPath) }} />
        <Column>
          <Title isDark={isDark}>{originalTitle}</Title>
          {voteAverage > 0 ? (
            <Votes isDark={isDark}>⭐️ {voteAverage}/10</Votes>
          ) : null}
          <Overview isDark={isDark}>{overview.slice(0, 100)}...</Overview>
        </Column>
      </Wrapper>
    </View>
  );
};

export default Slide;
