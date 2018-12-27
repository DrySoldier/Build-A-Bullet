import React from 'react';
import { Button, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import * as Actions from '../../redux/Actions/ActionTypes';


const mapStateToProps = (state) => ({
  count: state.counterReducer.count,

  bulletMachinesBought: state.bulletMachineReducer.bulletMachinesBought,
  priceOfBulletMachine: state.bulletMachineReducer.priceOfBulletMachine,

  bulletFactoriesBought: state.bulletFactoryReducer.bulletFactoriesBought,
  priceOfBulletFactory: state.bulletFactoryReducer.priceOfBulletFactory,
});

const mapDispatchToProps = (dispatch) => ({
  buyBulletMachine: () => dispatch({ type: Actions.BUY_BULLET_MACHINE }),
  buyBulletFactory: () => dispatch({ type: Actions.BUY_BULLET_FACTORY }),

  incrementFive: () => dispatch({ type: Actions.COUNTER_INCREMENT_FIVE }),
  incrementTen: () => dispatch({ type: Actions.COUNTER_INCREMENT_TEN }),
  incrementFifteen: () => dispatch({ type: Actions.COUNTER_INCREMENT_FIFTEEN }),
  incrementTwenty: () => dispatch({ type: Actions.COUNTER_INCREMENT_TWENTY }),
  incrementTwentyFive: () => dispatch({ type: Actions.COUNTER_INCREMENT_TWENTYFIVE }),
  incrementThirty: () => dispatch({ type: Actions.COUNTER_INCREMENT_THIRTY }),
  incrementThirtyFive: () => dispatch({ type: Actions.COUNTER_INCREMENT_THIRTYFIVE }),
  incrementForty: () => dispatch({ type: Actions.COUNTER_INCREMENT_FORTY }),
  increment: () => dispatch({ type: Actions.COUNTER_INCREMENT }),
  decrement: () => dispatch({ type: Actions.COUNTER_DECREMENT }),
});

const device_width = Dimensions.get('window').width;
const device_height = Dimensions.get('window').height;

class GunComponent extends React.Component {

  static navigationOptions = {
    title: "Buildin' Bullets Store",
  }

  constructor(props) {
    super(props);

    const callCountUpMachine = setInterval(this.countUpMachine, 1000);
    const callCountUpFactory = setInterval(this.countUpFactory, 1000);

    this._onPress = this._onPress.bind(this);

  }

  _onPress = (e) => {
    switch (e) {
      case 'checkCanBuyBulletMachine':

        if (this.props.count >= this.props.priceOfBulletMachine) {
          this.props.buyBulletMachine()

          for (let i = 0; i < this.props.priceOfBulletMachine; i++) {
            this.props.decrement();

          }

        } else {
          alert('You cannot afford this')
        }

        break;


      case 'checkCanBuyBulletFactory':

        if (this.props.count >= this.props.priceOfBulletFactory) {
          this.props.buyBulletFactory()

          for (let i = 0; i < this.props.priceOfBulletFactory; i++) {
            this.props.decrement();

          }

        } else {
          alert('You cannot afford this')
        }

        break;

      default:
        alert('how did you trigger this')
        break;
    }
  };

  countUpMachine = () => {
    if (this.props.bulletMachinesBought < 4) {
      for (let i = 0; i < this.props.bulletMachinesBought; i++) {
        this.props.increment();

      }
    } else if (this.props.bulletMachinesBought < 9) {
      for (let i = 0; i < Math.round(this.props.bulletMachinesBought / 10); i++) {
        this.props.incrementFive();

      }
    } else if (this.props.bulletMachinesBought < 14) {
      for (let i = 0; i < Math.round(this.props.bulletMachinesBought / 15); i++) {
        this.props.incrementTen();

      }
    } else if (this.props.bulletMachinesBought < 19) {
      for (let i = 0; i < Math.round(this.props.bulletMachinesBought / 20); i++) {
        this.props.incrementFifteen();

      }
    } else if (this.props.bulletMachinesBought < 24) {
      for (let i = 0; i < Math.round(this.props.bulletMachinesBought / 25); i++) {
        this.props.incrementTwenty();

      }
    }
  }

  countUpFactory = () => {
    if (this.props.bulletFactoriesBought < 5) {
      for (let i = 0; i < this.props.bulletFactoriesBought; i++) {
        this.props.incrementFive();
      }
    } else if (this.props.bulletFactoriesBought < 9) {
      for (let i = 0; i < Math.round(this.props.bulletFactoriesBought / 10); i++) {
        this.props.incrementTen();
      }
    } else if (this.props.bulletFactoriesBought < 15) {
      for (let i = 0; i < Math.round(this.props.bulletFactoriesBought / 15); i++) {
        this.props.incrementFifteen();
      }
    } else if (this.props.bulletFactoriesBought < 20) {
      for (let i = 0; i < Math.round(this.props.bulletFactoriesBought / 20); i++) {
        this.props.incrementTwenty();
      }
    } else if (this.props.bulletFactoriesBought <= 25) {
      for (let i = 0; i < Math.round(this.props.bulletFactoriesBought / 25); i++) {
        this.props.incrementTwentyFive();
      }
    }
  }

  render() {
    return (
      <View>
        <ScrollView style={styles.container} horizontal={true}>
          <Card
            title='Bullet Machine'
            image={require('../../assets/images/PNGPIX-COM-Bullet-PNG-Transparent-Image-1-500x373.png')}
            containerStyle={{ padding: 0, width: device_width * .91, height: device_height * .69 }}
          >
            <Button title="Buy Now!" onPress={() => this._onPress('checkCanBuyBulletMachine')} />
            <Text style={styles.container}>{this.props.priceOfBulletMachine}</Text>
            <Text style={styles.container}>This is a bullet machine</Text>
          </Card>

          <Card
            title='Bullet Factory'
            image={require('../../assets/images/silverBullets.png')}
            containerStyle={{ padding: 0, width: device_width * .91, height: device_height * .69 }}
          >
            <Button title="Buy Now!" onPress={() => this._onPress('checkCanBuyBulletFactory')} />
            <Text style={styles.container}>{this.props.priceOfBulletFactory}</Text>
            <Text style={styles.container}>This is a bullet factory</Text>
          </Card>

        </ScrollView>

        <Text style={{ fontSize: 30 }}>Bullets: {this.props.count}</Text>

      </View>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GunComponent);

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    fontSize: 20,
    textAlign: 'center',
  },

});
