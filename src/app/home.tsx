import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
    Animated,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState(false);

  // Button scale animations
  const dashboardScale = useRef(new Animated.Value(1)).current;

  const animatePress = (animVal: Animated.Value, toVal: number) => {
    Animated.spring(animVal, {
      toValue: toVal,
      useNativeDriver: true,
      friction: 4,
      tension: 40,
    }).start();
  };

//   const handleNavigateToDashboard = () => {
//     router.push('/dashboard');
//   };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Title */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Today</Text>
          <Text style={styles.dateText}>Thursday, October 8</Text>
        </View>

        {/* Permission Card (Disappears once granted) */}
        {!hasPermission && (
          <View style={styles.permissionCard}>
            <View style={styles.permissionHeader}>
              <Ionicons name="notifications-outline" size={22} color="#000000" />
              <Text style={styles.permissionTitle}>Auto-Sync Permissions</Text>
            </View>
            <Text style={styles.permissionBody}>
              Enable notification & Gmail sync to automatically capture orders, transactions, and daily activity.
            </Text>
            <TouchableOpacity
              style={styles.permissionButton}
              activeOpacity={0.8}
              onPress={() => setHasPermission(true)}
            >
              <Text style={styles.permissionButtonText}>Grant Permission</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Quick Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>CURRENT STATUS</Text>
          <Text style={styles.summaryValue}>Ready to log your day</Text>
          <Text style={styles.summarySubtext}>
            LifeLog is monitoring activity in the background.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Floating Navigation Button */}
      <View style={styles.bottomNavContainer}>
        <Animated.View style={{ transform: [{ scale: dashboardScale }] }}>
          <TouchableOpacity
            style={styles.dashboardButton}
            activeOpacity={0.85}
            onPressIn={() => animatePress(dashboardScale, 0.96)}
            onPressOut={() => animatePress(dashboardScale, 1)}
            // onPress={handleNavigateToDashboard}
          >
            <Text style={styles.dashboardButtonText}>Open Dashboard</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const iosFont = Platform.select({
  ios: 'System',
  android: 'sans-serif-medium',
  default: 'System',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5eebd',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 34,
    fontWeight: '800',
    fontFamily: iosFont,
    letterSpacing: -0.8,
    color: '#000000',
  },
  dateText: {
    fontSize: 16,
    fontFamily: iosFont,
    color: '#6E6E73',
    marginTop: 4,
  },
  permissionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  permissionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  permissionTitle: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: iosFont,
    color: '#000000',
    marginLeft: 8,
  },
  permissionBody: {
    fontSize: 14,
    fontFamily: iosFont,
    color: '#48484A',
    lineHeight: 20,
    marginBottom: 16,
  },
  permissionButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: iosFont,
  },
  summaryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: iosFont,
    color: '#8E8E93',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: iosFont,
    color: '#000000',
    marginBottom: 4,
  },
  summarySubtext: {
    fontSize: 14,
    fontFamily: iosFont,
    color: '#6E6E73',
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 30,
    left: 24,
    right: 24,
  },
  dashboardButton: {
    backgroundColor: '#000000',
    paddingVertical: 18,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 5,
  },
  dashboardButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    fontFamily: iosFont,
  },
});