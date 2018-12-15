import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';

const device_width = Dimensions.get('window').width;
const device_height = Dimensions.get('window').height;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.bulletContainer}>

        <Text style={{fontSize: 60}}>TEST</Text>

        <TouchableOpacity onPress={this.bulletButton}>
          <Image source={require('../assets/images/PNGPIX-COM-Bullet-PNG-Transparent-Image-1-500x373.png')} style={{resizeMode: 'contain', width: device_width}}/>
        </TouchableOpacity>

        <Text style={{flex: 1}}></Text>

        <TouchableOpacity onPress={this._onPressPlay} style={styles.launchButtonBorder}>
          <Image source={require('../assets/images/launchButton-logo-big.jpg')} style={{height: device_height*.4, width: device_width*.7}} />
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
