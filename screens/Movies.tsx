import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  useColorScheme,
} from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import HMedia from "../components/HMedia";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import { Movie, MovieResponse, moviesApi } from "../api";

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text<{ isDark: boolean }>`
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const VSeparator = styled.View`
  width: 30px;
`;

const HSeparator = styled.View`
  height: 30px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();
  const isDark = useColorScheme() === "dark";
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;
  const movieKeyExtractor = (item: Movie) => item.id + "";
  const renderVMedia = ({ item }: { item: Movie }) => (
    <VMedia
      posterPath={item.poster_path || ""}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
      isDark={isDark}
    />
  );
  const renderHMedia = ({ item }: { item: Movie }) => (
    <HMedia
      posterPath={item.poster_path || ""}
      originalTitle={item.title}
      overview={item.overview}
      releaseDate={item.release_date}
      isDark={isDark}
    />
  );
  const onRefresh = async () => {
    queryClient.refetchQueries(["movies"]);
  };
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : upcomingData ? (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            showsButtons={false}
            autoplay
            autoplayTimeout={3.5}
            showsPagination={false}
            loop
            containerStyle={{
              width: "100%",
              height: SCREEN_HEIGHT / 4,
              marginBottom: 30,
            }}
          >
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                isDark={isDark}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle isDark={isDark}>Trending Movies</ListTitle>
            {trendingData ? (
              <FlatList
                style={{ marginTop: 20 }}
                horizontal
                data={trendingData.results}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 30 }}
                ItemSeparatorComponent={VSeparator}
                keyExtractor={movieKeyExtractor}
                renderItem={renderVMedia}
              />
            ) : null}
          </ListContainer>
          <ComingSoonTitle isDark={isDark}>公開予定</ComingSoonTitle>
        </>
      }
      ItemSeparatorComponent={HSeparator}
      keyExtractor={movieKeyExtractor}
      data={upcomingData.results}
      renderItem={renderHMedia}
    />
  ) : null;
};

export default Movies;
