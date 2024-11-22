import React from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";

type QuestionModalProps = {
  visible: boolean;
  question: string;
  options: string[];
  onAnswer: (isCorrect: boolean) => void;
  correctAnswer: number;
};

const QuestionModal: React.FC<QuestionModalProps> = ({
  visible,
  question,
  options,
  onAnswer,
  correctAnswer,
}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.question}>{question}</Text>
          {options.map((option, index) => (
            <Button
              key={index}
              title={option}
              onPress={() => onAnswer(index === correctAnswer)}
            />
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  question: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default QuestionModal;