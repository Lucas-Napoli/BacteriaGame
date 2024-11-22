import { useCallback, useEffect } from "react";
import { StatusBar, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet } from "react-native";

import { Home } from "../src/screens/Home";

export default function App() {
  const SplashScreenHide = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreenHide();
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        hidden={true} // Oculta a barra de status
        translucent={true} // Permite que a tela ocupe a área da barra de status
      />
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Fundo preto para ocupar toda a tela
  },
});
