import Matter from "matter-js";
import Bacteria from "../components/Bacteria";
import Floor from "../components/Floor";
import { Dimensions } from "react-native";
import Cell from '../components/Obstaculo'

const windowsHeight = Dimensions.get("window").height;
const windowsWidth = Dimensions.get("window").width;

const BOTTOM = 5;

const NUM_CELLS = 5; // Número de células
const CELL_GAP = 200; // Espaço vertical entre as células
const CELL_WIDTH = 50; // Largura de cada célula
const CELL_HEIGHT = 50; // Altura de cada célula


type Entity = {
  Physics: { engine: any; world: any };
  Bacteria: {
    body: any;
    color: string;
    pos: { x: number; y: number };
    renderer: JSX.Element;
  };
  Floor: {
    body: any;
    color: string;
    renderer: JSX.Element;
  };
} & {
  [key: `Cell${number}`]: {
    body: any;
    color: string;
    renderer: JSX.Element;
  };
};

// Função para gerar posições aleatórias para as células
const getCellPositions = () => {
  const cells = [];
  for (let i = 0; i < NUM_CELLS; i++) {
    const xPosition = windowsWidth + i * (CELL_WIDTH + 100);
    const yPosition = Math.random() * (windowsHeight - CELL_HEIGHT - CELL_GAP);

    cells.push({
      pos: { x: xPosition, y: yPosition },
      size: { width: CELL_WIDTH, height: CELL_HEIGHT },
    });
  }
  return cells;
};

export default (): Entity => {
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;
  
  engine.gravity.y = 0.4;

   // Gerar posições para as células
  const cellPositions = getCellPositions();

  const entities: Entity = {
    Physics: { engine, world },
    Bacteria: Bacteria(world, "green", { x: 50, y: 500 }, { height: 120, width: 120 }),
    Floor: Floor(world, "#E85A5A", { x: windowsWidth / 2, y: windowsHeight - (BOTTOM / 2) }, { height: BOTTOM, width: windowsWidth }),
  }

  cellPositions.forEach((cell, index) => {
    entities[`Cell${index + 1}`] = Cell(
      `Cell${index + 1}`, // Label
      world, // Mundo do Matter.js
      index + 1, // Tipo da célula (pode ser um número incremental ou algo específico)
      cell.pos, // Posição
      cell.size, // Tamanho
      "blue" // Cor da célula
    );
  });

  return entities;
};