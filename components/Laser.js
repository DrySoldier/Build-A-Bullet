import React from 'react';
import { View } from 'react-native';
import { Sprite } from 'react-game-kit/native';

const Laser = () => (
    <View style={{position: 'absolute'}}>
        <Sprite
            repeat={true}
            src={require("../assets/spriteSheet/laser-cutout.png")}
            scale={1}
            state={0}
            steps={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            tileHeight={1000}
            tileWidth={200}
        />

    </View>

)

export default Laser

