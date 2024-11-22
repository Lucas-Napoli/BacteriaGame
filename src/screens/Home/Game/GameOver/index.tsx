import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

type GameOverProps = {
  handleBackToStart: () => void;
};

const GameOver: React.FC<GameOverProps> = ({ handleBackToStart }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Game Over!</Text>
      <Button title="Back to Start" onPress={handleBackToStart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  text: {
    fontSize: 30,
    color: "white",
    marginBottom: 20,
  },
});

export { GameOver };
