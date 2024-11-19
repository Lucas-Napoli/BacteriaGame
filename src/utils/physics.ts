import Matter from "matter-js";
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export const Physics = (entities: any, { touches, time, dispatch }: any) => {
  // Verifica se Physics está definido
  if (!entities.Physics || !entities.Physics.engine) {
    console.error("Physics engine is undefined. Check the entities configuration.");
    return entities;
  }

  let engine = entities.Physics.engine;

  // Aplica velocidade ao toque
  touches
    .filter((t: { type: string }) => t.type === "press")
    .forEach((t: any) => {
      Matter.Body.setVelocity(entities.Bacteria.body, {
        x: 0,
        y: -4,
      });
    });

  // Atualiza o motor de física
  Matter.Engine.update(engine, Math.min(time.delta, 16.667));

  return entities;
};
