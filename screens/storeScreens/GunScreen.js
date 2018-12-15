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

const device_width = Dimensions.get('window').width;
const device_height = Dimensions.get('window').height;


export default class GunComponent extends React.Component {

  static navigationOptions = {
    title: 'Buildin Bullets Store',
  }

  constructor(props) {
    super(props);
    this.state = {
      data: bulletMachineData
    };
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
              containerStyle={{ padding: 0, width: device_width*.91, height: device_height*.69 }}
            >
              <Button title="Buy Now!" onPress={rowData.buyButton}/>
              <Text style={{ marginBottom: 5, fontSize: 20, textAlign: 'center', }}>
                {rowData.itemPrice}
              </Text>
              <Text style={{ marginBottom: 5, fontSize: 20, textAlign: 'center', }}>
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