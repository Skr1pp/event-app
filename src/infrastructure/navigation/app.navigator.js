import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NotesNavigator } from "./notes.navigator";
import { SettingsNavigator } from "./settings.navigator";
import { NotesContextProvider } from "../../services/notes/notes.context";
import { EventTypesNavigator } from './event-types.navigator';
const Tab = createBottomTabNavigator();
const TAB_ICONS = {
  Notes: [Ionicons, "list"],
  Settings: [Ionicons, "settings"],
  EventTypes: [Ionicons, "calendar"], // Добавьте подходящую иконку
};
const TAB_ICONS_COLORS = {
  Active: "#ffffff",
  Inactive: "#ffffff",
};

const createScreenOptions = ({ route }) => {
  if (!TAB_ICONS[route.name]) {
    console.warn(`No icon configured for route: ${route.name}`);
  }
  const iconConfig = TAB_ICONS[route.name] || [Ionicons, "help"]; // Значение по умолчанию
  const [IconComponent, iconName] = iconConfig;
  
  return {
    headerShown: false,
    tabBarIcon: ({ focused, size }) => {
      const Color = focused
        ? TAB_ICONS_COLORS["Active"]
        : TAB_ICONS_COLORS["Inactive"];
      return <IconComponent name={iconName} size={size} color={Color} />;
    },
    tabBarActiveTintColor: TAB_ICONS_COLORS["Active"],
    tabBarInactiveTintColor: TAB_ICONS_COLORS["Inactive"],
    tabBarStyle: {
      backgroundColor: "#2182BD",
      borderTopWidth: 0,
    },
  };
};

export const AppNavigator = () => {
  return (
    <NotesContextProvider>
      <Tab.Navigator
        initialRouteName="Notes"
        screenOptions={createScreenOptions}
      >
        <Tab.Screen
          name="Notes"
          component={NotesNavigator}
          options={{ tabBarLabel: "СОЗД.Мероприятия" }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsNavigator}
          options={{ tabBarLabel: "Настройки" }}
        />
        <Tab.Screen
        name="EventTypes"
        component={EventTypesNavigator} // Исправьте на правильный компонент
        options={{ tabBarLabel: "ВИДЫ.Мероприятий" }}
        />
      </Tab.Navigator>
    </NotesContextProvider>
  );
};
