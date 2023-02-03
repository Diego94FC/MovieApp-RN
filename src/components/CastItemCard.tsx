import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Cast} from '../interfaces/CreditsInterface';

interface Props {
  actor: Cast;
}

export const CastItemCard = ({actor}: Props) => {
  const imgUrl = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;

  return (
    <View style={styles.container}>
      {actor.profile_path && (
        <Image source={{uri: imgUrl}} style={styles.imageStyle} />
      )}

      <View style={styles.actorContainer}>
        <Text style={styles.title}>{actor.name}</Text>
        <Text style={styles.subtitle}>{actor.character}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 10,
    marginHorizontal: 10,
    paddingRight: 5,
  },
  imageStyle: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  actorContainer: {
    marginLeft: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
});
