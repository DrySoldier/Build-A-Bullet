import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

import PlayerShip from './PlayerShip';
import EnemyShip from './EnemyShip';
import Laser from './Laser';

const device_height = Dimensions.get('window').height;
const device_width = Dimensions.get('window').width;

export default class GameBoard extends React.Component {

    constructor(props) {
        super(props)

        this.playerMarginTop = 350;

    }

    _handlePress = index => {
        this.props.GameBoardRef(index);
    }

    _handleEnemyPress = index => {
        this.props.GameBoardRef(index);
    }

    shouldComponentUpdate(prevProps) {
        if (prevProps === this.props.tileLayout) {
            return false;
        } else {
            return true;
        }
    }

    render() {

        // 0 = empty space
        // 1 = enemy ship space
        // 2 = bullet space

        const tiles = this.props.tileLayout.map((state, index) => {

            playerShip = () => {
                if (this.props.currentPosition === index) {
                    return <PlayerShip />
                } else {
                    return;
                }
            }

            switch (state) {
                case -1:
                    return (
                        <TouchableOpacity onPress={() => this._handlePress(index, state)} key={index}>
                            <View style={[styles.space, styles.warningSpace]}>
                                <Image style={{position: 'absolute'}} source={require('../assets/images/caution.png')}></Image>
                                <View style={{ marginTop: this.playerMarginTop }}>{playerShip()}</View>
                            </View>
                        </TouchableOpacity>
                    )

                case 0:

                    return (
                        <TouchableOpacity onPress={() => this._handlePress(index)} key={index}>
                            <View style={[styles.emptySpace, styles.space]}>
                                <View style={{ marginTop: this.playerMarginTop }}>{playerShip()}</View>
                            </View>
                        </TouchableOpacity>
                    )

                case 1:

                    return (
                        <TouchableOpacity onPress={() => this._handlePress(index, state)} key={index}>
                            <View style={[styles.shipSpace, styles.space]}>
                                <EnemyShip style={{ marginBottom: 200 }} shipSrc={this.props.shipSrc} />
                                <View style={{ marginTop: this.playerMarginTop }}>{playerShip()}</View>

                            </View>
                        </TouchableOpacity>
                    )

                case 2:

                    return (
                        <TouchableOpacity onPress={() => this._handlePress(index, state)} key={index}>
                            <View style={[styles.space, styles.bulletSpace]}>
                                <Laser />
                                <View style={{ marginTop: this.playerMarginTop }}>{playerShip()}</View>
                            </View>
                        </TouchableOpacity>
                    )

                default:
                    return (
                        <TouchableOpacity onPress={() => this._handlePress(index, state)} key={index}>
                            <View style={[styles.testSpace, styles.space]}>
                                <View style={{ marginTop: this.playerMarginTop }}>{playerShip()}</View>
                            </View>
                        </TouchableOpacity>
                    )
            }


        });

        return (
            <View style={styles.container} >
                {tiles}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    space: {
        height: device_height / 1.1,
        width: device_width / 3.2,

        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    laserSpace: {
        position: 'absolute',
    },
    emptySpace: {
        backgroundColor: 'black'
    },
    enemySpace: {
        backgroundColor: 'red'
    },
    testSpace: {
        backgroundColor: 'yellow',
    },
    shipSpace: {
        backgroundColor: 'black'
    },
    warningSpace: {
        backgroundColor: 'black'
    },
    bulletSpace: {
        backgroundColor: 'red',
    }

});