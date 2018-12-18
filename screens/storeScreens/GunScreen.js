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
import bulletMachineData from '../../constants/storeData'

import { connect } from 'react-redux';
import * as Actions from '../../redux/Actions/ActionTypes';

const mapStateToProps = (state) => ({
  bulletMachinesBought: state.counterReducer.bulletMachinesBought,
  count: state.counterReducer.count,
  priceOfBulletMachine: state.counterReducer.priceOfBulletMachine,
});

const mapDispatchToProps = (dispatch) => ({
  buyBulletMachine: () => dispatch({ type: Actions.BUY_BULLET_MACHINE }),
  increment: () => dispatch({ type: Actions.COUNTER_INCREMENT }),
});

const device_width = Dimensions.get('window').width;
const device_height = Dimensions.get('window').height;

class GunComponent extends React.Component {

  componentDidMount(){
    bulletMachineData[1].itemPrice = this.props.priceOfBulletMachine;
  }

  static navigationOptions = {
    title: "Buildin' Bullets Store",
  }

  constructor(props) {
    super(props);

    const callCountUp = setInterval(this.countUp, 1000);

    this._onPress = this._onPress.bind(this);

    this.state = {
      data: bulletMachineData
    };
  }

  _onPress = (e) => {
    switch (e) {
      case 'checkCanBuyBullet':
        this.props.buyBulletMachine()
        
        this.props.navigation.navigate('Links');

        this.callCountUp

        break;

      default:
        alert('how did you trigger this')
        break;
    }
  };

  countUp = () => {
    for (let i = 0; i < this.props.bulletMachinesBought; i++) {
      this.props.increment();
    }
  }

  render() {
    return (
      <FlatList
        horizontal
        data={this.state.data}
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