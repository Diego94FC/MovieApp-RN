import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Movie} from '../interfaces/MovieInterface';
import MoviePosterCard from './MoviePosterCard';

interface Props {
  title?: string;
  movies: Movie[];
}

export const HorizontalSlider = ({title, movies}: Props) => {
  return (
    <View style={{height: title ? 260 : 220}}>
      {title && <Text style={styles.text}>{title}</Text>}

      <FlatList
        data={movies}
        renderItem={({item}: any) => (
          <MoviePosterCard movie={item} height={200} width={140} />
        )}
        keyExtractor={(item: Movie) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 13,
  },
});
