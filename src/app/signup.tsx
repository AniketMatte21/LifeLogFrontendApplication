import React, { useRef,useState } from 'react';
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
import { AntDesign, Ionicons,Zocial } from '@expo/vector-icons';

export default function SignupScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleSignupSuccess = () => {
    router.push('/dashboard');
  };

  const handleGoToLogin = () => {
    router.push('/login');
  };

  return (
    <View style={styles.mainBackground}>
      {/* Top Black Section */}
      <View style={styles.topBlackSection}>
        <SafeAreaView style={styles.headerSafeArea}>
          <View style={styles.headerContainer}>
            <View style={styles.avatarMini}>
              <Image
                source={require('../../assets/images/avatar.jpg')}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Start tracking your automated life log today
            </Text>
          </View>
        </SafeAreaView>
      </View>

      {/* Bottom Light Yellow Curved Container */}
      <View style={styles.bottomYellowSection}>
        <SafeAreaView style={styles.bottomSafeArea}>
          <View style={styles.formContainer}>
            {/* Google OAuth Section */}
            <View style={styles.googleContainer}>
              <Animated.View style={{ transform: [{ scale: googleScale }] }}>
                <TouchableOpacity
                  style={styles.googleButton}
                  activeOpacity={0.85}
                  onPressIn={() => animatePress(googleScale, 0.92)}
                  onPressOut={() => animatePress(googleScale, 1)}
                  onPress={handleSignupSuccess}
                >
                  <AntDesign name="google" size={26} color="#000000" />
                </TouchableOpacity>
              </Animated.View>
              <Text style={styles.googleSubtext}>Sign up with Google</Text>
            </View>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Email, Password & Retype Password Inputs */}
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
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIconContainer}
          activeOpacity={0.7}
        >
          <Ionicons
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="#8E8E93"
          />
        </TouchableOpacity>
      </View>

      {/* Re-Type Password Field */}
      <View style={styles.inputContainer}>
        <Image
          source={require('../../assets/images/lock.png')}
          style={styles.inputIcon}
          resizeMode="contain"
        />
        <TextInput
          style={styles.inputField}
          placeholder="Re-Type-Password"
          placeholderTextColor="#8E8E93"
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={styles.eyeIconContainer}
          activeOpacity={0.7}
        >
          <Ionicons
            name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="#8E8E93"
          />
        </TouchableOpacity>
      </View>

            {/* Circular Yellow Arrow Submit Button */}
            <Animated.View style={{ transform: [{ scale: emailScale }], alignSelf: 'center' }}>
              <TouchableOpacity
                style={styles.emailButton}
                activeOpacity={0.85}
                onPressIn={() => animatePress(emailScale, 0.9)}
                onPressOut={() => animatePress(emailScale, 1)}
                onPress={handleSignupSuccess}
              >
                <Ionicons name="arrow-forward" size={28} color="#000000" />
              </TouchableOpacity>
            </Animated.View>

            {/* Already have an account? Sign In Link */}
            <TouchableOpacity
              style={styles.loginContainer}
              activeOpacity={0.7}
              onPress={handleGoToLogin}
            >
              <Text style={styles.loginText}>
                Already have an account? <Text style={styles.loginBoldText}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              By registering, you agree to LifeLog's Terms & Privacy Policy.
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
    backgroundColor: '#0C0C0C', // Top portion dark background
  },
  topBlackSection: {
    backgroundColor: '#0C0C0C',
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
    borderColor: '#3A3A3C',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  eyeIconContainer: {
  padding: 4,
  justifyContent: 'center',
  alignItems: 'center',
},
  title: {
    fontSize: 30,
    fontWeight: '800',
    fontFamily: iosFont,
    letterSpacing: -0.6,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: iosFont,
    color: '#8E8E93',
    textAlign: 'center',
  },
  bottomYellowSection: {
    flex: 1,
    backgroundColor: '#f5f5c4', // Bottom portion yellow background
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
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  googleSubtext: {
    marginTop: 8,
    fontSize: 12,
    color: '#555555',
    fontFamily: iosFont,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 14,
    color: '#666666',
    fontFamily: iosFont,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 15,
    fontSize: 16,
    fontFamily: iosFont,
    color: '#000000',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  borderRadius: 20,
  paddingHorizontal: 16,
  marginBottom: 12,
  borderWidth: 1,
  borderColor: 'rgba(0, 0, 0, 0.08)',
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
  color: '#000000',
},
  emailButton: {
    marginTop: 80,
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#f4e247',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 8,
  },
  loginText: {
    fontSize: 14,
    color: '#555555',
    fontFamily: iosFont,
  },
  loginBoldText: {
    color: '#000000',
    fontWeight: '700',
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#777777',
    textAlign: 'center',
    fontFamily: iosFont,
  },
});