import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Button } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  row: { padding: 20, flexDirection: 'row' },
});

const Row = props => (
  <View>
    <Text></Text>
    <Text></Text>
    <Button title='Buy!'/>
  </View>
);

Row.propTypes = {
  imageIcon: PropTypes.string,
  itemName: PropTypes.string,
  itemCost: PropTypes.string,
};

export default Row;
