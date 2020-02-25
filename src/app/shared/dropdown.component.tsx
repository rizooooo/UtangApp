import React, { useEffect } from 'react';
import { View, Picker, StyleSheet, Text } from 'react-native';
import { GLOBAL_STYLES } from '../styles/global.styles';
import Label from './label.component';

const Dropdown = ({ items, label, onValueChange, selectedValue }: any) => {
  return (
    <View>
      <Label text={label} />
      <View style={GLOBAL_STYLES.picker}>
        <Picker
          style={styles.pickerStyle}
          onValueChange={onValueChange}
          selectedValue={selectedValue}>
          {items &&
            items.map((e: any) => (
              <Picker.Item label={e.name} value={e.id} key={e.id} />
            ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerStyle: {
    height: 40,
  },
});

export default Dropdown;
