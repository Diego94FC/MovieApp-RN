import React from 'react';
import {ActivityIndicator, Dimensions, View, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useMovies} from '../hooks/useMovies';
import MoviePosterCard from '../components/MoviePosterCard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {HorizontalSlider} from '../components/HorizontalSlider';

const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();

  if (isLoading) {
    return (
      <View style={styles.ActivityIndicatorContainer}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{marginTop: top + 20}}>
        <View style={styles.carouselContainer}>
          <Carousel
            data={nowPlaying}
            renderItem={({item}: any) => <MoviePosterCard movie={item} />}
            sliderWidth={windowWidth}
            itemWidth={300}
            inactiveSlideOpacity={0.9}
          />
        </View>
      </View>

      <HorizontalSlider movies={popular} title="Populares" />
      <HorizontalSlider movies={topRated} title="Mejor evaluadas" />
      <HorizontalSlider movies={upcoming} title="Próximos estrenos" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    height: 440,
  },
  ActivityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
