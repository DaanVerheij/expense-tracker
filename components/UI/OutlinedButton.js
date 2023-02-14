import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { GlobalStyles } from '../../constants/styles';

function OutlinedButton({ onPress, icon, children }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons
        style={styles.icon}
        name={icon}
        size={18}
        color={"white"}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default OutlinedButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: "white",
    fontWeight: 'bold',
  },
});