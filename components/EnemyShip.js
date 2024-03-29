import React from 'react';
import { View } from 'react-native';
import { Sprite } from 'react-game-kit/native';

const EnemyShip = (props) => (
    <View>
        <Sprite
            repeat={true}
            src={props.shipSrc}
            scale={2}
            state={0}
            steps={[1, 2, 3, 4]}
            tileHeight={32}
            tileWidth={32}
        />

    </View>

)

export default EnemyShip