import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

const SettingStack = createStackNavigator();

// Реальные компоненты экранов
const FavouritesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Избранное</Text>
      {/* Добавьте ваш контент здесь */}
    </View>
  );
};

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Настройки</Text>
      {/* Добавьте ваш контент здесь */}
    </View>
  );
};

export const SettingsNavigator = ({ route, navigation }) => {
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerShown: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Настройки" }} // Показываем заголовок
      />
      <SettingStack.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{ title: "Избранное" }}
      />
    </SettingStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});