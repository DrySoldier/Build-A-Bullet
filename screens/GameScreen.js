import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, Alert, Animated } from 'react-native';
import Boss1 from '../components/Boss1';
import Boss2 from '../components/Boss2';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as Actions from '../redux/Actions/ActionTypes';

const mapStateToProps = (state) => ({

    gameOver: state.gameReducer.gameOver

});

const mapDispatchToProps = (dispatch) => ({

    toggleGameOver: () => dispatch({ type: Actions.GAME_OVER }),

});

class GameScreen extends React.Component {
    static navigationOptions = {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: false,
    }

    constructor(props) {
        super(props)

        this.state = {
            boss: [],
            bossChosen: false,
        }

    }

    static contextTypes = {
        loop: PropTypes.object,
    };

    componentDidMount() {
        this.context.loop.subscribe(this.update);
    }

    componentWillUnmount() {
        this.context.loop.unsubscribe(this.update);
    }

    update = () => {
        if (this.props.gameOver == true) {
            this.props.navigation.navigate('Home');

            this.props.toggleGameOver();
        }
    };


    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    render() {

        switch (this.randomIntFromInterval(0, 1)) {
            case 0:

                if (!this.state.bossChosen) {

                    this.setState({
                        boss:
                            <Boss1 />
                    })
                    this.setState({ bossChosen: true })
                }

                break;

            case 1:

                if (!this.state.bossChosen) {

                    this.setState({
                        boss:
                            <Boss2 />
                    })
                    this.setState({ bossChosen: true })
                }

                break;
        }

        return (
            <View style={styles.container}>
                {//this.state.boss
                }

                <Boss1/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        position: 'relative',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
