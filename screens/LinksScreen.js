import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Text, Button, Dimensions, Alert } from 'react-native';
import { createStore } from 'redux';

console.disableYellowBox = true;

const device_width = Dimensions.get('window').width;
const device_height = Dimensions.get('window').height;

checkCanBuyBullet = () => {

}


export default class MainScreenComponent extends React.Component {
  static navigationOptions = {
    title: 'Choose Your Store',
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          borderWidth: 25,
          borderColor: 'teal',
        }}>
        <Button
          title="Buildin Bullets Store"
          onPress={() => this.props.navigation.navigate('gunStore')}
        />
        <Button
          title="spaceship Store"
          onPress={() => this.props.navigation.navigate('spaceshipStore')}
        />
      </View>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});