import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { Dimensions, FlatList, useColorScheme } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import HMedia from "../components/HMedia";
import Slide from "../components/Slide";
import { Movie, MovieResponse, moviesApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const ListTitle = styled.Text<{ isDark: boolean }>`
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const HSeparator = styled.View`
  height: 30px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();
  const isDark = useColorScheme() === "dark";
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["movies", "upcoming"], moviesApi.upcoming, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });
  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const movieKeyExtractor = (item: Movie) => item.id + "";
  const renderHMedia = ({ item }: { item: Movie }) => (
    <HMedia
      posterPath={item.poster_path || ""}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
      isDark={isDark}
      fullData={item}
    />
  );
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <FlatList
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
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
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                isDark={isDark}
                fullData={movie}
              />
            ))}
          </Swiper>
          {trendingData ? (
            <HList
              isDark={isDark}
              title="Treanding Movies"
              data={trendingData.results}
            />
          ) : null}
          <ComingSoonTitle isDark={isDark}>公開予定</ComingSoonTitle>
        </>
      }
      ItemSeparatorComponent={HSeparator}
      keyExtractor={movieKeyExtractor}
      data={upcomingData.pages.map((page) => page.results).flat()}
      renderItem={renderHMedia}
    />
  ) : null;
};

export default Movies;
