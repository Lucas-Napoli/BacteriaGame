import { Image } from "react-native";
import Matter from "matter-js";

import CELULA1 from "../../assets/images/celula1.png";
import CELULA2 from "../../assets/images/celula2.png";
import CELULA3 from "../../assets/images/celula3.png";
import CELULA4 from "../../assets/images/celula4.png";
import CELULA5 from "../../assets/images/celula5.png";

import { styles } from "./styles";

const Celula = (props: {
  body: {
    bounds: {
      max: { x: number; y: number };
      min: { x: number; y: number };
    };
    position: { x: number; y: number };
  };
  cellType: number;
  color: string; // Adicionei a propriedade color nas props
}) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const imageSource =
    props.cellType === 1
      ? CELULA1
      : props.cellType === 2
      ? CELULA2
      : props.cellType === 3
      ? CELULA3
      : props.cellType === 4
      ? CELULA4
      : CELULA5;

  return (
    <Image
      source={imageSource}
      style={
        styles({
          widthBody,
          heightBody,
          xBody,
          yBody,
          color: props.color, // Agora o color é passado
        }).celula
      }
    />
  );
};

export default (
  label: any,
  world: any,
  cellType: number,
  pos: { x: number; y: number },
  size: { width: number; height: number },
  color: string // Adicionado color como parâmetro da função
) => {
  const initialCelula = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label, isStatic: true }
  );

  Matter.World.add(world, [initialCelula]);

  return {
    body: initialCelula,
    cellType,
    pos,
    color,
    renderer: <Celula body={initialCelula} cellType={cellType} color={color} />, // Passa o color para o Celula
  };
};
