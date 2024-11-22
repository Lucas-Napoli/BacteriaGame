import Matter from "matter-js";
import { getCellPositions } from "./random"; // Assumindo que você tem uma função para gerar posições
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export const Physics = (entities: { [x: string]: any; Physics?: any; Bacteria?: any; }, { touches, time, dispatch }: any) => {
  const engine = entities.Physics.engine;

  // Atualiza o motor de física
  Matter.Engine.update(engine, Math.min(time.delta, 16.667));

  // Detecta toque para fazer a bactéria flutuar
  touches
    .filter((t: { type: string; }) => t.type === "press")
    .forEach(() => {
      Matter.Body.setVelocity(entities.Bacteria.body, {
        x: 0,
        y: -4,
      });
    });

  // Move as células para a esquerda
  Object.keys(entities).forEach((key) => {
    if (key.startsWith("Cell")) {
      Matter.Body.translate(entities[key].body, { x: -3, y: 0 });

      // Verifica se a célula saiu da tela
      if (entities[key].body.bounds.max.x <= 0) {
        const newPos = getCellPositions(); // Gera uma nova posição
        Matter.Body.setPosition(entities[key].body, newPos);
      }
    }
  });

  // Listener de colisões
  Matter.Events.on(engine, "collisionStart", (event: { pairs: any[]; }) => {
    event.pairs.forEach((pair: { bodyA: any; bodyB: any; }) => {
      const { bodyA, bodyB } = pair;

      // Verifica colisão entre a bactéria e uma célula
      if (
        (bodyA.label === "Bacteria" && bodyB.label?.startsWith("Cell")) ||
        (bodyB.label === "Bacteria" && bodyA.label?.startsWith("Cell"))
      ) {
        const collidedCell = bodyA.label.startsWith("Cell") ? bodyA : bodyB;

        // Dispara evento para abrir o modal com a pergunta
        dispatch({
          type: "open_modal",
          question: `Pergunta relacionada à célula ${collidedCell.label}`,
          options: ["Opção A", "Opção B", "Opção C", "Opção D"],
          correctAnswer: 1, // Índice da resposta correta
          onAnswer: (isCorrect: any) => {
            if (!isCorrect) {
              dispatch({ type: "game_over" }); // Game Over em caso de resposta errada
            }
          },
        });

        // Remove a célula do mundo após a colisão
        Matter.World.remove(engine.world, collidedCell);
        delete entities[collidedCell.label];
      }
    });
  });

  return entities;
};
