import Matter from "matter-js";
import { getCellPositions } from "./random"; // Assumindo que você tem uma função para gerar posições
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export const Physics = (entities: any, { touches, time, dispatch, paused }: any) => {
  const engine = entities.Physics.engine;

  if (paused) {
    return entities; // Se pausado, não faz nada
  }

  const CELL_SPACING_Y = 200;

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

      const cellIndex = parseInt(key.replace("Cell", ""), 10);

      // Verifica se a célula saiu da tela
      if (entities[key].body.bounds.max.x <= 0) {
        const newPos = {
          x: windowWidth + 300 + Math.random() * 200, // Posição no eixo X
          y: (cellIndex * CELL_SPACING_Y) % (windowHeight - 100), // Posição espaçada no eixo Y
        };
        Matter.Body.setPosition(entities[key].body, newPos);
      }
    }
  });

  if (!engine.collisionListenerRegistered) {
    Matter.Events.on(engine, "collisionStart", (event: { pairs: any[]; }) => {
      event.pairs.forEach((pair: { bodyA: any; bodyB: any; }) => {
        const { bodyA, bodyB } = pair;

        // Verifica qual corpo é a célula
        if (
          (bodyA.label === "Bacteria" && bodyB.label?.startsWith("Cell")) ||
          (bodyB.label === "Bacteria" && bodyA.label?.startsWith("Cell"))
        ) {
          console.log("Colisão detectada! Abrindo modal...");
          dispatch({
            type: "open_modal",
          }); // Dispara o evento para abrir o modal
        }
      });
    });


    engine.collisionListenerRegistered = true;
  }

  

  return entities;

}