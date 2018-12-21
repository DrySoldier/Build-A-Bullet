import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Text, Button, Dimensions, Alert } from 'react-native';

import { connect } from 'react-redux';
import * as Actions from '../redux/Actions/ActionTypes';
import BestGameEver from '../ReactGameEngine/index.ios';

const mapStateToProps = (state) => ({
    count: state.counterReducer.count
});

const mapDispatchToProps = (dispatch) => ({
    increment: () => dispatch({ type: Actions.COUNTER_INCREMENT }),
    decrement: () => dispatch({ type: Actions.COUNTER_DECREMENT }),
});


console.disableYellowBox = true;

const device_width = Dimensions.get('window').width;
const device_height = Dimensions.get('window').height;

class GameScreen extends React.Component {
    static navigationOptions = {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: false,
    }

    constructor(props) {
        super(props)
    }


    render() {
        return (
            <View>
                <Text style={{ fontSize: 60 }}>{this.props.count}</Text>
                <BestGameEver />
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

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);