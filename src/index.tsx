import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SliderView from './component/slider-view';
import 'react-native-gesture-handler';

function App(): JSX.Element {
  const onCallback = (value: number) => {
    console.log(value);
  };
  return (
    <GestureHandlerRootView style={styles.view}>
      <View style={styles.contaienr}>
        <StatusBar barStyle={'light-content'} />
        <SliderView onSlideChange={onCallback} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  contaienr: {
    height: '100%',
    backgroundColor: '#010B40',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  view: {
    width: '100%',
    height: '100%',
  },
  touchView: {
    backgroundColor: '#FFC107',
    height: 52,
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
});

export default App;
