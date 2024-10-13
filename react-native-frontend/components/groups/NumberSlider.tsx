import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface Props {
  initialValue?: number;
  onValueChange?: (value: number) => void;
}

const NumberSlider: React.FC<Props> = ({ initialValue = 0, onValueChange }) => {
  const [value, setValue] = useState(initialValue);

  const handleValueChange = (newValue: number) => {
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{value} minutes</Text>
      <Slider
        style={styles.slider}
        minimumValue={30}
        maximumValue={60}
        step={1}
        value={value}
        onValueChange={handleValueChange}
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#1EB1FC"
      />
    </View>
  );
};

export default NumberSlider;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});