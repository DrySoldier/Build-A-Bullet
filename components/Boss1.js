import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, Alert, Animated } from 'react-native';
import { Stage } from 'react-game-kit/native';
import PlayerShip from './PlayerShip';
import EnemyShip from './EnemyShip';

import PropTypes from 'prop-types';

import ImageLoader from '../components/ImageLoader';

import { connect } from 'react-redux';
import * as Actions from '../redux/Actions/ActionTypes';

const mapStateToProps = (state) => ({
    count: state.counterReducer.count,

    fuel: state.fuelReducer.fuel,

    gameOver: state.gameReducer.gameOver,

    loadAnimation: state.animationReducer.loadAnimation,

});

const mapDispatchToProps = (dispatch) => ({
    increment: () => dispatch({ type: Actions.COUNTER_INCREMENT }),
    decrement: () => dispatch({ type: Actions.COUNTER_DECREMENT }),

    decrementFuel: () => dispatch({ type: Actions.DECREMENT_FUEL }),

    toggleGameOver: () => dispatch({ type: Actions.GAME_OVER }),
    toggleLoadAnimation: () => dispatch({ type: Actions.LOAD_ANIMATION }),
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

            // player states
            leftPosition: device_width / 2 - 25,
            topPosition: device_height / 2,

            // boss states
            leftBossPosition: device_width / 2 - 25,
            topBossPosition: -100,
            bossHealth: 1000,

            // enemy states
            enemyLeftPosition: this.randomIntFromInterval(0, device_width),
            enemyTopPosition: -100,
            enemies: [],
            waveNumber: 0,
            currentEnemyAmount: 25,

            dimensionsOfRectX: [],
            dimensionsOfRectY: [],
            dimensionsOfRectHeight: [],
            dimensionsOfRectWidth: [],

            // key
            i: 0,

            // not used
            lastTouchPosition: [0, 0],


            // game states
            gameState: 0,
            triggered: false,
            bossAppearing: false,

        }

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

    // get dimensions of enemies

    find_dimesionsOfEnemy(layout) {
        const { x, y, width, height } = layout;

        this.setState({ dimensionsOfRectX: [...this.state.dimensionsOfRectX, x] })
        this.setState({ dimensionsOfRectY: [...this.state.dimensionsOfRectY, y] })
        this.setState({ dimensionsOfRectHeight: [...this.state.dimensionsOfRectHeight, height] })
        this.setState({ dimensionsOfRectWidth: [...this.state.dimensionsOfRectWidth, width] })

    }
    // first function

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

    // user input for fight

    handlePress = (evt) => {

        if (this.state.gameState == 1) {
            this.setState({ leftPosition: evt.nativeEvent.locationX - 15 });
            this.setState({ topPosition: evt.nativeEvent.locationY });

            if (this.props.fuel != 0) {
                this.props.decrementFuel();
            } else if (this.props.fuel == 0) {
                Alert.alert('Ran out of fuel! Pulling back!');

                this.setState({ gameState: 3 })
                this.timeout = setTimeout(timeout = () => { this.props.toggleGameOver() }, 4000);
            }
        }
    }

    // beginning of boss battle

    beginningOfBossBattle = () => {
        Alert.alert(
            'Gah, how did you dodge it all!',
            '',
            [
                {
                    text: 'OK', onPress: () => this.interval3 = setInterval(interval3 = () => {
                        this.setState({ topBossPosition: this.randomIntFromInterval(200, device_height) })
                        this.setState({ leftBossPosition: this.randomIntFromInterval(0, device_width) })
                    }, 2000)
                },
            ],
            { cancelable: false }
        )
    }

    // update loop

    update = () => {

        // gameState 0 = intro
        // gameState 1 = gameplay, userinput
        // gameState 2 = winning
        // gameState 3 = losing

        // first, set boss position and lowering

        if (this.state.gameState == 0) {

            // topBossPostion < Position you want boss to stop

            if (this.state.topBossPosition < 200) {

                this.setState({ topBossPosition: this.state.topBossPosition + 2 });

                this.timeout1 = setTimeout(timeout1 = () => { this.nextState() }, 2000);

            }

            // generate enemies and put them places

        } else if (this.state.gameState == 1) {

            this.setState({ topBossPosition: this.state.topBossPosition - 10 });

            this.setState({ enemyTopPosition: this.state.enemyTopPosition + 10 })

            this.setState({ lastTouchPosition: ["X: " + this.state.leftPosition, "Y: " + this.state.topPosition] });

            for (let i = 0; i < this.state.enemies.length; i++) {

                // collision

                if (this.state.dimensionsOfRectY[i] + this.state.dimensionsOfRectHeight[i] + 7 > this.state.topPosition && // top collision
                    this.state.dimensionsOfRectY[i] - 20 < this.state.topPosition && // bottom collision
                    this.state.dimensionsOfRectX[i] + this.state.dimensionsOfRectWidth[i] + 7 > this.state.leftPosition && // left collision
                    this.state.dimensionsOfRectX[i] - 40 < this.state.leftPosition) { // right collision

                    // what happens if hit
                    this.setState({ topPosition: 20000 })

                }

            }

            // winning

        } else if (this.state.gameState == 2) {

            if (this.state.bossHealth < 0) {
                this.setState({ gameState: 0 })

                Alert.alert('You destroyed the enemy ship!');

                this.props.toggleGameOver()
            }

            if (this.state.topBossPosition < 200) {

                this.setState({ topBossPosition: this.state.topBossPosition + 2 });

            }

            if (!this.state.bossAppearing && this.state.gameState != 3) {

                this.setState({ bossAppearing: true });

                this.timeout1 = setTimeout(timeout1 = () => { this.beginningOfBossBattle() }, 2000);

                this.setState({ topBossPosition: -150 })

            }

            // make player retreat

        } else if (this.state.gameState == 3) {
            this.setState({ topPosition: this.state.topPosition + 3 })
        }

    };

    exitAnimation = () => {
        if (this.props.loadAnimation) {
            this.props.toggleLoadAnimation();
            this.setState({ waveNumber: this.state.waveNumber + 1 })

            this.timeout2 = setTimeout(timeout2 = () => {
                this.setState({ enemies: [] });
                this.props.toggleLoadAnimation();
            }, 500);
        }
    }

    render() {

        // generate enemy function

        generateEnemy = () => {

            if (this.state.enemies.length < this.state.currentEnemyAmount && this.state.gameState == 1) {

                this.setState({ i: this.state.i + 1 });

                // create enemy view

                this.setState({
                    enemies: [...this.state.enemies,

                    <TouchableOpacity activeOpacity={1}>
                        <ImageLoader onLayout={(event) => { this.find_dimesionsOfEnemy(event.nativeEvent.layout) }}
                            key={this.state.i}
                            style={{
                                top: this.state.enemyTopPosition,
                                left: this.randomIntFromInterval(0, device_width),
                                height: 100,
                                width: 40,
                                backgroundColor: 'purple',
                                position: "absolute",
                                borderRadius: 25,
                                zIndex: 1,
                            }}
                            source={{ uri: 'https://art.pixilart.com/6867567d515ebe4.png' }} />
                    </TouchableOpacity>
                    ]
                });

            } else if (this.state.waveNumber == 5 && this.state.gameState != 3) {

                this.exitAnimation();

                this.setState({ enemyTopPosition: -10 });
                this.setState({ i: 0 });
                this.setState({ dimensionsOfRectX: [] });
                this.setState({ dimensionsOfRectY: [] });

                // comment this to set boss to never appear
                this.setState({ gameState: 2 });

            } else if (this.state.gameState != 0) {

                this.exitAnimation();

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
                        onPress={() => this.setState({ bossHealth: this.state.bossHealth - 100 })}
                        activeOpacity={.5} style={{
                            top: this.state.topBossPosition,
                            left: this.state.leftBossPosition,
                            position: 'absolute',
                        }}>
                        <EnemyShip />
                    </TouchableOpacity>

                    {this.state.enemies}

                    <View animation="fadeIn">
                        <TouchableOpacity
                            activeOpacity={1} style={{
                                top: this.state.topPosition,
                                left: this.state.leftPosition,
                                position: 'absolute',
                            }}>
                            <PlayerShip ref={this.handleTextRef} />
                        </TouchableOpacity>
                    </View>
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
        borderRadius: 10,
        zIndex: 1,

    }

});

export default connect(mapStateToProps, mapDispatchToProps)(Boss1);
