import { View, Image, TouchableWithoutFeedback } from "react-native";

import { styles } from "./styles";

interface StartProps {
  handleOnStartGame: () => void;
}

const Start: React.FC<StartProps> = ({ handleOnStartGame }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../../assets/images/logo.png')} style={styles.logo} />
      <TouchableWithoutFeedback onPress={handleOnStartGame}>
        <Image source={require('../../../../assets/images/play.png')} style={styles.playButton} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export { Start };