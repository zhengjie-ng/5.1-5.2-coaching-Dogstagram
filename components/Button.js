import { Pressable, Text, StyleSheet, Platform } from 'react-native';
import { Colors } from '../styles/colors';

function Button({ children, onPress }) {
  return (
    <Pressable
      //   style={styles.buttonContainer}
      //   style={({ pressed }) => [
      //     styles.buttonContainer,
      //     pressed && styles.buttonPressed,
      //   ]}
      // If you want to handle iOS/Android differently
      style={({ pressed }) => [
        styles.buttonContainer,
        pressed && Platform.OS === 'ios' && styles.buttonPressed,
      ]}
      onPress={onPress}
      android_ripple={{ color: '#9777fa40', foreground: true }}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    // Center text in the button
    alignItems: 'center',
    justifyContent: 'center',

    // Shadows
    // Shadow for Android
    // higher value = bigger shadow
    elevation: 8,

    // Shadow for iOS
    shadowColor: '#000',
    // How far the shadow is from the component
    // width: horizontal offset, height: vertical offset
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    // how soft/diffused the edges of the shadow appears
    // 1 - sharp shadow, 10 - blurry soft shadow
    shadowRadius: 2,
  },
  buttonText: {
    fontFamily: 'Rubik_700Bold',
    color: '#fff',
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  buttonPressed: {
    opacity: 0.6,
  },
});

export default Button;
