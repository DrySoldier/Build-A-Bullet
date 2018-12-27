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

const device_height = Dimensions.get('window').height;
const device_width = Dimensions.get('window').width;

class GameScreen extends React.Component {
    static navigationOptions = {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: false,
    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    find_dimesionsOfEnemy(layout) {
        const { x, y, width, height } = layout;

        this.setState({ dimensionsOfRectX: [...this.state.dimensionsOfRectX, x] })
        this.setState({ dimensionsOfRectY: [...this.state.dimensionsOfRectY, y] })
        this.setState({ dimensionsOfRectHeight: [...this.state.dimensionsOfRectHeight, height] })
        this.setState({ dimensionsOfRectWidth: [...this.state.dimensionsOfRectWidth, width] })

    }

    handlePress(evt) {

        this.setState({ leftPosition: evt.nativeEvent.locationX - 15 });
        this.setState({ topPosition: evt.nativeEvent.locationY });

    }

    static contextTypes = {
        loop: PropTypes.object,
    };

    constructor(props) {
        super(props)

        this.state = {
            leftPosition: device_width / 2,
            topPosition: device_height / 2,

            enemyLeftPosition: this.randomIntFromInterval(0, device_width),
            enemyTopPosition: 100,

            enemies: [],

            dimensionsOfRectX: [],
            dimensionsOfRectY: [],
            dimensionsOfRectHeight: [],
            dimensionsOfRectWidth: [],

            i: 0,

            lastTouchPosition: [0, 0],

        }

    }

    componentDidMount() {
        this.context.loop.subscribe(this.update);

        this.interval = setInterval(function () { generateEnemy() }, 5);

    }

    componentWillUnmount() {
        this.context.loop.unsubscribe(this.update);
    }

    update = () => {

        this.setState({ enemyTopPosition: this.state.enemyTopPosition + 8 })

        this.setState({ lastTouchPosition: ["X: " + this.state.leftPosition, "Y: " + this.state.topPosition] });

        for (let i = 0; i < this.state.enemies.length; i++) {

            if (this.state.dimensionsOfRectY[i] + this.state.dimensionsOfRectHeight[i] + 7 > this.state.topPosition && // top collision
                this.state.dimensionsOfRectY[i] - 20 < this.state.topPosition && // bottom collision
                this.state.dimensionsOfRectX[i] + this.state.dimensionsOfRectWidth[i] + 7 > this.state.leftPosition && // left collision
                this.state.dimensionsOfRectX[i] - 40 < this.state.leftPosition) { // right collision

                this.setState({topPosition: 20000})

            }

        }

    };

    render() {

        generateEnemy = () => {

            if (this.state.enemies.length < 125) {

                this.setState({ i: this.state.i + 1 });

                this.setState({
                    enemies: [...this.state.enemies,
                    <TouchableOpacity activeOpacity={1}>
                        <View onLayout={(event) => { this.find_dimesionsOfEnemy(event.nativeEvent.layout) }}
                            key={this.state.i}
                            style={{
                                top: this.state.enemyTopPosition,
                                left: this.randomIntFromInterval(0, device_width),
                                height: 50,
                                width: 15,
                                backgroundColor: 'purple',
                                position: "absolute",
                            }}>

                        </View>
                    </TouchableOpacity>]
                });
            } else {
                /*this.setState({ enemies: [] });
                this.setState({ enemyTopPosition: 100 });
                this.setState({ i: 0 });
                this.setState({ dimensionsOfRectX: [] })
                this.setState({ dimensionsOfRectY: [] })*/
            }
        }

        return (
            <TouchableOpacity activeOpacity={1} onPress={(evt) => this.handlePress(evt)} style={styles.container} >
                <Stage width={device_width} height={device_height} >
                    {this.state.enemies}
                    <Text style={styles.text}>{this.props.count}</Text>
                    <TouchableOpacity
                        activeOpacity={1} style={{
                            top: this.state.topPosition,
                            left: this.state.leftPosition,
                            position: 'absolute',
                        }}>
                        <PlayerShip />
                    </TouchableOpacity>
                </Stage>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        position: 'relative',
    },
    text: {
        paddingTop: 15,
        fontSize: 60,
        color: 'white',
        backgroundColor: 'black'
    },
    enemy: {
        height: 100,
        width: 100,
        backgroundColor: 'white',
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);


/*this.setState({ enemyTopPosition: this.state.enemyTopPosition + 1 })

if (this.state.enemyTopPosition >= 300) {
    this.setState({ enemyTopPosition: 0 });
    console.log('triggered')
}*/