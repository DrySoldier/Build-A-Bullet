import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, Alert, Animated } from 'react-native';

import { Stage } from 'react-game-kit/native';
import GameHeader from './GameHeader';
import GameBoard from './GameBoard';

import PropTypes from 'prop-types';

import ImageLoader from '../components/ImageLoader';

import { connect } from 'react-redux';
import * as Actions from '../redux/Actions/ActionTypes';
import TextBox from './TextBox';

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

// random num generator for randomly placed enemies

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class Boss1 extends React.Component {

    static contextTypes = {
        loop: PropTypes.object,
    };

    constructor(props) {
        super(props)

        this.state = {

            //bossHealth: 1000,

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

            currentText: '',

        }

        this.gameState = 0;

        this.lastIndexOfPlayer = -1;
        this.indexOfLastEnemies = [];

        this.currentEnemyAmount = 3;
        this.enemyCreationSpeed = 2000;
        this.enemyVelocity = 200;

        this.waveNumber = 0;

        this.test = this.state.tiles;

    }

    // setting up enemies and loop once component mounts

    componentDidMount() {
        this.context.loop.subscribe(this.update);

        this.handlePositionChange(32, 1);

        setTimeout(timeout = () => {
            this.handlePositionChange(12, 2);
        }, 1000);

        setTimeout(timeout = () => {
            this.setState({ currentText: 'Time to die.' });
        }, 2000);

    }

    // disengaging loop

    componentWillUnmount() {
        this.context.loop.unsubscribe(this.update);
    }

    handlePositionChange = (index, nextState) => {

        let splicedArr = [...this.state.tiles];

        splicedArr.splice(index, 1, nextState);

        if (nextState === 1) {

            // this line changes the last spot of the player to be empty
            splicedArr.splice(this.lastIndexOfPlayer, 1, 0);

            // set last spot of player to check later
            this.lastIndexOfPlayer = splicedArr.indexOf(1);
        }

        this.setState({ tiles: splicedArr });

    }

    // user input for fight, everytime they press on the screen this function triggers

    handlePress = index => {

        if (this.lastIndexOfPlayer !== index && this.gameState != 0) {

            this.handlePositionChange([index], 1);

            // Handle fuel drop
            if (this.props.fuel != 0) {
                this.props.decrementFuel();
            } else if (this.props.fuel == 0) {
                Alert.alert('Ran out of fuel! Pulling back!');

                this.gameState = 3;
                setTimeout(timeout = () => { this.props.toggleGameOver() }, 4000);
            }

        } else {
            // pew pew
        }

    }

    callbackFunction = () => {

        this.setState({ currentText: '' });
        this.handlePositionChange(12, 0);

        this.gameState = 1;

        setInterval(timeout = () => {
            this.createNewBulletWave();

            // how fast enemies are created
        }, this.enemyCreationSpeed);

    }

    createNewBulletWave = () => {

        for (let i = 0; i < this.currentEnemyAmount; i++) {

            let spawnPoint = randomIntFromInterval(1, 5);
            let lastEnemyPosition = spawnPoint;

            this.handlePositionChange(spawnPoint, 3);

            let interval = setInterval(interval = () => {
                //console.log('Enemy updated');

                if (lastEnemyPosition > 45) {
                    clearInterval(interval);
                }

                this.handlePositionChange(spawnPoint += 5, 3);
                this.handlePositionChange(lastEnemyPosition, 0);
                lastEnemyPosition += 5;

                // how fast enemies move
            }, this.enemyVelocity);

        }

    }

    // update loop, triggers consistently, 16ms (mybe)

    update = () => {

        // gameState 0 = intro
        // gameState 1 = gameplay, userinput
        // gameState 2 = boss phase
        // gameState 3 = losing

        // first, set boss position and lowering

        if (this.gameState === 0) {

        } else if (this.gameState === 1) {

        } else if (this.gameState === 2) {

            // attack boss phase

            if (this.state.bossHealth < 0) {

                //this.gameState = 0;

                Alert.alert('You destroyed the enemy ship!');

                // let other js file know that game is over to go back
                this.props.toggleGameOver();
            }

            // player loses

        } else if (this.gameState === 3) {
            // Put player losing stuff here
        }

    };

    render() {
        return (
            <View style={styles.container} >
                <Stage width={device_width} height={device_height} >

                    <GameHeader />

                    <GameBoard tileLayout={this.state.tiles}
                        onRef={ref => (this.GameBoardRef = ref)}
                        GameBoardRef={this.handlePress.bind(this)}
                        shipSrc={require("../assets/spriteSheet/Ships/Saboteur.png")}
                    />

                    <View style={styles.textBoxContainer}>
                        <TextBox text={this.state.currentText} cb={() => this.callbackFunction()} />
                    </View>

                </Stage>

            </View >
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    textBoxContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        marginLeft: 20
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(Boss1);