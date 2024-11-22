import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "../../../entities";
import { Physics } from "../../../utils/physics";
import QuestionModal from "../../../components/Modal";
import { styles } from "./styles";
import {Start} from './Start'
import {GameOver} from './GameOver/index'
import Congratulations from './GameEnd'

const QUESTIONS  = [
  {
    question: "A bactéria tenta ultrapassar as barreiras iniciais do corpo. Qual delas é a primeira linha de defesa?",
    options: ["Linfócitos T citotóxicos", "Pele e mucosas", "Anticorpos", "linfócito B"],
    correctAnswer: 1,
  },
  {
    question: "A bactéria consegue atravessar a pele. Qual célula do sistema imune inato irá agir primeiro?",
    options: ["Célula natural killer ", "Macrófagos", "Basófilo", "Célula dendrítica "],
    correctAnswer: 1,
  },
  {
    question: "Após a resposta inicial, o sistema imune adaptativo é ativado. Qual célula é responsável por produzir anticorpos específicos?",
    options: ["Linfócito T citotóxico ", "Células NK", "Linfócito B", "Fagócitos"],
    correctAnswer: 2,
  },
  {
    question: "A bactéria tenta escapar dos anticorpos. Que célula especializada ajuda a destruir células infectadas?",
    options: ["Linfócito T CD8+", "Neutrófilos", "Macrófagos", "Células dendríticas"],
    correctAnswer: 0,
  },
  {
    question: "Depois de fagocitar a bactéria, o macrófago expõe partes do patógeno na sua superfície. Como essas partes são chamadas?",
    options: ["Anticorpos", "Histaminas", "Antígenos", "Citocinas"],
    correctAnswer: 2,
  },
  {
    question: "Qual órgão do corpo é responsável pela produção e maturação de linfócitos T?",
    options: ["Baço", "Fígado", "Timo", "Medula óssea"],
    correctAnswer: 2,
  },
  {
    question: "Qual dessas é uma característica do sistema imune adaptativo?",
    options: ["Resposta rápida e inespecífica", "Memória imunológica", "Fagocitose", "Ativação de neutrófilos"],
    correctAnswer: 1,
  },
];

const Game = () => {
  const [running, setIsRunning] = useState(false); // Controla se o jogo está rodando
  const [paused, setPaused] = useState(false); // Controla se o jogo está pausado
  const [modalVisible, setModalVisible] = useState(false); // Controla o estado do modal
  const [questionsRemaining, setQuestionsRemaining] = useState(QUESTIONS); // Perguntas restantes
  const [isGameOver, setIsGameOver] = useState(false); // Controla o estado de Game Over
  const [isGameEnd, setIsGameEnd] = useState(false); // Controla o estado de conclusão do jogo

  const handleCollision = () => {
    console.log("Colisão detectada!");

    if (questionsRemaining.length === 0) {
      console.log("Todas as perguntas respondidas! Parabéns!");
      setIsRunning(false); // Para o jogo
      setIsGameEnd(true); // Exibe o componente GameEnd
      return;
    }

    setModalVisible(true);
    setPaused(true); // Pausa o jogo
  };

  const handleAnswer = (isCorrect: boolean) => {
    setModalVisible(false);

    if (isCorrect) {
      console.log("Resposta correta! Continue.");
      setPaused(false); // Retoma o jogo

      // Remove a pergunta atual do array
      const updatedQuestions = questionsRemaining.slice(1);
      setQuestionsRemaining(updatedQuestions);

      if (updatedQuestions.length === 0) {
        console.log("Parabéns! Você completou todas as perguntas!");
        setIsRunning(false); // Finaliza o jogo
        setIsGameEnd(true); // Exibe o componente GameEnd
        return;
      }
    } else {
      console.log("Resposta errada! Game Over.");
      setIsRunning(false); // Para o motor do jogo
      setIsGameOver(true); // Exibe o componente Game Over
    }
  };

  const handleStart = () => {
    setIsRunning(true); // Inicia o jogo
    setPaused(false); // Remove a pausa
    setQuestionsRemaining(QUESTIONS); // Reseta as perguntas
    setModalVisible(false); // Fecha o modal
    setIsGameOver(false); // Reseta o estado de Game Over
    setIsGameEnd(false); // Reseta o estado de Game End
  };

  const handleBackToStart = () => {
    // Reseta tudo para o estado inicial (exibe <Start />)
    setIsRunning(false);
    setPaused(false);
    setQuestionsRemaining(QUESTIONS);
    setModalVisible(false);
    setIsGameOver(false);
    setIsGameEnd(false);
  };

  if (!running && !isGameOver && !isGameEnd) {
    return <Start handleOnStartGame={handleStart} />;
  }

  if (!running && isGameOver) {
    return <GameOver handleBackToStart={handleBackToStart} />;
  }

  if (!running && isGameEnd) {
    return <Congratulations onComplete={handleBackToStart} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <GameEngine
        systems={[
          (entities: any, { touches, time }: any) =>
            Physics(entities, { touches, time, dispatch: handleCollision, paused }),
        ]}
        running={running}
        entities={entities()}
        style={styles.engineContainer}
      />

      {modalVisible && (
        <QuestionModal
          visible={modalVisible}
          question={questionsRemaining[0].question}
          options={questionsRemaining[0].options}
          correctAnswer={questionsRemaining[0].correctAnswer}
          onAnswer={handleAnswer}
        />
      )}
    </View>
  );
};

export {Game};