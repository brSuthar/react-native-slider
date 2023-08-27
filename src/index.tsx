import React, {useState} from 'react';
import {StyleSheet, View, StatusBar, Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SliderView from './component/slider-view';
import 'react-native-gesture-handler';
import CardInput from './component/card-input';
import SheetView from './component/sheet-view';

function App(): JSX.Element {
  const [count, setCount] = useState(0);
  const onCallback = (value: number) => {
    setCount(value);
  };

  const renderView = (value: number, index: number) => {
    return (
      <View key={index} style={styles.infoView}>
        <View style={styles.pipe} />
        <Text style={styles.info}>{value}</Text>
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={styles.view}>
      <View style={styles.contaienr}>
        <StatusBar
          translucent
          backgroundColor={'#010B40'}
          barStyle={'light-content'}
        />
        <SliderView onSlideChange={onCallback} />
        <View style={styles.rangeView}>{[0, count, 100].map(renderView)}</View>
        <CardInput />
        <SheetView />
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
    paddingHorizontal: 46,
  },
  view: {
    width: '100%',
    height: '100%',
  },
  rangeView: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 4,
  },
  pipe: {
    width: 1.5,
    backgroundColor: '#1A73EB',
    height: 6,
  },
  info: {
    fontSize: 15,
    color: '#1A73EB',
    marginTop: 2,
  },
  infoView: {
    alignItems: 'center',
  },
});

export default App;
