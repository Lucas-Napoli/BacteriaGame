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
const CELL_HEIGHT = 70; // Altura de cada célula

// Array de perguntas associadas às células
const questions = [
  {
    question: "A bactéria tenta ultrapassar as barreiras iniciais do corpo. Qual delas é a primeira linha de defesa?",
    options: ["Linfócitos T citotóxicos", "Pele e mucosas", "Anticorpos", "linfócito B"],
    correctAnswer: 1,
  },
  {
    question: "A bactéria consegue atravessar a pele. Qual célula do sistema imune inato irá agir primeiro?",
    options: ["Célula natural killer ", "Macrófagos", "Basófilo", "Célula dendrítica "],
    correctAnswer: 1,
  },
  {
    question: "Após a resposta inicial, o sistema imune adaptativo é ativado. Qual célula é responsável por produzir anticorpos específicos?",
    options: ["Linfócito T citotóxico ", "Células NK", "Linfócito B", "Fagócitos"],
    correctAnswer: 2,
  },
  {
    question: "A bactéria tenta escapar dos anticorpos. Que célula especializada ajuda a destruir células infectadas?",
    options: ["Linfócito T CD8+", "Neutrófilos", "Macrófagos", "Células dendríticas"],
    correctAnswer: 0,
  },
  {
    question: "Depois de fagocitar a bactéria, o macrófago expõe partes do patógeno na sua superfície. Como essas partes são chamadas?",
    options: ["Anticorpos", "Histaminas", "Antígenos", "Citocinas"],
    correctAnswer: 2,
  },
  {
    question: "Qual órgão do corpo é responsável pela produção e maturação de linfócitos T?",
    options: ["Baço", "Fígado", "Timo", "Medula óssea"],
    correctAnswer: 2,
  },
  {
    question: "Qual dessas é uma característica do sistema imune adaptativo?",
    options: ["Resposta rápida e inespecífica", "Memória imunológica", "Fagocitose", "Ativação de neutrófilos"],
    correctAnswer: 1,
  },
];


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
    renderer: JSX.Element,
    question?: { // Adicione a tipagem para a pergunta
      question: string;
      options: string[];
      correctAnswer: number;
    };
  };
};

// Função para gerar posições das células
const getCellPositions = () => {
  return questions.map((_, index) => ({
    pos: {
      x: windowsWidth + index * (CELL_WIDTH + 200), // Espaço maior entre células
      y: Math.random() * (windowsHeight - CELL_HEIGHT - 100),
    },
    size: { width: CELL_WIDTH, height: CELL_HEIGHT },
  }));
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
    entities[`Cell${index + 1}`] = {
      ...Cell(
        `Cell${index + 1}`,
        world,
        index + 1,
        cell.pos,
        cell.size,
        "blue"
      ),
      question: questions[index], // Associa a pergunta à célula
    };
  });

  return entities;
};