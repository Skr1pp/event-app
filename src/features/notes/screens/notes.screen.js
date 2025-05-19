import React, { useCallback, useContext, useState, useEffect } from "react";

import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { Button, Card, Title, Paragraph, FAB } from "react-native-paper";
import { TouchableOpacity } from "react-native";

import { Image } from "react-native";

import styled from "styled-components/native";
import { useTheme } from "styled-components";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Search } from "../components/search.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FlatGrid } from "react-native-super-grid";
import MasonryList from "@react-native-seoul/masonry-list";
import { NoteCard } from "../components/note-card.component";
import { NotesContext } from "../../../services/notes/notes.context";
import { formatDate } from "../../../infrastructure/utility/formatDate";
import { Ionicons } from "@expo/vector-icons";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const Loading = styled.ActivityIndicator`
  flex: 1;
`;

const CardContainer = styled.TouchableOpacity`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  margin: 12px;
  align-items: center;
  width: 170px; // Фиксируем ширину карточки
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
`;
const TopBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-color: #ddd;
`;

const CardHeader = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;
const IconWrapper = styled.View`
  background-color: #e6f0f9;
  border-radius: 12px;
  padding: 8px;
  margin-bottom: 12px;
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
  text-align: center;
  max-width: 100%;
  overflow: hidden;
`;

const NoteContent = styled.Text.attrs({
  numberOfLines: 2,
  ellipsizeMode: "tail",
})`
  font-size: 14px;
  color: #555;
  margin-top: 8px;
  text-align: center;
  width: 100%;
`;

const Footer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

const DateText = styled.Text`
  font-size: 13px;
  color: #888;
`;

const ActionButton = styled.TouchableOpacity`
  background-color: #2182bd;
  padding: 6px 12px;
  border-radius: 12px;
  margin-top: 12px;
`;

const ActionText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 12px;
`;

const BottomBar = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #ffffff; // Или #f5f5f5 для легкого серого
  justify-content: center;
  align-items: center;
  border-top-width: 1px;
  border-color: #ddd;
  elevation: 8; // Добавляем тень на Android
  shadow-color: #000;
  shadow-offset: { width: 0, height: -2 };
  shadow-opacity: 0.1;
  shadow-radius: 4;
`;

export const CustomNoteCard = ({
  title,
  paragraph,
  date,
  onPress,
  image,
  checklist,
}) => {
  return (
    <CardContainer onPress={onPress} activeOpacity={0.9}>
      {image && ( // ✅ Добавляем блок для отображения изображения
        <Image
          source={{ uri: image }}
          style={{
            width: "100%",
            height: 150,
            borderRadius: 12,
            marginBottom: 10,
          }}
          resizeMode="cover"
        />
      )}
      <CardHeader>
        <IconWrapper>
          <Ionicons name="document-text-outline" size={24} color="#2182BD" />
        </IconWrapper>
        <NoteTitle>{title}</NoteTitle>
      </CardHeader>
      <NoteContent numberOfLines={3}>{paragraph}</NoteContent>
      {checklist && checklist.length > 0 && (
        <Spacer position="top" size="small" />
      )}
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
          <Text
            style={{
              textDecorationLine: task.done ? "line-through" : "none",
              color: "#555",
              fontSize: 12,
            }}
          >
            {task.text}
          </Text>
        </View>
      ))}

      <Footer>
        <DateText>{date}</DateText>
        <ActionButton onPress={onPress}>
          <ActionText>Open</ActionText>
        </ActionButton>
      </Footer>
    </CardContainer>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #f5f5f5; // Светлый серый вместо чисто белого
`;

const SearchContainer = styled.View`
  padding: 8px 16px;
  margin: 16px;
  border-radius: 24px;
  background-color: #ffffff;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
`;

export const NotesScreen = ({ navigation }) => {
  const theme = useTheme();
  const { notes, updateNote, addNote, removeNote, isLoading, keyword } =
    useContext(NotesContext);
  const [gridKey, setGridKey] = useState(0);

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [allNotesSelected, setAllNotesSelected] = useState(false);

  const toggleSelectionMode = () => {
    console.log("Toggle Selection Mode:", !selectionMode);
    setSelectionMode(!selectionMode);
  };

  const toggleNoteSelection = (noteId) => {
    console.log("Toggle Note Selection for ID:", noteId);
    if (selectedNotes.includes(noteId)) {
      setSelectedNotes(selectedNotes.filter((id) => id !== noteId));
    } else {
      setSelectedNotes([...selectedNotes, noteId]);
    }
  };

  const deleteSelectedNotes = useCallback(() => {
    selectedNotes.forEach((noteId) => removeNote(noteId));
    toggleSelectionMode();
  }, [selectedNotes]);

  const selectAllNotes = () => {
    if (allNotesSelected) {
      setSelectedNotes([]);
    } else {
      setSelectedNotes(notes.map((note) => note.id));
    }
    setAllNotesSelected(!allNotesSelected);
  };

  useEffect(() => {
    setGridKey((prevKey) => prevKey + 1);
  }, [notes]);

  return (
    <SafeArea>
      {selectionMode && (
        <TopBar>
          <TouchableOpacity onPress={toggleSelectionMode}>
            <Ionicons
              name="close"
              size={24}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>
          <Text style={{ color: theme.colors.text.primary }}>
            {selectedNotes.length} выбрано
          </Text>
          <TouchableOpacity onPress={selectAllNotes}>
            <Ionicons
              name="checkmark-done"
              size={24}
              color={allNotesSelected ? "#2182BD" : theme.colors.text.primary}
            />
          </TouchableOpacity>
        </TopBar>
      )}

      <FAB
        icon="plus"
        color="white"
        style={{
          zIndex: 999,
          position: "absolute",
          margin: 10,
          right: 10,
          bottom: 32,
          borderRadius: 28,
          width: 56,
          height: 56,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FF4B2B",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 6,
        }}
        onPress={() => {
          navigation.navigate("EditNote", { noteId: Date.now() });
        }}
      />

      <SearchContainer>
        <Search />
      </SearchContainer>
      <Container>
        {isLoading ? (
          <SafeArea>
            <Loading animating={true} color="#2182BD" size={100} />
          </SafeArea>
        ) : (
          <MasonryList
            contentContainerStyle={{
              paddingHorizontal: 0,
              paddingVertical: 0,
              alignSelf: "stretch",
            }}
            numColumns={2}
            data={notes}
            key={gridKey}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ padding: 4 }}>
                <TouchableOpacity
                  onLongPress={() => {
                    console.log(
                      "Долгое нажатие, selectionMode:",
                      selectionMode
                    );
                    if (!selectionMode) {
                      toggleSelectionMode();
                    }
                    toggleNoteSelection(item.id);
                  }}
                  onPress={() => {
                    if (selectionMode) {
                      toggleNoteSelection(item.id);
                    } else {
                      navigation.navigate("EditNote", { noteId: item.id });
                    }
                  }}
                  style={{ flex: 1 }} // Захватывает всю площадь
                >
                  {selectionMode && (
                    <View style={styles.noteSelectedIcon}>
                      <Ionicons
                        name={
                          selectedNotes.includes(item.id)
                            ? "checkmark-circle"
                            : "ellipse"
                        }
                        size={24}
                        color={
                          selectedNotes.includes(item.id) ? "#2182BD" : "grey"
                        }
                        style={{ marginRight: 8 }}
                      />
                    </View>
                  )}
                  <CustomNoteCard
                    id={item.id}
                    title={item.title}
                    paragraph={item.content}
                    date={formatDate(new Date(item.date))}
                    image={item.image}
                    checklist={item.checklist} // ✅ вот это не забудь передать!
                    onPress={() => {
                      if (!selectionMode) {
                        navigation.navigate("EditNote", { noteId: item.id });
                      }
                    }}
                    keyword={keyword}
                    selected={selectedNotes.includes(item.id)}
                  />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  color: theme.colors.text.primary,
                }}
              >
                No notes available
              </Text>
            }
          />
        )}

        {selectionMode && (
          <BottomBar>
            <TouchableOpacity onPress={deleteSelectedNotes}>
              <Ionicons
                name="trash"
                size={28}
                color="#2182BD" // Ярко-красная корзина, можно выбрать другой цвет
              />
            </TouchableOpacity>
          </BottomBar>
        )}
      </Container>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 10,
    padding: 12,
    height: 150,
    backgroundColor: "#D6E4F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemName: {
    fontSize: 16,
    color: "#1A1A1A",
    fontWeight: "700",
  },
  itemCode: {
    fontWeight: "500",
    fontSize: 12,
    color: "#37474F",
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    backgroundColor: "#4C6EF5",
    color: "white",
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  noteSelectedIcon: {
    position: "absolute",
    bottom: 8,
    right: 8,
    zIndex: 999,
  },
});
