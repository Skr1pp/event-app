import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { EventTypesScreen } from "../../features/notes/screens/event-types.screen";

import { EventDetailsScreen } from "../../features/notes/screens/event-details.screen";



const EventTypesStack = createStackNavigator();

export const EventTypesNavigator = () => {
  return (
    <EventTypesStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <EventTypesStack.Screen
        name="EventTypes"
        component={EventTypesScreen}
      />
      <EventTypesStack.Screen
        name="EventDetails"
        component={EventDetailsScreen}
        options={{ headerShown: true, title: 'Детали мероприятия' }}
      />
    </EventTypesStack.Navigator>
  );
};