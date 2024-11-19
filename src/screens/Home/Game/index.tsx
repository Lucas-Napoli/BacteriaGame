import { useState } from "react";
import { Start } from "./Start";
import { GameEngine } from "react-native-game-engine";

import entities from "../../../entities";
import { styles } from "./styles";
import { Physics } from "@/src/utils/physics";

const Game = () => {
  const [running, setIsRunning] = useState(false); // Controla se o jogo está rodando
  const [gameEntities, setGameEntities] = useState(entities()); // Estado para as entidades do jogo

  const handleOnStartGame = () => {
    setIsRunning(false); // Inicia o jogo
  };

  const handleOnEndGame = () => {
    setIsRunning(false); // Para o jogo
    setGameEntities(entities()); // Redefine as entidades
  };

  // return <Start handleOnStartGame={handleOnStartGame} />;

  return (
    <GameEngine
      systems={[Physics]}
      running={running}
      entities={gameEntities} // Usa o estado para as entidades
      style={styles.engineContainer}
    />
  );
};

export { Game };
