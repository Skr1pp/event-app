import React, { useContext, useState, useEffect } from "react";
import { Text, View, TextInput, Keyboard } from "react-native";

import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import styled from "styled-components/native";
import { useTheme } from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";
import { NotesContext } from "../../../services/notes/notes.context";
import { useIsFocused } from "@react-navigation/native";
import { SafeArea } from "../../../components/utility/safe-area.component";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
const TitleContainer = styled.View`
  padding-horizontal: ${(props) => props.theme.space[4]};
  padding-vertical: ${(props) => props.theme.space[2]};
  margin-horizontal: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.ui.primary};
  border-radius: ${(props) => props.theme.sizes[1]};
`;
const NoteContainer = styled.View`
  flex: 1;
  padding-vertical: ${(props) => props.theme.space[2]};
  padding-horizontal: ${(props) => props.theme.space[4]};
  margin: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.ui.primary};
  border-radius: ${(props) => props.theme.sizes[1]};
`;
const Loading = styled.ActivityIndicator`
  flex: 1;
`;

export const EditNoteScreen = ({ route, navigation }) => {
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Нужны права на доступ к галерее!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };
  const isFocused = useIsFocused();
  const theme = useTheme();
  const { noteId } = route.params;
  const [id, setId] = useState(noteId);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date(Date.now()));
  const [newNote, setNewNote] = useState(false);
  const {
    notes,
    getNotes,
    getNote,
    updateNote,
    addNote,
    removeNote,
    isLoading,
  } = useContext(NotesContext);

  const [contentUndoStack, setContentUndoStack] = useState([]);
  const [contentRedoStack, setContentRedoStack] = useState([]);

  const updateContent = (text) => {
    setContentUndoStack([...contentUndoStack, content]);
    setContentRedoStack([]);
    setContent(text);
  };

  const undoContent = () => {
    if (contentUndoStack.length > 0) {
      setContentRedoStack([...contentRedoStack, content]);
      setContent(contentUndoStack.pop());
      setContentUndoStack([...contentUndoStack]);
    }
  };

  const redoContent = () => {
    if (contentRedoStack.length > 0) {
      setContentUndoStack([...contentUndoStack, content]);
      setContent(contentRedoStack.pop());
      setContentRedoStack([...contentRedoStack]);
    }
  };

  useEffect(() => {
    navigation.setParams({
      undoContent: undoContent,
      redoContent: redoContent,
      contentUndoStackLength: contentUndoStack.length,
      contentRedoStackLength: contentRedoStack.length,
    });
  }, [contentUndoStack, contentRedoStack]);

  const fetchNoteData = async () => {
    console.log("fetching note data ", id);
    const noteData = await getNote(id);
    if (noteData != null) {
      console.log("fetchNoteData data:", noteData);
      setTitle(noteData.title);
      setContent(noteData.content);
      setDate(new Date(noteData.date));

      if (noteData.image) {
        setImageUri(noteData.image); // <- ВОТ СЮДА
      }

      setNewNote(false);
    } else {
      console.log("fetchNoteData null");
      setNewNote(true);
    }
  };

  handleFinishEdit = () => {
    if (title === "" && content === "") {
      console.log("removing note");
      if (!newNote) {
        removeNote(id);
      }
    } else {
      if (newNote) {
        addNote({
          id,
          title,
          content,
          date: new Date(Date.now()),
          image: imageUri,
        });
      } else {
        updateNote({
          id,
          title,
          content,
          date: new Date(Date.now()),
          image: imageUri,
        });
      }
    }
  };

  useEffect(() => {
    fetchNoteData();
  }, [id]);

  useEffect(() => {
    if (!isFocused) {
      console.log("Navigated away from EditNoteScreen");
      handleFinishEdit();
    }
  }, [isFocused]);

  useEffect(() => {
    console.log(date.getMonth() + 1);
    //console.log(new Date(Date.now()).getMonth() + 1);
  }, [date]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Container>
          <Spacer position="top" size="large" />
          {isLoading ? (
            <SafeArea>
              <Loading animating={true} color="#4C6EF5" size={100} />
            </SafeArea>
          ) : (
            <>
              <TitleContainer>
                <TextInput
                  placeholder="Заголовок"
                  multiline
                  value={title}
                  onChangeText={(text) => setTitle(text)}
                  style={{
                    fontSize: 20,
                    color: theme.colors.text.primary,
                  }}
                  placeholderTextColor={theme.colors.text.secondary}
                />
              </TitleContainer>
              <NoteContainer>
                <TextInput
                  placeholder="Напишите что-нибудь"
                  value={content}
                  onChangeText={(text) => updateContent(text)}
                  multiline
                  style={{
                    fontSize: 16,
                    color: theme.colors.text.primary,
                  }}
                  placeholderTextColor={theme.colors.text.secondary}
                />
              </NoteContainer>
              <TouchableOpacity
                onPress={pickImage}
                style={{
                  backgroundColor: "#2182BD",
                  padding: 10,
                  borderRadius: 12,
                  alignItems: "center",
                  margin: 16,
                }}
              >
                <Ionicons name="image-outline" size={24} color="white" />
                <Text style={{ color: "white", marginTop: 8 }}>
                  Добавить изображение
                </Text>
              </TouchableOpacity>

              {imageUri && (
                <Image
                  source={{ uri: imageUri }}
                  style={{
                    width: "90%",
                    height: 200,
                    borderRadius: 12,
                    alignSelf: "center",
                    marginVertical: 16,
                  }}
                  resizeMode="cover"
                />
              )}
            </>
          )}
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
