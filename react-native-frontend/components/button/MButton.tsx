import * as React from 'react';
import { GestureResponderEvent } from 'react-native';
import { Button } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

interface Props {
  icon?: IconSource
  mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal"
  text: string,
  action?: ((e: GestureResponderEvent) => void)
}

const MButton = ({icon, mode, text, action}: Props) => (
  <Button icon={icon} mode={mode} onPress={action} buttonColor='green'>
    {text}
  </Button>
);

export default MButton;