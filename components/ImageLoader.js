import React, { Component } from 'react';
import { Animated, View } from 'react-native';

import { connect } from 'react-redux';
import * as Actions from '../redux/Actions/ActionTypes';

const mapStateToProps = (state) => ({

    loadAnimation: state.animationReducer.loadAnimation,

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
        console.log('triggered')
        Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 500,
            delay: 1200,
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
                                    outputRange: [0.2, 1],
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
