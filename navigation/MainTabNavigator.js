import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Platform from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SpaceshipScreen from '../screens/storeScreens/SpaceshipScreen';
import GunScreen from '../screens/storeScreens/GunScreen'
import GameScreen from '../screens/GameScreen'

const Home = createStackNavigator({
  Home: HomeScreen,
  Game: GameScreen,
});

Home.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const Links = createStackNavigator({
  Links: LinksScreen,
  gunStore: GunScreen,
  spaceshipStore: SpaceshipScreen,
});

const Settings = createStackNavigator({
  Settings: SettingsScreen,
});

export default createBottomTabNavigator({
  Home,
  Links,
  Settings,
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`
        } else if (routeName === 'Links') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} color={tintColor} size={Platform.OS === "ios" ? 28 : 20}/>;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      fontSize: 12,
    },
  });
