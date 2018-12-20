import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Text, Button, Dimensions, Alert } from 'react-native';

import { connect } from 'react-redux';
import * as Actions from '../redux/Actions/ActionTypes';

const mapStateToProps = (state) => ({
  count: state.counterReducer.count,

  bulletMachinesBought: state.bulletMachineReducer.bulletMachinesBought,
  priceOfBulletMachine: state.bulletMachineReducer.priceOfBulletMachine,

  bulletFactoriesBought: state.bulletFactoryReducer.bulletFactoriesBought,
  priceOfBulletFactory: state.bulletFactoryReducer.priceOfBulletFactory,
});

const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch({ type: Actions.COUNTER_INCREMENT }),
  decrement: () => dispatch({ type: Actions.COUNTER_DECREMENT }),
});


console.disableYellowBox = true;

const device_width = Dimensions.get('window').width;
const device_height = Dimensions.get('window').height;

class MainScreenComponent extends React.Component {
  static navigationOptions = {
    title: 'Choose Your Store',
  }

  constructor(props) {
    super(props)
  }


  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.text}>Bullet Machines Purchased: {this.props.bulletMachinesBought}</Text>
        <Text style={styles.text}>Bullet Factories Purchased: {this.props.bulletFactoriesBought}</Text>
        <Button
          title="Buildin' Bullets Store"
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
    borderWidth: 25,
    borderColor: 'teal',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    fontSize: 50,
  },
  text: {
    fontSize: 30,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreenComponent);