import React, {useRef, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import InputCursor from '../input-cursor';

const CardInput = () => {
  const inputRef = useRef<TextInput>();
  const [state, setState] = useState({value: '', focused: 0});
  const [haveFocused, setHavedFocused] = useState(false);
  const list = new Array(16).fill(0);

  const onFocusElement = () => {
    setHavedFocused(true);
  };

  const onBlurElement = () => {
    setHavedFocused(false);
  };

  const renderItem = (item: any, index: number) => {
    const mr = (index + 1) % 4 === 0 ? 8 : 3.5;
    const {value, focused} = state;
    if (index < value.length && value) {
      return (
        <View style={[styles.bucket, {marginRight: mr}]}>
          <Text style={styles.text}>{value[index]}</Text>
        </View>
      );
    }

    if (index === focused && haveFocused) {
      return (
        <View style={[styles.bucket, {marginRight: mr}]}>
          <InputCursor />
        </View>
      );
    }

    return (
      <View style={[styles.bucket, {marginRight: mr}]}>
        <View style={styles.dashed} />
      </View>
    );
  };

  const onInputPress = () => {
    inputRef.current?.focus();
  };

  const onTextChange = (text: string) => {
    setState({
      value: text,
      focused: text.length,
    });
  };

  return (
    <TouchableOpacity
      onPress={onInputPress}
      activeOpacity={1}
      style={styles.container}>
      {list.map(renderItem)}
      <TextInput
        ref={inputRef}
        maxLength={16}
        multiline={false}
        caretHidden={true}
        style={styles.input}
        onChangeText={onTextChange}
        onFocus={onFocusElement}
        onBlur={onBlurElement}
      />
      {/* <InputCursor /> */}
    </TouchableOpacity>
  );
};

export default CardInput;
