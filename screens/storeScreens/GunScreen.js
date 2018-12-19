import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  FlatList,
  Dimensions
} from 'react-native';
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

  bulletFactoryIncrement: () => dispatch({ type: Actions.COUNTER_FACTORY_INCREMENT }),
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

    const bulletMachineData = [
      {
        imagePath: 'https://qph.fs.quoracdn.net/main-qimg-2089461a7bd8102a66b5f0168f14035a',
        itemName: 'Bullet Machine',
        itemPrice: this.props.priceOfBulletMachine,
        itemDescription: 'This is a bullet machine',
        buyButton: 'checkCanBuyBulletMachine'

      },
      {
        imagePath: 'https://c7.uihere.com/files/211/601/184/5bbc14d49a6a7-thumb.jpg',
        itemName: 'Bullet Factory',
        itemPrice: this.props.priceOfBulletFactory,
        itemDescription: 'This is a bullet factory',
        buyButton: 'checkCanBuyBulletFactory'
      },

    ];

    const callCountUpMachine = setInterval(this.countUpMachine, 1000);
    const callCountUpFactory = setInterval(this.countUpFactory, 1000);

    this._onPress = this._onPress.bind(this);

    this.state = {
      data: bulletMachineData
    };
  }

  _onPress = (e) => {
    switch (e) {
      case 'checkCanBuyBulletMachine':

        if (this.props.count >= this.props.priceOfBulletMachine) {
          this.props.buyBulletMachine()

          this.props.navigation.navigate('Links');

          this.callCountUpMachine

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
       
          this.props.navigation.navigate('Links');

          this.callCountUpFactory

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
    for (let i = 0; i < this.props.bulletMachinesBought; i++) {
      this.props.increment();
    }
  }

  countUpFactory = () => {
    console.log(this.props.bulletFactoriesBought)
    for (let i = 0; i < this.props.bulletFactoriesBought; i++) {
      this.props.bulletFactoryIncrement();
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <FlatList
          horizontal
          data={this.state.data}
          extraData={this.props}
          renderItem={({ item: rowData }) => {
            return (
              <Card
                title={rowData.itemName}
                image={{ uri: rowData.imagePath }}
                containerStyle={{ padding: 0, width: device_width * .91, height: device_height * .69 }}
              >
                <Button title="Buy Now!" onPress={() => this._onPress(rowData.buyButton)} />
                <Text style={styles.container}>
                  {rowData.itemPrice}
                </Text>
                <Text style={styles.container}>
                  {rowData.itemDescription}
                </Text>
              </Card>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />

        <Text style={{fontSize: 60, paddingLeft: device_width / 2,}}>{this.props.count}</Text>
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
    justifyContent: 'center'
  },

});