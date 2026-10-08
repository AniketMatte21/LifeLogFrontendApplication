import React, { useRef } from 'react';
import {
  Animated,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Zocial } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();

  // Button interaction scales
  const googleScale = useRef(new Animated.Value(1)).current;
  const emailScale = useRef(new Animated.Value(1)).current;

  const animatePress = (animVal: Animated.Value, toVal: number) => {
    Animated.spring(animVal, {
      toValue: toVal,
      useNativeDriver: true,
      friction: 4,
      tension: 40,
    }).start();
  };

  const handleLoginSuccess = () => {
    router.push('/dashboard');
  };

  const handleCreateAccount = () => {
    router.push('/signup');
  };

  return (
    <View style={styles.mainBackground}>
      {/* Top Section */}
      <View style={styles.topWhiteSection}>
        <SafeAreaView style={styles.headerSafeArea}>
          <View style={styles.headerContainer}>
            <View style={styles.avatarMini}>
              <Image
                source={require('../../assets/images/avatar.jpg')}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to sync your automated life log</Text>
          </View>
        </SafeAreaView>
      </View>

      {/* Bottom Black Curved Container */}
      <View style={styles.bottomBlackSection}>
        <SafeAreaView style={styles.bottomSafeArea}>
          <View style={styles.formContainer}>
            {/* Google OAuth Button */}
{/* Google OAuth Section */}
<View style={styles.googleContainer}>
  <Animated.View style={{ transform: [{ scale: googleScale }] }}>
    <TouchableOpacity
      style={styles.googleButton}
      activeOpacity={0.85}
      onPressIn={() => animatePress(googleScale, 0.92)}
      onPressOut={() => animatePress(googleScale, 1)}
      onPress={handleLoginSuccess}
    >
      <AntDesign name="google" size={26} color="#000000" />
    </TouchableOpacity>
  </Animated.View>

  <Text style={styles.googleSubtext}>Continue with Google</Text>
</View>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Email & Password Input Fields */}
<View style={styles.inputContainer}>
  <Image
    source={require('../../assets/images/gmail.png')}
    style={styles.gmailIcon}
    resizeMode="contain"
  />
  <TextInput
    style={styles.inputField}
    placeholder="Email address"
    placeholderTextColor="#8E8E93"
    keyboardType="email-address"
    autoCapitalize="none"
  />
</View>

<View style={styles.inputContainer}>
  <Image
    source={require('../../assets/images/lock.png')}
    style={styles.inputIcon}
    resizeMode="contain"
  />
  <TextInput
    style={styles.inputField}
    placeholder="Password"
    placeholderTextColor="#8E8E93"
    secureTextEntry
  />
</View>

            {/* Circular Yellow Arrow Sign In Button */}
            <Animated.View style={{ transform: [{ scale: emailScale }], alignSelf: 'center' }}>
              <TouchableOpacity
                style={styles.emailButton}
                activeOpacity={0.85}
                onPressIn={() => animatePress(emailScale, 0.9)}
                onPressOut={() => animatePress(emailScale, 1)}
                onPress={handleLoginSuccess}
              >
                <Ionicons name="arrow-forward" size={28} color="#000000" />
              </TouchableOpacity>
            </Animated.View>

            {/* Don't have an account? Create link */}
            <TouchableOpacity
              style={styles.signupContainer}
              activeOpacity={0.7}
              onPress={handleCreateAccount}
            >
              <Text style={styles.signupText}>
                Don't have an account? <Text style={styles.signupBoldText}>Create</Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              By continuing, you agree to LifeLog's Terms & Privacy Policy.
            </Text>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

const iosFont = Platform.select({
  ios: 'System',
  android: 'sans-serif-medium',
  default: 'System',
});

const styles = StyleSheet.create({
  mainBackground: {
    flex: 1,
    backgroundColor: '#f5f5c4',
  },
  topWhiteSection: {
    backgroundColor: '#f5f5c4',
    paddingBottom: 20,
  },
  headerSafeArea: {
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 24,
  },
  avatarMini: {
    width: 84,
    height: 84,
    borderRadius: 42,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#1E1E1E',
    borderWidth: 2,
    borderColor: '#050505',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    fontFamily: iosFont,
    letterSpacing: -0.6,
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: iosFont,
    color: '#6E6E73',
    textAlign: 'center',
  },
  bottomBlackSection: {
    flex: 1,
    backgroundColor: '#0C0C0C',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 30,
    marginTop: 20,
  },
  bottomSafeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  formContainer: {
    width: '100%',
  },
googleContainer: {
  alignItems: 'center',
},
googleButton: {
  width: 60,
  height: 60,
  borderRadius: 30, // Perfect circular radius
  backgroundColor: '#FFFFFF',
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 4,
},
googleSubtext: {
  marginTop: 8,
  fontSize: 12,
  color: '#8E8E93',
  fontFamily: iosFont,
},
  googleIcon: {
    marginRight: 10,
  },
  googleButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: iosFont,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: iosFont,
  },
  input: {
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 15,
    fontSize: 16,
    fontFamily: iosFont,
    color: '#FFFFFF',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#1C1C1E',
  borderRadius: 20,
  paddingHorizontal: 16,
  marginBottom: 12,
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.08)',
},
gmailIcon: {
  width: 20,
  height: 20,
  marginRight: 12,
},
inputIcon: {
  width: 20,
  height: 20,
  marginRight: 12,
},
inputField: {
  flex: 1,
  paddingVertical: 15,
  fontSize: 16,
  fontFamily: iosFont,
  color: '#FFFFFF',
},
  emailButton: {
    marginTop: 100,
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#f4e247',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#f4e247',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  signupContainer: {
    alignItems: 'center',
    marginTop: 18,
    paddingVertical: 8,
  },
  signupText: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: iosFont,
  },
  signupBoldText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#6E6E73',
    textAlign: 'center',
    fontFamily: iosFont,
  },
});