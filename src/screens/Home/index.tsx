import { ImageBackground, Text } from "react-native";

import BACKGROUND from "../../assets/images/backgroundAlto.jpg";
import { styles } from "./styles";
import { Game } from "./Game/index";

const Home = () => {
  return (
    <ImageBackground source={BACKGROUND} style={styles.container}>
      <Game />
    </ImageBackground>
  );
};

export { Home };