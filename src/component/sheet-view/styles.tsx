import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {
    width: width,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-end',
  },
  view: {
    width: '100%',
    backgroundColor: '#031094',
  },
});
