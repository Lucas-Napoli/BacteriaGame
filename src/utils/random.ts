import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

// Função para gerar um número aleatório entre `min` e `max`
export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Função para gerar posições e tamanhos personalizados para as células
export const getCellPositions = (cellCount = 5) => {
  const cells = [];

  for (let i = 0; i < cellCount; i++) {
    const xPosition = windowWidth + getRandom(50, 300); // Posição horizontal aleatória fora da tela visível
    const yPosition = getRandom(50, windowHeight - 150); // Posição vertical aleatória dentro dos limites visíveis
    const size = getRandom(40, 80); // Tamanho aleatório para largura e altura

    cells.push({
      pos: { x: xPosition, y: yPosition },
      size: { width: size, height: size },
      cellType: i + 1, // Tipo da célula (1 a 5)
    });
  }

  return cells;
};