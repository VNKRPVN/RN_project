import {StyleSheet, TextInput, TouchableOpacity, View, Image, Platform} from "react-native";
import {forwardRef, useImperativeHandle, useRef, useState} from "react";
import { Vibration } from 'react-native';

const SearchInput = ({
    value,
    onChangeSearchStr,
    onSearch
    }, ref) => {
    const inputRef = useRef();
    const [buttonStyle, setButtonStyle] = useState(styles.searchButton);


    const handleSearch = () => {
        if (!value.trim()) {
            if (Platform.OS === 'android') {
                Vibration.vibrate([0, 100, 100, 100]);
                onSearch();
              } else {
                setButtonStyle(styles.searchButtonError);
                setTimeout(() => setButtonStyle(styles.searchButton), 500);
                onSearch();
              }
        } else {
          onSearch();
        }
      };

    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current.focus()
    }))


    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Введите название рецепта"
                value={value}
                ref={inputRef}
                onChangeText={(text) => onChangeSearchStr(text)}
            />
            <TouchableOpacity style={buttonStyle} onPress={handleSearch}>
                <Image style={styles.searchIcon} source={require('../assets/search.png')}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginRight: 10,
        borderRadius: 10,
        fontSize: 17,
    },
    searchButton: {
        backgroundColor: '#ffd43b',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    searchButtonError: {
        backgroundColor: '#c2255c', // цвет для ошибки
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    searchIcon: {
        display: 'flex',
        width: 30,
        height: 30,
    },
});

export default forwardRef(SearchInput);