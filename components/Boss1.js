import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, Alert, Animated, Button } from 'react-native';

import { Stage } from 'react-game-kit/native';
import GameHeader from './GameHeader';
import GameBoard from './GameBoard';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as Actions from '../redux/Actions/ActionTypes';
import TextBox from './TextBox';

const mapStateToProps = (state) => ({

    gameOver: state.gameReducer.gameOver,

    fuel: state.fuelReducer.fuel

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

const delay = t => new Promise(resolve => setTimeout(resolve, t));

class Boss1 extends React.Component {

    static contextTypes = {
        loop: PropTypes.object,
    };

    constructor(props) {
        super(props)

        this.state = {

            tiles: [
                0, 0, 0,
            ],

            currentText: '',

            playerCurrentPosition: -1,

        }

        this.gameState = 0;

        this.currentLaserTiles = [];

        this.lastIndexOfPlayer = -1;

        // GAMEPLAY VARIABLES - BE CAREFUL
        this.enemyCreationSpeed = 1750;
        // MUST BE OVER 300ms
        this.laserLifeStart = 700;
        this.laserLifeEnding = 1500;
        this.timeBetweenWarnings = 50;

        // UNUSED
        this.bossHealth = 1000;
        this.waveNumber = 0;

    }

    // setting up enemies and loop once component mounts

    componentDidMount() {
        this.context.loop.subscribe(this.update);

        // set player 
        delay(100).then(() => {
            this.setState({ playerCurrentPosition: 1 });
            this.lastIndexOfPlayer = 0;
        });

        // set enemy
        delay(1000).then(() => {
            this.handlePositionChange(1, 1);
        });

        delay(2000).then(() => this.setState({ currentText: 'Time to die.' }));

    }

    // disengaging loop

    componentWillUnmount() {
        this.context.loop.unsubscribe(this.update);
    }


    // arguments - (WHERE STATE IS GOING, WHAT THE STATE IS)
    handlePositionChange = (index, nextState) => {

        let splicedArr = [...this.state.tiles];

        if (nextState === 2) {
            this.currentLaserTiles.push(index);
        }

        splicedArr.splice(index, 1, nextState);

        this.setState({ tiles: splicedArr });

    }

    callbackFunction = () => {

        this.setState({ currentText: '' });

        if (this.gameState === 0) {
            this.handlePositionChange(1, 0);

            this.gameState = 1;

            // let bulletWave = [[0, 1000], [1, 2000], [2, 3000], [1, 4000], [0, 5000]];

            setInterval(interval = () => {
                this.createNewBulletWave();

            }, this.enemyCreationSpeed)

            this.createNewBulletWave();

        } else if (this.gameState === 3) {
            this.props.toggleGameOver();
        }

    }

    createNewBulletWave = bulletMap => {

        this.currentLaserTiles = [];

        for (let i = 0; i < bulletMap; i++) {

            let spawnPoint = randomIntFromInterval(0, 2);

            let bWarn = false;

            this.handlePositionChange(spawnPoint, -1);

            let interval = setInterval(interval = () => {

                if (bWarn) {

                    this.handlePositionChange(spawnPoint, -1);

                } else if (!bWarn) {

                    this.handlePositionChange(spawnPoint, 0);
                }

                bWarn = !bWarn;

            }, this.timeBetweenWarnings);

            delay(this.laserLifeStart).then(() => {
                clearInterval(interval);
                this.handlePositionChange(spawnPoint, 2);

            });

            delay(this.laserLifeEnding).then(() => {
                this.handlePositionChange(spawnPoint, 0);
                this.currentLaserTiles = [];
            });
        }
    }

    // user input for fight, everytime they press on the screen this function triggers

    handlePress = index => {

        if (this.lastIndexOfPlayer !== index && this.gameState != 0) {

            this.lastIndexOfPlayer = index;

            this.setState({ playerCurrentPosition: index });

            // Handle fuel drop
            if (this.props.fuel != 0) {
                this.props.decrementFuel();

            } else if (this.props.fuel === 1) {
                this.setState({ currentText: 'Ran out of fuel! Pulling back.' });

                this.gameState = 3;
            }

        } else {
            // pew pew
        }

    }

    // update loop, triggers consistently, 16ms (mybe)

    update = () => {

        // gameState 0 = intro
        // gameState 1 = gameplay, userinput
        // gameState 2 = boss phase
        // gameState 3 = losing

        // check to see if player is in DANGER ZONE at any given moment.
        // if true, decrement their bullets

        if (this.gameState === 1)
            for (let i = 0; i < this.currentLaserTiles.length; i++) {
                if (this.state.playerCurrentPosition === this.currentLaserTiles[i]) {
                    this.props.decrement();
                }
            }

    };

    render() {
        return (
            <View style={styles.container} >
                <GameHeader />

                <Stage
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    width={device_width} height={device_height}>

                    <GameBoard
                        tileLayout={this.state.tiles}
                        onRef={ref => (this.GameBoardRef = ref)}
                        GameBoardRef={this.handlePress.bind(this)}
                        shipSrc={require("../assets/spriteSheet/Ships/Saboteur.png")}
                        currentPosition={this.state.playerCurrentPosition}
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
        marginLeft: 5
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(Boss1);