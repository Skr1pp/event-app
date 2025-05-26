import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { Button } from 'react-native';


const eventData = {
  'Театры': [
    {
      id: '1',
      title: 'Абайский театр оперы и балета',
      image: require('../../../../assets/images/theater2.jpg'),
      time: '19:00',
      date: '15 июня 2023',
      location: 'Алматы, ул. Кабанбай батыра, 110'
    },
    {
      id: '2',
      title: 'Театры Алма-Аты',
      image: require('../../../../assets/images/theater2.jpg'),
      time: '18:30',
      date: '17 июня 2023',
      location: 'Алматы, ул. Гоголя, 40'
    }
  ],
  'Концерты': [
    {
      id: '1',
      title: 'Концерт',
      image: require('../../../../assets/images/theater2.jpg'),
      time: '20:00',
      date: '20 июня 2023',
      location: 'Алматы, Дворец Республики'
    }
  ],
  // ... другие категории
};

export const EventDetailsScreen = ({ route }) => {
  const { eventType } = route.params;
  const events = eventData[eventType] || [];

  return (
    <SafeArea>
      <ScrollView>
        {events.map(event => (
          <View key={event.id} style={styles.container}>
            <Image source={event.image} style={styles.fullWidthImage} />
            <View style={styles.detailsContainer}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.detailText}>{event.date} в {event.time}</Text>
              <Text style={styles.detailText}>{event.location}</Text>
              <Button 
  title="Купить билет" 
  onPress={() => console.log('Билет куплен')}
/>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  fullWidthImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 15,
  },
  eventTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
});