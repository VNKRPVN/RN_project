import React, { useState, } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Vibration } from 'react-native';

const FoodInput = ({ onAddFood }) => {
    const [inputValue, setInputValue] = useState("");
    const [buttonStyle, setButtonStyle] = useState(styles.searchButton);

    const handleAddFood = () => {
      if (!inputValue.trim()) {
        // Для веб изменяем цвет кнопки, для мобильных - вибрация
        if (Platform.OS === 'web') {
          setButtonStyle(styles.searchButtonError);
          setTimeout(() => setButtonStyle(styles.searchButton), 500);
        } else {
          Vibration.vibrate([0, 100, 100, 100]);
        }
        // alert("Пожалуйста, введите название продукта.");
      } else {
        onAddFood(inputValue.trim());
        setInputValue("");
        if (Platform.OS === 'web') {
          setButtonStyle(styles.searchButton);
        }
      }
    };

    return (
        <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            maxLength={20}
            placeholder="Добавьте продукт"
            value={inputValue}
            onChangeText={setInputValue}
        />
        <TouchableOpacity style={buttonStyle} onPress={handleAddFood}>
            <AntDesign name="plus" size={30} color="black" />
        </TouchableOpacity>
        </View>
    );
};

  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: "row",
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      marginRight: 10,
      borderRadius: 10,
      fontSize: 17,
    },
    searchButton: {
      backgroundColor: "#ffd43b",
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
    searchButtonError: {
      backgroundColor: '#c2255c', // цвет для ошибки
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
  });

export default FoodInput;