import React, { Component } from 'react';
import { Animated, View } from 'react-native';

import { connect } from 'react-redux';
import * as Actions from '../redux/Actions/ActionTypes';

const mapStateToProps = (state) => ({

    loadAnimation: state.animationReducer.loadAnimation,
    currentDelay: state.animationReducer.currentDelay

});

const mapDispatchToProps = (dispatch) => ({

    toggleLoadAnimation: () => dispatch({ type: Actions.LOAD_ANIMATION }),

});

class ImageLoader extends Component {
    state = {
        opacity: new Animated.Value(0),

    }

    onLoad = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start(() => this.onLeave());
    }

    onLeave = () => {
        Animated.timing(this.state.opacity, {
            toValue: 0.3,
            duration: 500,
            delay: this.props.currentDelay,
            useNativeDriver: true,
        }).start(() => this.vanish());
    }

    vanish = () => {
        Animated.timing(this.state.opacity, {
            toValue: 0.1,
            duration: 2000,
            delay: 25,
            useNativeDriver: true,
        }).start(() => this.vanish2());
    }

    vanish2 = () => {
        Animated.timing(this.state.opacity, {
            toValue: 0.1,
            duration: 1000,
            delay: 100,
            useNativeDriver: true,
        }).start();
    }

    render() {
        return (
            <Animated.Image
                onLoad={this.onLoad}
                {...this.props}
                style={[
                    {
                        opacity: this.state.opacity,
                        transform: [
                            {
                                scale: this.state.opacity.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.3, 1],
                                })
                            },
                        ],
                    },
                    this.props.style,
                ]}
            />
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ImageLoader);
