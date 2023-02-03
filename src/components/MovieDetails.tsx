import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Cast} from '../interfaces/CreditsInterface';
import {FullMovieDetails} from '../interfaces/MovieInterface';
import currencyFormatter from 'currency-formatter';
import {CastItemCard} from './CastItemCard';

interface Props {
  fullMovieDetails: FullMovieDetails;
  cast: Cast[];
}

export const MovieDetails = ({fullMovieDetails, cast}: Props) => {
  return (
    <>
      {/* Detalles  */}
      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          <Icon name="star-outline" size={16} color="gray" />
          <Text> {fullMovieDetails.vote_average}</Text>
          <Text style={styles.genres}>
            {' '}
            - {fullMovieDetails.genres.map(genre => genre.name).join(', ')}
          </Text>
        </View>

        {/* Historia */}
        <Text style={styles.title}>Historia</Text>
        <Text style={styles.subtitle}>{fullMovieDetails.overview}</Text>

        {/* Presupuesto */}
        <Text style={styles.title}>Presupuesto</Text>
        <Text style={styles.subtitle}>
          {currencyFormatter.format(fullMovieDetails.budget, {code: 'USD'})}
        </Text>
      </View>
      {/* Cast  */}
      <View style={styles.castContainer}>
        <Text style={styles.castTitle}>Actores</Text>
        {/* <CastItemCard actor={cast[0]} /> */}
        <FlatList
          data={cast}
          renderItem={({item}: any) => <CastItemCard actor={item} />}
          keyExtractor={(item: Cast) => item.id?.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.list}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  genres: {
    marginLeft: 5,
    flexShrink: 1,
  },
  title: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 16,
  },
  castContainer: {
    marginTop: 10,
    marginBottom: 100,
  },
  castTitle: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 15,
  },
  list: {
    marginTop: 10,
    height: 70,
  },
});
