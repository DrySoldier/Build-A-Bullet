import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, Alert, Animated } from 'react-native';
import { Stage } from 'react-game-kit/native';
import PlayerShip from './PlayerShip';
import EnemyShip from './EnemyShip';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as Actions from '../redux/Actions/ActionTypes';

const mapStateToProps = (state) => ({

    count: state.counterReducer.count,

    fuel: state.fuelReducer.fuel,

    gameOver: state.gameReducer.gameOver

});

const mapDispatchToProps = (dispatch) => ({

    increment: () => dispatch({ type: Actions.COUNTER_INCREMENT }),
    decrement: () => dispatch({ type: Actions.COUNTER_DECREMENT }),

    decrementFuel: () => dispatch({ type: Actions.DECREMENT_FUEL }),

    toggleGameOver: () => dispatch({ type: Actions.GAME_OVER }),

});

const device_height = Dimensions.get('window').height;
const device_width = Dimensions.get('window').width;

class Boss2 extends React.Component {

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
            enemyLeftPosition: 100,
            enemyTopPosition: 400,
            enemies: [],
            waveNumber: 0,

            dimensionsOfRectX: [],
            dimensionsOfRectY: [],
            dimensionsOfRectHeight: [],
            dimensionsOfRectWidth: [],

            // key
            i: 0,

            // game states
            gameState: 0,
            triggered: false,
            bossAppearing: false,

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
                'Time to die2',
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
            'Gah, how did you dodge it all!2',
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

            for (let i = 0; i < this.state.enemies.length; i++) {

                // collision

                if (this.state.dimensionsOfRectY[i] + this.state.dimensionsOfRectHeight[i] + 7 > this.state.topPosition && // top collision
                    this.state.dimensionsOfRectY[i] - 20 < this.state.topPosition && // bottom collision
                    this.state.dimensionsOfRectX[i] + this.state.dimensionsOfRectWidth[i] + 7 > this.state.leftPosition && // left collision
                    this.state.dimensionsOfRectX[i] - 40 < this.state.leftPosition) { // right collision

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

            if (!this.state.bossAppearing) {

                this.setState({ bossAppearing: true });

                this.timeout1 = setTimeout(timeout1 = () => { this.beginningOfBossBattle() }, 2000);

                this.setState({ topBossPosition: -100 })

            }

            // make player retreat

        } else if (this.state.gameState == 3) {
            this.setState({ topPosition: this.state.topPosition + 3 })
        }

    };

    render() {

        // generate enemy function

        generateEnemy = () => {

            // number of enemies = 125 as of right now

            if (this.state.enemies.length < 1 && this.state.gameState == 1) {

                this.setState({ i: this.state.i + 1 });

                // create enemy view

                this.setState({
                    enemies: [...this.state.enemies,
                    <TouchableOpacity activeOpacity={1}>
                        <View onLayout={(event) => { this.find_dimesionsOfEnemy(event.nativeEvent.layout) }}
                            key={this.state.i}
                            style={{
                                top: 300,
                                left: 100,
                                height: 200,
                                width: 20,
                                backgroundColor: 'purple',
                                position: "absolute",
                            }}>
                        </View>
                    </TouchableOpacity>]
                });

            } else if (this.state.waveNumber == 5) {

                /*this.setState({ enemies: [] });
                this.setState({ enemyTopPosition: -10 });
                this.setState({ i: 0 });
                this.setState({ dimensionsOfRectX: [] });
                this.setState({ dimensionsOfRectY: [] });

                this.setState({ gameState: 2 });*/

            } else {

                /* if (this.state.enemies.length > 110) {
                     this.setState({ waveNumber: this.state.waveNumber + 1 })
                     console.log(this.state.waveNumber)
                 }
 
 
                 this.setState({ enemies: [] });
                 this.setState({ enemyTopPosition: -10 });
                 this.setState({ i: 0 });
                 this.setState({ dimensionsOfRectX: [] });
                 this.setState({ dimensionsOfRectY: [] });*/
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

});

export default connect(mapStateToProps, mapDispatchToProps)(Boss2);
