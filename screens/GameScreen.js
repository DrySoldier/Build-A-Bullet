import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, Alert, } from 'react-native';
import { Loop, Stage, World, Body } from 'react-game-kit/native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as Actions from '../redux/Actions/ActionTypes';
import PlayerShip from '../reactGameKit/PlayerShip';

const mapStateToProps = (state) => ({
    count: state.counterReducer.count
});

const mapDispatchToProps = (dispatch) => ({
    increment: () => dispatch({ type: Actions.COUNTER_INCREMENT }),
    decrement: () => dispatch({ type: Actions.COUNTER_DECREMENT }),
});

const device_width = Dimensions.get('window').width;
const device_height = Dimensions.get('window').height;

class GameScreen extends React.Component {
    static navigationOptions = {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: false,
    }

    static contextTypes = {
        loop: PropTypes.object,
    };

    constructor(props) {
        super(props)

        this.state = {
            leftPosition: device_width / 2,
            topPosition: device_height / 2,

            lastTouchPosition: [0, 0]

        }

    }

    componentDidMount() {
        this.context.loop.subscribe(this.update);
    }

    componentWillUnmount() {
        this.context.loop.unsubscribe(this.update);
    }

    handlePress(evt) {

        this.setState({ leftPosition: evt.nativeEvent.locationX - 15 });
        this.setState({ topPosition: evt.nativeEvent.locationY - 100 });

        this.setState({ lastTouchPosition: [evt.nativeEvent.locationX, evt.nativeEvent.locationY] });
        console.log(this.state.lastTouchPosition)


    }

    update = () => {

    };

    render() {
        return (
            <TouchableOpacity activeOpacity={1} onPress={(evt) => this.handlePress(evt)} style={styles.container} >
                <Stage width={device_width} height={device_height} >
                    <World>
                        <Text style={styles.text}>{this.props.count}</Text>
                        <TouchableOpacity activeOpacity={1} style={{
                            top: this.state.topPosition,
                            left: this.state.leftPosition,
                        }}>
                            <PlayerShip />
                        </TouchableOpacity>
                    </World>
                </Stage>
            </TouchableOpacity>
        );
    }
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    text: {
        paddingTop: 15,
        fontSize: 60,
        color: 'white',
        backgroundColor: 'black'
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);