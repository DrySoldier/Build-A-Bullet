import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

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
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Home') {
          return <Image source={focused ? require('../assets/images/game_tab_icon.png') : require('../assets/images/game_tab_icon.png')}
            style={{ height: 25, width: 25 }} />;
        } else if (routeName === 'Links') {
          return <Image source={focused ? require('../assets/images/game_tab_icon.png') : require('../assets/images/game_tab_icon.png')}
            style={{ height: 25, width: 25 }} />;
        } else if (routeName === 'Settings') {
          return <Image source={focused ? require('../assets/images/game_tab_icon.png') : require('../assets/images/game_tab_icon.png')}
            style={{ height: 25, width: 25 }} />;
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#6e73ff',
      inactiveTintColor: 'gray',
      labelStyle: { fontWeight: 'bold' }
    },
  }
);