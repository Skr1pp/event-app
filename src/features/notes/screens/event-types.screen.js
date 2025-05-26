import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { useNavigation } from '@react-navigation/native';
// Импортируем каждую картинку отдельно (самый надежный способ)
import cinemaImage from '../../../../assets/images/cinema.jpg';
import concertImage from '../../../../assets/images/concert.jpg';
import theaterImage from '../../../../assets/images/theater.jpg';
import museumImage from '../../../../assets/images/museum.jpg';
import exhibitionImage from '../../../../assets/images/exhibition.jpg';

const eventTypes = [
  { id: '1', title: 'Концерты', image: concertImage },
  { id: '2', title: 'Театры', image: theaterImage },
  { id: '3', title: 'Музеи', image: museumImage },
  { id: '4', title: 'Кино', image: cinemaImage },
  { id: '5', title: 'Выставки', image: exhibitionImage },
];

export const EventTypesScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('EventDetails', { eventType: item.title })}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );


  return (
    <SafeArea>
      <FlatList
        data={eventTypes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
      />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    height: 160,
  },
  image: {
    width: 140,
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    flex: 1,
  },
});