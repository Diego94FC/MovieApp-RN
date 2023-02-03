import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Movie} from '../interfaces/MovieInterface';

interface Props {
  movie: Movie;
  height?: number;
  width?: number;
}

const MoviePosterCard = ({movie, height = 420, width = 300}: Props) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DetailScreen', movie)}>
      <View style={[{height, width}, styles.container]}>
        <Image source={{uri: imageUrl}} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 10,
    marginHorizontal: 2,
    paddingBottom: 20,
    paddingHorizontal: 7,
  },
  image: {
    flex: 1,
    borderRadius: 18,
  },
});

export default MoviePosterCard;
