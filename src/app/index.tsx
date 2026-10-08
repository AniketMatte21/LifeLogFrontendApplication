import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LandingScreen() {
  const router = useRouter();

  // Animation values for Floating & Scaling
  const floatAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Arrow Button Press Animation
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: -12,
            duration: 1800,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 1800,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.05,
            duration: 1800,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1800,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, [floatAnim, scaleAnim]);

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Animated Circular Container */}
        <Animated.View
          style={[
            styles.iconCircle,
            {
              transform: [
                { translateY: floatAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          <Image
            source={require('../../assets/images/avatar.jpg')}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </Animated.View>

        {/* App Branding */}
        <Text style={styles.title}>LifeLog</Text>
        <Text style={styles.subtitle}>Your automated daily companion</Text>
      </View>

      {/* Centered Circular Arrow Button */}
      <View style={styles.buttonContainer}>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={styles.arrowButton}
            activeOpacity={0.85}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleGetStarted}
          >
            <Ionicons name="arrow-forward" size={28} color="#3b3636" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

// iOS Font Configuration
const iosFont = Platform.select({
  ios: 'System',
  android: 'sans-serif-medium',
  default: 'System',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010101',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    fontFamily: iosFont,
    letterSpacing: -0.8,
    color: '#fdf9f9',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: iosFont,
    letterSpacing: -0.2,
    color: '#878788',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center', // Centers the circular button
    marginBottom: 20,
  },
  // Circular Arrow Button
  arrowButton: {
    width: 68,
    height: 68,
    borderRadius: 34, // Perfect Circle Radius
    backgroundColor: '#f4e247',
    justifyContent: 'center',
    alignItems: 'center',
    // Soft drop shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
});