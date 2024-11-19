import { StyleSheet } from "react-native";

interface StyleParams {
  xBody: number;
  yBody: number;
  widthBody: number;
  heightBody: number;
  color: string;
}

export const styles = ({ xBody, yBody, widthBody, heightBody, color }: StyleParams) =>
  StyleSheet.create({
    floor: {
      position: "absolute",
      left: xBody,
      top: yBody,
      width: widthBody,
      height: heightBody,
      backgroundColor: color,
    },
  });
