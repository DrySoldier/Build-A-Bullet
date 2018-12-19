import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, StatusBar } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Finger } from "./renderers";
import { MoveFinger } from "./systems"
 
export default class BestGameEver extends PureComponent {
  constructor() {
    super();
  }
 
  render() {
    return (
      <GameEngine 
        style={styles.container} 
        systems={[MoveFinger]}
        entities={{ 
          1: { position: [40,  200], renderer: <Finger />}, //-- Notice that each entity has a unique id (required)
        }}>
 
        <StatusBar hidden={true} />
 
      </GameEngine>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});
 