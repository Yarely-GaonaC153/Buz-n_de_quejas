import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabInset, MaxContentWidth } from '@/constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=1200&q=85',
        }}
        resizeMode="cover"
        style={styles.background}>
        <View style={styles.overlay} />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <View style={styles.brand}>
              <View style={styles.mark}>
                <Text style={styles.star}>★</Text>
                <View style={styles.peopleRow}>
                  <View style={[styles.person, styles.personBlue]} />
                  <View style={styles.personBody} />
                  <View style={[styles.person, styles.personGreen]} />
                </View>
                <View style={styles.pin}>
                  <View style={styles.pinCore} />
                </View>
              </View>
              <Text style={styles.brandName}>
                <Text style={styles.brandStrong}>MiCiudad</Text>Activa
              </Text>
              <Text style={styles.tagline}>Tú propones, juntos mejoramos.</Text>
            </View>

            <View style={styles.actions}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Iniciar"
                onPress={() => router.push('/explore')}
                style={({ pressed }) => [styles.startButton, pressed && styles.buttonPressed]}>
                <Text style={styles.startLabel}>INICIAR</Text>
              </Pressable>
              <Text style={styles.footer}>Reporta, propone y sé parte de la solución</Text>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#172744',
  },
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(8, 24, 48, 0.53)',
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: BottomTabInset,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 10,
  },
  brand: {
    alignItems: 'center',
    marginTop: '7%',
  },
  mark: {
    height: 152,
    width: 156,
    alignItems: 'center',
    position: 'relative',
  },
  star: {
    color: '#ffd34f',
    fontSize: 58,
    lineHeight: 65,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  peopleRow: {
    position: 'absolute',
    top: 54,
    width: 138,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  person: {
    height: 22,
    width: 22,
    borderRadius: 11,
  },
  personBlue: {
    backgroundColor: '#10d5e6',
  },
  personGreen: {
    backgroundColor: '#8be51f',
  },
  personBody: {
    width: 28,
    height: 66,
    backgroundColor: '#14dce3',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    transform: [{ skewX: '-12deg' }],
  },
  pin: {
    position: 'absolute',
    bottom: 0,
    width: 92,
    height: 92,
    borderRadius: 50,
    backgroundColor: '#f7f8ff',
    transform: [{ rotate: '45deg' }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinCore: {
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: '#3c5375',
  },
  brandName: {
    color: '#fff',
    fontSize: 31,
    letterSpacing: 0.2,
    lineHeight: 38,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  brandStrong: {
    fontWeight: '800',
  },
  tagline: {
    color: '#f0f1f7',
    fontSize: 15,
    marginTop: -1,
  },
  actions: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 4,
  },
  startButton: {
    width: '92%',
    height: 51,
    borderRadius: 28,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#07152a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
  startLabel: {
    color: '#243452',
    fontSize: 23,
    fontWeight: '800',
  },
  footer: {
    color: '#fff',
    fontFamily: 'serif',
    fontSize: 16,
    marginTop: 83,
    textAlign: 'center',
  },
});
