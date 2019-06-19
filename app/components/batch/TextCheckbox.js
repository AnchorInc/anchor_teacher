import React from 'react';
import { View, Text, Checkbox } from 'react-native';

const TextCheckbox = ({ title, onValueChange, value }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>
        {title}
      </Text>
      <Checkbox
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  );
};

export default TextCheckbox;
