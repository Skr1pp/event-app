import React, { useEffect } from "react";

import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

const SettingStack = createStackNavigator();

const FavouritesScreen = () => {
  return null;
};
const SettingsScreen = () => {
  return null;
};
export const SettingsNavigator = ({ route, navigation }) => {
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerShown: true,
        headermode: "Экран",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingStack.Screen
        name="Экран настроек"
        component={SettingsScreen}
        options={{ header: () => null }}
      />
      <SettingStack.Screen
        name="Избранное"
        component={FavouritesScreen}
        options={{ header: () => null }}
      />
    </SettingStack.Navigator>
  );
};
