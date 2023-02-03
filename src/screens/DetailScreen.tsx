import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Movie} from '../interfaces/MovieInterface';
import {RootStackParams} from '../navigation/Navigation';
import {useMovieDetails} from '../hooks/useMovieDetails';
import {MovieDetails} from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {
  movie: Movie;
}

const screenHeight = Dimensions.get('screen').height;

export const DetailScreen = ({route, navigation}: Props) => {
  const movie = route.params as Movie;
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const {isLoading, fullMovieInfo, cast} = useMovieDetails(movie.id);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{uri: imageUrl}} style={styles.imageCard} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.subtitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator
          color="gray"
          size={100}
          style={styles.loadingStyle}
        />
      ) : (
        <MovieDetails fullMovieDetails={fullMovieInfo!} cast={cast} />
      )}

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon color="white" name="chevron-back-outline" size={24} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageCard: {
    flex: 1,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  container: {
    paddingBottom: 5,
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 10,
  },
  infoContainer: {
    marginHorizontal: 15,
    marginTop: 15,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ActivityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingStyle: {marginTop: 20},
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    elevation: 9,
    zIndex: 999,
  },
});
