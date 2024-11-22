import React, { useEffect, useRef } from "react";
import { View, Text, Image, Animated, TouchableOpacity } from "react-native";

const Congratulations = ({ onComplete }: { onComplete: () => void }) => {
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#8A1F1F",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Parabéns, você conseguiu!
      </Text>
      <Animated.Image
        source={require("../../../../assets/images/bacteria.png")} // Substitua pelo caminho correto da imagem
        style={{
          width: 100,
          height: 100,
          transform: [{ scale: pulseAnimation }],
          marginBottom: 30,
        }}
      />
      <TouchableOpacity
        onPress={onComplete}
        style={{
          backgroundColor: "#4CAF50",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          Voltar para o início
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Congratulations;
