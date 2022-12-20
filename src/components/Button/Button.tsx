/** Library import */
import { GestureResponderEvent, Pressable, Text } from 'react-native';

import ButtonStyles from 'styles/ButtonStyles';

interface ButtonProps {
  /** Button text rendered as children */
  children?: React.ReactNode;

  /** Button on press event */
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
}

const Button = ({ children, onPress }: ButtonProps): JSX.Element => {
  return (
    <Pressable style={ButtonStyles.button} onPress={onPress}>
      <Text style={ButtonStyles.buttonLabel}>{children}</Text>
    </Pressable>
  );
};

export default Button;
