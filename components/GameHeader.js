import React from 'react';

import { StyleSheet, View, Platform, Text, TouchableOpacity, Dimensions } from 'react-native';
import { BlurView } from 'expo';

import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    count: state.counterReducer.count,

    fuel: state.fuelReducer.fuel,

});

const device_height = Dimensions.get('window').height;
const device_width = Dimensions.get('window').width;

class GameHeader extends React.Component {
    render() {
        return (
            <BlurView style={styles.infoContainer} intensity={50} tint="dark" >

                <TouchableOpacity activeOpacity={1}>
                    <Text style={styles.text}>{this.props.count}</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1}>
                    <Text style={styles.text}>{this.props.fuel}/100</Text>
                </TouchableOpacity>

            </BlurView>
        )
    }
}

const styles = StyleSheet.create({
    infoContainer: {
        position: 'relative',
        width: device_width,
        height: 100,
        backgroundColor: 'green',
        zIndex: 99,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        position: 'absolute',
    },
    text: {
        fontSize: 40,
        color: 'white',
        paddingTop: device_height * .05,
    },

});

export default connect(mapStateToProps)(GameHeader);