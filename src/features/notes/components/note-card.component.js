import React from "react";
import styled from "styled-components/native";
import { useTheme } from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Ionicons } from "@expo/vector-icons"; // Не забудь про этот импорт!

const Highlight = styled.Text`
  color: tomato;
`;

const CardContainer = styled.TouchableOpacity`
  border-radius: 16px;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
  margin: 12px;
  width: 160px;
  align-items: center;
`;

const NoteTitle = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: "tail",
})`
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  width: 100%;
`;

const NoteContent = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: "tail",
})`
  font-size: 14px;
  color: #555;
  margin-top: 8px;
  text-align: center;
  width: 100%;
`;

const NoteDate = styled.Text`
  font-size: 12px;
  color: #888;
  margin-top: 12px;
  text-align: center;
`;

const highlightKeyword = (text, keyword) => {
  if (!keyword) return text;

  const regex = new RegExp(`(${keyword})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <Highlight key={index}>{part}</Highlight>
    ) : (
      part
    )
  );
};

export const NoteCard = ({
  title,
  paragraph,
  date,
  onPress,
  keyword,
  checklist = [],
}) => {
  const theme = useTheme();

  return (
    <CardContainer
      onPress={onPress}
      activeOpacity={0.8}
      style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.97 : 1 }] }]}
    >
      <NoteTitle>{highlightKeyword(title, keyword)}</NoteTitle>
      <Spacer position="top" size="small" />
      <NoteContent numberOfLines={5}>
        {highlightKeyword(paragraph, keyword)}
      </NoteContent>

      {/* ✅ Чеклист вставляем сюда */}
      {checklist.length > 0 && <Spacer position="top" size="small" />}
      {checklist.map((task, idx) => (
        <View
          key={idx}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 2,
          }}
        >
          <Ionicons
            name={task.done ? "checkmark-circle" : "ellipse"}
            size={16}
            color={task.done ? "#2182BD" : "grey"}
            style={{ marginRight: 4 }}
          />
          <NoteContent
            style={{
              textDecorationLine: task.done ? "line-through" : "none",
              color: "#555",
              fontSize: 12,
            }}
          >
            {task.text}
          </NoteContent>
        </View>
      ))}

      <NoteDate>{date}</NoteDate>
    </CardContainer>
  );
};
