import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import VMedia from "./VMedia";

const ListTitle = styled.Text<{ isDark: boolean }>`
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

export const HListSeparator = styled.View`
  width: 30px;
`;

interface HListProps {
  title: string;
  data: any[];
  isDark: boolean;
}

const HList: React.FC<HListProps> = ({ title, data, isDark }) => (
  <ListContainer>
    <ListTitle isDark={isDark}>{title}</ListTitle>
    <FlatList
      horizontal
      data={data}
      contentContainerStyle={{ paddingHorizontal: 30 }}
      ItemSeparatorComponent={HListSeparator}
      keyExtractor={(item) => item.id + ""}
      renderItem={({ item }) => (
        <VMedia
          posterPath={item.poster_path}
          originalTitle={item.original_title ?? item.original_name}
          voteAverage={item.vote_average}
          isDark={isDark}
        />
      )}
    />
  </ListContainer>
);

export default HList;
