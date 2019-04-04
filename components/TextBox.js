import React from 'react';

import { StyleSheet, View, Platform, Text, TouchableOpacity, Dimensions, Animated, Button } from 'react-native';
import TypeWriter from 'react-native-typewriter';

import { BlurView } from 'expo';

const device_height = Dimensions.get('window').height;
const device_width = Dimensions.get('window').width;

export default class TextBox extends React.PureComponent {

    constructor(props) {
        super(props)

    }

    componentWillMount() {
        this.heightValue = new Animated.Value(0);

        this.componentLoaded = false;
    }

    componentDidUpdate() {

        console.log('COMPONENT UPDATED');

        if (this.props.text != '') {
            console.log('TEXBOX SPRUNG');
            Animated.spring(this.heightValue, {
                toValue: 150,
                duration: 250,
            }).start();
        }
    }

    contract = () => {

        console.log('TEXTBOX CONTRACTED');

        Animated.timing(this.heightValue, {
            toValue: 0,
            duration: 250,
        }).start();

        this.props.cb();
    }

    render() {

        return (
            <BlurView style={styles.container} intensity={50} tint="dark">

                <Animated.View style={[styles.textBox, { height: this.heightValue }]}>
                    <TypeWriter style={{ color: 'white' }} typing={1}>{this.props.text}</TypeWriter>
                    <Button title='OK' onPress={() => this.contract()}></Button>
                </Animated.View>

            </BlurView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: device_width * .9,
        borderColor: 'white',
        borderWidth: 1,
    },
    textBox: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});