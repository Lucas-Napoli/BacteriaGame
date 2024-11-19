import React from "react";
import { View } from "react-native";
import Matter from "matter-js";

// Componente de renderização do Floor
const Floor = ({ body, color }: any) => {
  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.y - body.bounds.min.y;

  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: color,
        width: width,
        height: height,
        left: x,
        top: y,
      }}
    />
  );
};

// Configuração do corpo do Floor no Matter.js
export default (world: any, color: string, pos: { x: number; y: number }, size: { height: number; width: number }) => {
  const initialFloor = Matter.Bodies.rectangle(
    pos.x, // Posição X
    pos.y, // Posição Y
    size.width, // Largura
    size.height, // Altura
    { isStatic: true, label: "Floor" } // Configura o corpo como estático
  );

  Matter.World.add(world, [initialFloor]); // Adiciona o corpo ao mundo

  return {
    body: initialFloor,
    color,
    renderer: <Floor />, // Define o componente de renderização
  };
};
