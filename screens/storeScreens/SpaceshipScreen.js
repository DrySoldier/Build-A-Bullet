import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  View,
  Dimensions
} from 'react-native';

const device_width = Dimensions.get('window').width;
const device_height = Dimensions.get('window').height;


export default class SpaceshipComponent extends React.Component {
    static navigationOptions = {
      header: null,
    };
  
    render() {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            borderWidth: 25,
            borderColor: 'orange',
          }}>
          <Button
            title="Go to three"
            onPress={() =>
              this.props.navigation.navigate('LinksScreen', {
                greeting: 'Hallo',
              })
            }
          />
        </View>
      );
    }
  }