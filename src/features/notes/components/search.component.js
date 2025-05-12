import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { useTheme } from "styled-components";
import { NotesContext } from "../../../services/notes/notes.context";

const SearchContainer = styled.View`
  z-index: 999;
  padding: 5px;
  margin: 1px;
`;

export const Search = () => {
  const { keyword, search } = useContext(NotesContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  const theme = useTheme();

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Поиск Мероприятия"
        style={{
          backgroundColor: theme.colors.ui.primary,
          height: 48,
          borderRadius: 20,
        }}
        inputStyle={{
          paddingBottom: 8,
          color: "#ffffff",

          textAlignVertical: "center",
        }}
        placeholderTextColor="#ffffff"
        cursorColor="#ffffff"
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};
