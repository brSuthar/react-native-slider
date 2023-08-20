import React, {useRef} from 'react';
import {TextInput, View} from 'react-native';
import {styles} from './styles';

const CardInput = () => {
  const inputRef = useRef<TextInput>();
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(value => {
        const mr = value % 4 === 0 ? 7 : 3.5;
        return (
          <View style={[styles.bucket, {marginRight: mr}]}>
            <View style={styles.dashed} />
          </View>
        );
      })}
      <TextInput ref={inputRef} caretHidden={true} style={styles.input} />
    </View>
  );
};

export default CardInput;
