import { View, TouchableWithoutFeedback, Animated, Image } from "react-native";
import { styles } from "./styles";
import { useEffect, useRef } from "react";
import React from "react";

interface StartProps {
  handleOnStartGame: () => void;
}

const Start: React.FC<StartProps> = ({ handleOnStartGame }) => {
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => {
      pulse.stop();
    };
  }, [pulseAnimation]);

  return (
    <View style={styles.container}>
      {/* Logo com efeito de pulsação */}
      <Animated.Image
        source={require('../../../../assets/images/logo.png')}
        style={[
          styles.logo,
          { transform: [{ scale: pulseAnimation }] }, // Pulsação aplicada à logo
        ]}
      />
      {/* Botão "Play" sem animação */}
      <TouchableWithoutFeedback onPress={handleOnStartGame}>
        <Image
          source={require('../../../../assets/images/play.png')}
          style={styles.playButton}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export { Start };
