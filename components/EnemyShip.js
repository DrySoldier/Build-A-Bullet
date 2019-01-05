import React from 'react';
import { View } from 'react-native';
import { Sprite } from 'react-game-kit/native';

class EnemyShip extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <View>
                <Sprite
                    repeat={true}
                    src={require("../assets/spriteSheet/Ships/Saboteur.png")}
                    scale={10}
                    state={0}
                    steps={[1, 2, 3, 4]}
                    tileHeight={32}
                    tileWidth={32}
                />

            </View>

        )
    }

}

export default EnemyShip