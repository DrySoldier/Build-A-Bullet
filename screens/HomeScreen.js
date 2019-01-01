import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert
} from 'react-native';

import { connect } from 'react-redux';
import * as Actions from '../redux/Actions/ActionTypes';
import { Button } from 'react-native-elements';

const mapStateToProps = (state) => ({
  count: state.counterReducer.count,

  fuel: state.fuelReducer.fuel
});

const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch({ type: Actions.COUNTER_INCREMENT }),
  decrement: () => dispatch({ type: Actions.COUNTER_DECREMENT }),

  incrementFuel: () => dispatch({ type: Actions.INCREMENT_FUEL })
});

const device_width = Dimensions.get('window').width;
const device_height = Dimensions.get('window').height;

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)

    this._onPressPlay = this._onPressPlay.bind(this);
  }

  _onPressPlay = () => {
    if(this.props.fuel == 0){
      Alert.alert("You don't have enough fuel for an expedition!")
    }else{
      Alert.alert(
        'Start Game?',
        'Would you like to start the game?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => this.props.navigation.navigate('Game')},
        ],
        { cancelable: false }
      )
    }
  }

  render() {
    return (
      <View style={styles.bulletContainer}>

        <Text style={{ fontSize: 60 }}>{this.props.count}</Text>

        <TouchableOpacity onPress={this.props.increment}>
          <Image source={require('../assets/images/pixelBullet.png')} style={{ resizeMode: 'contain', width: device_width }} />
        </TouchableOpacity>

        <Text style={{ flex: 1 }}></Text>

        <Button onPress={this.props.incrementFuel}></Button>

        <Text style={{ fontSize: 60 }}>{this.props.fuel}/100</Text>

        <TouchableOpacity onPress={this._onPressPlay} style={styles.launchButtonBorder}>
          <Image source={require('../assets/images/pixelLaunch.jpg')} style={{ height: device_height * .4, width: device_width * .7 }} />
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeee',
  },
  bulletContainer: {
    flex: 1,
    margin: 25,
    backgroundColor: '#eeee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  launchButtonBorder: {
    borderRadius: 4,
    borderWidth: 20,
    borderColor: '#d6d7da',
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);