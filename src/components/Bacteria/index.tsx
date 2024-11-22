import { Animated, Image } from "react-native";
import Matter from "matter-js";

import BACTERIA from "../../assets/images/bacteria.png";

import { styles } from "./styles";
import { useEffect, useRef } from "react";
import React from "react";

const Bacteria = (props: { body: { bounds: { max: { x: number; y: number; }; min: { x: number; y: number; }; }; position: { x: number; y: number; }; }; color: any; }) => {

  const scaleAnim = useRef(new Animated.Value(1)).current; // Animação de escala

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2, // Escala máxima
          duration: 500, // Duração da expansão
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Retorna ao tamanho original
          duration: 500, // Duração da contração
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start(); // Inicia a animação

    return () => pulse.stop(); // Para a animação ao desmontar
  }, [scaleAnim]);

  
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <Image
      source={BACTERIA}
      style={
        styles({
          widthBody,
          heightBody,
          xBody,
          yBody,
          color,
        }).bacteria
      }
    />
  );
};

export default (world: any, color: any, pos: { x: any; y: any; }, size: { width: any; height: any; }) => {
  const initialBacteria = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Bacteria",
      isStatic: false,
      isSensor: false,
     }
  );

  Matter.World.add(world, [initialBacteria]);

  return {
    body: initialBacteria,
    color,
    pos,
    renderer: <Bacteria body={initialBacteria} color={color} />,
  };
};