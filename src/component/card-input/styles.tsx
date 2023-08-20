import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 46,
    backgroundColor: '#03318C',
    marginTop: 20,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dashed: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFFFFF',
  },
  bucket: {
    height: '100%',
    width: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3,
    zIndex: 2,
  },
  input: {
    color: 'white',
    position: 'absolute',
    height: 0,
    zIndex: -1,
  },
});
