import React, { useRef, useState } from "react";
import { View, Alert } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "../../../entities";
import { Physics } from "../../../utils/physics";
import QuestionModal from "../../../components/Modal";
import { Start } from "./Start/index"
import { GameOver } from "./GameOver";
import { styles } from "./styles";

type QuestionType = {
  question: string;
  options: string[];
  correctAnswer: number;
};

const Game = () => {
  const [running, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null);

  const gameEngineRef = useRef<GameEngine | null>(null); // Tipo ajustado para o GameEngine

  const handleBackToStart = () => {
    setIsRunning(false);
    setIsGameOver(false);
  };

  const handleOnStart = () => {
    setIsRunning(true);
    setIsGameOver(false);
  };

  const handleOnGameOver = () => {
    setIsRunning(false);
    setIsGameOver(true);
  };

  const handleOnEvent = (e: { type: string; question?: string; options?: string[]; correctAnswer?: number }) => {
    switch (e.type) {
      case "game_over":
        handleOnGameOver();
        break;

      case "open_modal":
        setCurrentQuestion({
          question: e.question!,
          options: e.options!,
          correctAnswer: e.correctAnswer!,
        });
        setModalVisible(true);
        break;

      default:
        break;
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    setModalVisible(false);
    if (isCorrect) {
      Alert.alert("Resposta Correta!", "Continue jogando!");
    } else {
      handleOnGameOver();
    }
  };

  if (!running && !isGameOver) {
    return <Start handleOnStartGame={handleOnStart} />;
  }

  if (!running && isGameOver) {
    return <GameOver handleBackToStart={handleBackToStart} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <GameEngine
        ref={gameEngineRef} // Corrigido para o tipo adequado
        systems={[Physics]}
        running={running}
        entities={entities()}
        onEvent={handleOnEvent}
        style={styles.engineContainer}
      />

      {modalVisible && currentQuestion && (
        <QuestionModal
          visible={modalVisible}
          question={currentQuestion.question}
          options={currentQuestion.options}
          correctAnswer={currentQuestion.correctAnswer}
          onAnswer={handleAnswer}
        />
      )}
    </View>
  );
};

export { Game }