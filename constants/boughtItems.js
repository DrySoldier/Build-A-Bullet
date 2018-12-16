import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/Actions/ActionTypes';

const mapStateToProps = (state) => ({
    count: state.counterReducer.count
});

const mapDispatchToProps = (dispatch) => ({
    buyBulletMachine: () => dispatch({ type: Actions.BUY_BULLET_MACHINE }),
    increment: () => dispatch({ type: Actions.COUNTER_INCREMENT }),
});



class BoughtItems extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View></View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoughtItems);
