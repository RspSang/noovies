import React, { useState } from "react";
import styled from "styled-components/native";
import { useQuery } from "react-query";
import { moviesApi, tvApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";
import { useColorScheme } from "react-native";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput<{ isDark: boolean }>`
  background-color: white;
  border: ${(props) => (props.isDark ? "" : "1px #7f8fa6")};
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  margin-bottom: 40px;
`;

const Search = () => {
  const isDark = useColorScheme() === "dark";
  const [query, setQuery] = useState("");
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], moviesApi.search, {
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(["searchTv", query], tvApi.search, {
    enabled: false,
  });
  const onChangeText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchTv();
    searchMovies();
  };
  return (
    <Container>
      <SearchBar
        isDark={isDark}
        placeholder="検索"
        placeholderTextColor="grey"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData ? (
        <HList title="映画" isDark={isDark} data={moviesData.results} />
      ) : null}
      {tvData ? (
        <HList title="テレビ" isDark={isDark} data={tvData.results} />
      ) : null}
    </Container>
  );
};

export default Search;
