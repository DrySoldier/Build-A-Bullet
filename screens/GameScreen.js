import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, Alert, Animated } from 'react-native';
import { Loop, Stage, World, Body } from 'react-game-kit/native';
import PlayerShip from '../reactGameKit/PlayerShip';
import EnemyShip from '../reactGameKit/EnemyShip';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as Actions from '../redux/Actions/ActionTypes';

const mapStateToProps = (state) => ({
    count: state.counterReducer.count,

    fuel: state.fuelReducer.fuel
});

const mapDispatchToProps = (dispatch) => ({
    increment: () => dispatch({ type: Actions.COUNTER_INCREMENT }),
    decrement: () => dispatch({ type: Actions.COUNTER_DECREMENT }),

    decrementFuel: () => dispatch({ type: Actions.DECREMENT_FUEL })
});

const device_height = Dimensions.get('window').height;
const device_width = Dimensions.get('window').width;

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
            leftPosition: device_width / 2 - 25,
            topPosition: device_height / 2,

            leftBossPosition: device_width / 2 - 25,
            topBossPosition: -100,

            enemyLeftPosition: this.randomIntFromInterval(0, device_width),
            enemyTopPosition: -50,

            enemies: [],
            waveNumber: 0,

            dimensionsOfRectX: [],
            dimensionsOfRectY: [],
            dimensionsOfRectHeight: [],
            dimensionsOfRectWidth: [],

            i: 0,

            lastTouchPosition: [0, 0],

            visible: props.visible,

            gameState: 0,

            triggered: false,

        }

    }

    // random num generator for randomly placed enemies

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // get dimensions of enemies

    find_dimesionsOfEnemy(layout) {
        const { x, y, width, height } = layout;

        this.setState({ dimensionsOfRectX: [...this.state.dimensionsOfRectX, x] })
        this.setState({ dimensionsOfRectY: [...this.state.dimensionsOfRectY, y] })
        this.setState({ dimensionsOfRectHeight: [...this.state.dimensionsOfRectHeight, height] })
        this.setState({ dimensionsOfRectWidth: [...this.state.dimensionsOfRectWidth, width] })

    }

    nextState = () => {

        if (!this.state.triggered) {
            Alert.alert(
                'Time to die',
                '',
                [
                    { text: 'OK', onPress: () => this.setState({ gameState: 1 }) },
                ],
                { cancelable: false }
            )

            this.setState({ triggered: true })
        }
    }

    // user input

    handlePress = (evt) => {

        if (this.state.gameState == 1) {
            this.setState({ leftPosition: evt.nativeEvent.locationX - 15 });
            this.setState({ topPosition: evt.nativeEvent.locationY });

            this.props.decrementFuel();

        }

        if (this.props.fuel < 2) {
            Alert.alert('Ran out of fuel! Pulling back!');

            this.setState({ gameState: 3 })
            this.timeout = setTimeout(timeout = () => { this.props.navigation.navigate('Home') }, 4000);
        }
    }

    // setting up enemies and loop once component mounts

    componentDidMount() {
        this.context.loop.subscribe(this.update);

        this.interval = setInterval(function () { generateEnemy() }, 5);

    }

    // disengaging loop

    componentWillUnmount() {
        this.context.loop.unsubscribe(this.update);
    }

    // update loop

    update = () => {

        // gameState 0 = intro
        // gameState 1 = gameplay, userinput
        // gameState 3 = losing
        // gameState 2 = ???

        if (this.state.gameState == 0) {

            if (this.state.topBossPosition < 200) {

                this.setState({ topBossPosition: this.state.topBossPosition + 2 });

                this.timeout1 = setTimeout(timeout1 = () => { this.nextState() }, 2000);

            }


        } else if (this.state.gameState == 1) {

            this.setState({ topBossPosition: this.state.topBossPosition - 10 });

            this.setState({ enemyTopPosition: this.state.enemyTopPosition + 10 })

            this.setState({ lastTouchPosition: ["X: " + this.state.leftPosition, "Y: " + this.state.topPosition] });

            for (let i = 0; i < this.state.enemies.length; i++) {

                if (this.state.dimensionsOfRectY[i] + this.state.dimensionsOfRectHeight[i] + 7 > this.state.topPosition && // top collision
                    this.state.dimensionsOfRectY[i] - 20 < this.state.topPosition && // bottom collision
                    this.state.dimensionsOfRectX[i] + this.state.dimensionsOfRectWidth[i] + 7 > this.state.leftPosition && // left collision
                    this.state.dimensionsOfRectX[i] - 40 < this.state.leftPosition) { // right collision

                    this.setState({ topPosition: 20000 })

                }

            }
        } else if (this.state.gameState == 3) {
            this.setState({ topPosition: this.state.topPosition + 3 })
        }

    };

    render() {

        // generate enemy function

        generateEnemy = () => {

            // number of enemies = 125 as of right now

            if (this.state.enemies.length < 120 && this.state.gameState == 1) {

                this.setState({ i: this.state.i + 1 });
                this.setState({ waveNumber: this.state.waveNumber + 1 })

                // create enemy view

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

                // reset once enemy limit is reached

                this.setState({ enemies: [] });
                this.setState({ enemyTopPosition: -10 });
                this.setState({ i: 0 });
                this.setState({ dimensionsOfRectX: [] });
                this.setState({ dimensionsOfRectY: [] });
            }
        }

        return (
            <TouchableOpacity activeOpacity={1} onPress={(evt) => this.handlePress(evt)} style={styles.container} >
                <Stage width={device_width} height={device_height} >
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        position: 'absolute'
                    }}>
                        <TouchableOpacity activeOpacity={1}>
                            <Text style={styles.text}>{this.props.count}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1}>
                            <Text style={styles.text}>{this.props.fuel}/100</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        activeOpacity={1} style={{
                            top: this.state.topBossPosition,
                            left: this.state.leftBossPosition,
                            position: 'absolute',
                        }}>
                        <EnemyShip />
                    </TouchableOpacity>
                    {this.state.enemies}

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
        paddingTop: 20,
        fontSize: 40,
        paddingLeft: 40,
        color: 'white',
        backgroundColor: 'black',
        zIndex: 99
    },
    enemy: {
        height: 100,
        width: 100,
        backgroundColor: 'white',
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
