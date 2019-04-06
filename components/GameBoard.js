import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import PlayerShip from './PlayerShip';
import EnemyShip from './EnemyShip';

const device_height = Dimensions.get('window').height;
const device_width = Dimensions.get('window').width;

export default class GameBoard extends React.PureComponent {

    _handlePress = index => {
        this.props.GameBoardRef(index);
    }

    _handleEnemyPress = index => {

    }

    shouldComponentUpdate(prevProps) {
        if(prevProps === this.props.tileLayout){
            return false;
        } else {
            return true;
        }
    }

    render() {

        // 0 = empty space
        // 1 = player space
        // 2 = enemy ship space
        // 3 = bullet space

        const tiles = this.props.tileLayout.map((state, index) => {

            switch (state) {
                case 0:

                    return (
                        <TouchableOpacity onPress={() => this._handlePress(index)} key={index}>
                            <View style={[styles.emptySpace, styles.space]}>

                            </View>
                        </TouchableOpacity>
                    )

                case 1:

                    return (
                        <TouchableOpacity onPress={() => this._handlePress(index)} key={index}>
                            <View style={[styles.shipSpace, styles.space]}>
                                <PlayerShip />
                            </View>
                        </TouchableOpacity>
                    )
                case 2:

                    return (
                        <TouchableOpacity onPress={() => this._handleEnemyPress(index)} key={index}>
                            <View style={[styles.shipSpace, styles.space]}>
                                <EnemyShip shipSrc={this.props.shipSrc} />
                            </View>
                        </TouchableOpacity>
                    )

                case 3:

                    return (
                        <TouchableOpacity onPress={() => this._handleBulletPress(index)} key={index}>
                            <View style={[styles.space]}>
                                <View style={styles.bulletSpace}></View>
                            </View>
                        </TouchableOpacity>
                    )

                default:
                    return (
                        <TouchableOpacity onPress={() => this._handlePress(index)} key={index}>
                            <View style={[styles.testSpace, styles.space]}>

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
        height: device_height / 9,
        width: device_width / 5,

        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptySpace: {
        backgroundColor: 'black'
    },
    enemySpace: {
        backgroundColor: 'red'
    },
    testSpace: {
        backgroundColor: 'yellow'
    },
    shipSpace: {
        backgroundColor: 'black'
    },
    bulletSpace: {
        height: 75,
        width: 75,
        borderRadius: 20,
        backgroundColor: 'purple',
    }

});