import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, Alert, Animated } from 'react-native';

import { Stage } from 'react-game-kit/native';
import TypeWriter from 'react-native-typewriter';

import GameHeader from './GameHeader';
import GameBoard from './GameBoard';

import PropTypes from 'prop-types';

import ImageLoader from '../components/ImageLoader';

import { connect } from 'react-redux';
import * as Actions from '../redux/Actions/ActionTypes';

const mapStateToProps = (state) => ({

    gameOver: state.gameReducer.gameOver,

});

const mapDispatchToProps = (dispatch) => ({
    increment: () => dispatch({ type: Actions.COUNTER_INCREMENT }),
    decrement: () => dispatch({ type: Actions.COUNTER_DECREMENT }),

    decrementFuel: () => dispatch({ type: Actions.DECREMENT_FUEL }),

    toggleGameOver: () => dispatch({ type: Actions.GAME_OVER }),
    toggleLoadAnimation: () => dispatch({ type: Actions.LOAD_ANIMATION }),

    decreaseDelay: () => dispatch({ type: Actions.DECREASE_DELAY }),
    defaultDelay: () => dispatch({ type: Actions.DEFAULT_DELAY }),
    defaultLowDelay: () => dispatch({ type: Actions.DEFAULT_LOW_DELAY }),
});

const device_height = Dimensions.get('window').height;
const device_width = Dimensions.get('window').width;

class Boss1 extends React.Component {

    static contextTypes = {
        loop: PropTypes.object,
    };

    constructor(props) {
        super(props)

        this.state = {

            bossHealth: 1000,

            enemies: [],
            waveNumber: 0,
            currentEnemyAmount: 35,

            // game states
            gameState: 0,
            triggered: false,
            bossAppearing: false,

            tiles: [
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
            ],

        }

        this.lastIndex = -1;
        this.interval;

    }

    // setting up enemies and loop once component mounts

    componentDidMount() {
        this.context.loop.subscribe(this.update);

        this.interval = setInterval(function () { generateEnemy() }, 100);
    }

    // disengaging loop

    componentWillUnmount() {
        this.context.loop.unsubscribe(this.update);

        clearInterval(this.interval);
    }

    // random num generator for randomly placed enemies

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // user input for fight, everytime they press on the screen this function triggers

    handlePress = index => {

        if (this.lastIndex !== index) {
            let splicedArr = [...this.state.tiles];

            splicedArr.splice(index, 1, 1);
            splicedArr.splice(this.lastIndex, 1, 0);

            this.lastIndex = splicedArr.indexOf(1);

            this.setState({ tiles: splicedArr });

            // Handle fuel drop
            if (this.props.fuel != 0) {
                this.props.decrementFuel();
            } else if (this.props.fuel == 0) {
                Alert.alert('Ran out of fuel! Pulling back!');

                this.setState({ gameState: 3 });
                this.timeout = setTimeout(timeout = () => { this.props.toggleGameOver() }, 4000);
            }

        } else {
            // pew pew
        }

    }

    // update loop, triggers consistently, 16ms (mybe)

    update = () => {

        // gameState 0 = intro
        // gameState 1 = gameplay, userinput
        // gameState 2 = winning
        // gameState 3 = losing

        // first, set boss position and lowering

        if (this.state.gameState == 0) {

            // intro here

        } else if (this.state.gameState == 1) {

            // gamestart 

            // COLLISION GOES HERE

            // winning

        } else if (this.state.gameState == 2) {

            // attack boss phase

            if (this.state.bossHealth < 0) {
                this.setState({ gameState: 0 })

                Alert.alert('You destroyed the enemy ship!');

                // let other js file know that game is over to go back
                this.props.toggleGameOver();
            }

            // player loses

        } else if (this.state.gameState == 3) {
            // Put player losing stuff here
        }

    };

    render() {

        // generate enemy function

        generateEnemy = () => {

            if (this.state.enemies.length < this.state.currentEnemyAmount && this.state.gameState == 1) {

                // create enemy view

            } else if (this.state.waveNumber == 5 && this.state.gameState != 3) {

                // comment this to set boss to never appear
                // this.setState({ gameState: 2 });

            } else if (this.state.gameState != 0) {

                // I have no idea what goes here.
                // Maybe a fail-safe to ensure boss leaves at right time?

            }
        }

        return (
            <TouchableOpacity activeOpacity={1} onPress={(evt) => this.handlePress(evt)} style={styles.container}  >
                <Stage width={device_width} height={device_height} >

                    <GameHeader />

                    <GameBoard tileLayout={this.state.tiles}
                        onRef={ref => (this.GameBoardRef = ref)}
                        GameBoardRef={this.handlePress.bind(this)}
                    />

                </Stage>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    enemy: {
        height: 100,
        width: 100,
        backgroundColor: 'white',
        borderRadius: 10,
        zIndex: 1,
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(Boss1);
