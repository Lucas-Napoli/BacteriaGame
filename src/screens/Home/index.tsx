import React, { useState } from "react";
import { View, ImageBackground } from "react-native";
import { Game } from "./Game";
import { Start } from "../Home/Game/Start";
import BACKGROUND from "../../assets/images/backgroundAlto.jpg";
import { styles } from "./styles";

const Home = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  return (
    <ImageBackground source={BACKGROUND} style={styles.container}>
      {!isGameStarted ? (
        <Start handleOnStartGame={handleStartGame} />
      ) : (
        <Game />
      )}
    </ImageBackground>
  );
};

export { Home };
