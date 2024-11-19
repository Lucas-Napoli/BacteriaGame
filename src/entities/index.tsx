import Matter from "matter-js";
import Bacteria from "../components/Bacteria";
import Floor from "../components/Floor";
import { Dimensions } from "react-native";

const windowsHeight = Dimensions.get("window").height;
const windowsWidth = Dimensions.get("window").width;

const BOTTOM = 5;

export default () => {
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;
  
  engine.gravity.y = 0.4;

  return {
    Physics: { engine, world },
    Bacteria: Bacteria(world, "green", { x: 50, y: 500 }, { height: 120, width: 120 }),
    Floor: Floor(world, "#E85A5A", { x: windowsWidth / 2, y: windowsHeight - (BOTTOM / 2) }, { height: BOTTOM, width: windowsWidth }),
  };
};