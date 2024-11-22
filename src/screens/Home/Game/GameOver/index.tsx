import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

// Importe a imagem "Game Over"
import GAME_OVER from "../../../../assets/images/game-over.png";

interface GameOverProps {
  handleBackToStart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ handleBackToStart }) => {
  useEffect(() => {
    // Redireciona para a tela inicial após 3 segundos
    const timer = setTimeout(() => {
      handleBackToStart();
    }, 3000);

    return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
  }, []);

  return (
    <View style={styles.container}>
      <Image source={GAME_OVER} style={styles.logoStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // Fundo preto para destacar o texto/imagem
  },
  logoStyle: {
    width: 300,
    height: 150,
    resizeMode: "contain", // Ajusta a imagem proporcionalmente
  },
});

export {GameOver};
