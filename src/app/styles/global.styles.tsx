import { StyleSheet, StatusBar } from 'react-native';
import { Fonts } from '../core/enums/font';

export const GLOBAL_STYLES = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  titleText: {
    fontFamily: Fonts.NunitoRegular,
    fontSize: 18,
    color: '#333',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  input: {
    marginVertical: 10,
    backgroundColor: '#fff',
    fontFamily: Fonts.NunitoRegular,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    fontSize: 18,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
  },
  picker: {
    flexDirection: 'column',
    borderRadius: 6,
    // height: 40,
    borderColor: '#eaeaea',
    borderWidth: 1,
  }
});
