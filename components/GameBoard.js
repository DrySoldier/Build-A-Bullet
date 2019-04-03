import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import PlayerShip from './PlayerShip';

const device_height = Dimensions.get('window').height;
const device_width = Dimensions.get('window').width;

export default class GameBoard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

        }

    }
    
    _handlePress = index => {
        this.props.GameBoardRef(index);
    }

    render() {

        const tiles = this.props.tileLayout.map((state, index) => {
            switch (state) {
                case 0:

                    return (
                        <TouchableOpacity onPress={() => this._handlePress(index)} key={index}>
                            <View style={styles.emptySpace}>

                            </View>
                        </TouchableOpacity>
                    )

                case 1:

                    return (
                        <TouchableOpacity onPress={() => this._handlePress(index)} key={index}>
                            <View style={styles.playerSpace}>
                                <PlayerShip style={styles.playerShip}/>
                            </View>
                        </TouchableOpacity>
                    )

                default:
                    return (
                        <TouchableOpacity onPress={() => this._handlePress(index)} key={index}>
                            <View style={styles.testSpace}>

                            </View>
                        </TouchableOpacity>
                    )
            }
        });

        return (
            <View style={styles.container}>
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
    emptySpace: {
        height: device_height / 9,
        width: device_width / 5,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'black'
    },
    enemySpace: {
        height: device_height / 9,
        width: device_width / 5,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'red'
    },
    testSpace: {
        height: device_height / 9,
        width: device_width / 5,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'yellow'
    },
    playerSpace: {
        height: device_height / 9,
        width: device_width / 5,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },

});