import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


// dit is een icon button component die wordt gebruikt als je een expense wilt verwijderen, hiermee wordt gebruik gemaakt van de library @expo/vector-icons
// we gebruiken het prullenbakje, waardoor het voor de gebruiker duidelijk is dat je de expense kan verwijderen.
function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2
  },
  pressed: {
    opacity: 0.75,
  },
});