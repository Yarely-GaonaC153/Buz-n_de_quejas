import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppData } from '@/context/app-data';

export default function ReportScreen() {
  const router = useRouter();
  const { draft, updateDraft } = useAppData();
  const [locationReady, setLocationReady] = useState(false);
  const [locationMessage, setLocationMessage] = useState('Usar mi ubicación actual');
  const [photoAdded, setPhotoAdded] = useState(Boolean(draft.photoUri));
  const canContinue = Boolean(draft.title?.trim() && draft.description?.trim());

  const useCurrentLocation = async () => {
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== 'granted') {
        setLocationMessage('Permiso de ubicación denegado');
        Alert.alert('Permiso requerido', 'Permite el acceso a la ubicación para asociarla al reporte.');
        return;
      }
      const current = await Location.getCurrentPositionAsync({});
      updateDraft({ latitude: current.coords.latitude, longitude: current.coords.longitude, address: `${current.coords.latitude.toFixed(5)}, ${current.coords.longitude.toFixed(5)}` });
      setLocationReady(true);
      setLocationMessage('Ubicación confirmada');
    } catch (error) {
      setLocationMessage('No se pudo obtener la ubicación');
      Alert.alert('Ubicación no disponible', error instanceof Error ? error.message : 'Intenta nuevamente.');
    }
  };

  const savePhoto = async (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled) {
      updateDraft({ photoUri: result.assets[0].uri });
      setPhotoAdded(true);
    }
  };

  const addPhoto = async () => {
    try { await savePhoto(await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7 })); }
    catch (error) { Alert.alert('No se pudo seleccionar la foto', error instanceof Error ? error.message : 'Intenta nuevamente.'); }
  };
  const takePhoto = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (permission.status !== 'granted') { Alert.alert('Permiso requerido', 'Permite el acceso a la cámara para tomar la evidencia.'); return; }
      await savePhoto(await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: 0.7 }));
    } catch (error) { Alert.alert('No se pudo tomar la foto', error instanceof Error ? error.message : 'Intenta nuevamente.'); }
  };

  const continueToAssistant = () => {
    if (!draft.title?.trim() || !draft.description?.trim()) {
      Alert.alert('Faltan datos', 'Escribe un título y describe la problemática antes de continuar.');
      return;
    }
    router.push('/assistant');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}><Text style={styles.back}>‹</Text></Pressable>
        <Text style={styles.headerTitle}>Reportar</Text>
        <View style={styles.headerSpace} />
      </View>
      <KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.eyebrow}>NUEVO REPORTE CIUDADANO</Text>
        <Text style={styles.pageTitle}>Cuéntanos qué sucede</Text>
        <Text style={styles.pageDescription}>La ubicación y la evidencia ayudan a que presidencia atienda tu reporte más rápido.</Text>
        <View style={styles.steps}>
          <Step number="1" label="Ubicación" active />
          <View style={styles.stepLine} />
          <Step number="2" label="Detalles" />
          <View style={styles.stepLine} />
          <Step number="3" label="Confirmar" />
        </View>
        <Text style={styles.sectionLabel}>Ubicación <Text style={styles.required}>*</Text></Text>
        <TextInput style={styles.locationInput} value={draft.address || ''} placeholder="Dirección o colonia" placeholderTextColor="#8a96a8" onChangeText={(address) => updateDraft({ address })} />
        <View style={styles.map}><View style={styles.mapRoadOne} /><View style={styles.mapRoadTwo} /><View style={styles.pin}><Text style={styles.pinText}>●</Text></View></View>
        <Pressable style={[styles.locationButton, locationReady && styles.locationButtonReady]} onPress={useCurrentLocation}><Text style={styles.locationIcon}>{locationReady ? '✓' : '⌖'}</Text><Text style={[styles.locationLabel, locationReady && styles.locationLabelReady]}>{locationReady ? locationMessage : 'Usar mi ubicación actual'}</Text></Pressable>
        <Text style={styles.sectionLabel}>Título del reporte <Text style={styles.required}>*</Text></Text>
        <TextInput style={styles.locationInput} value={draft.title || ''} placeholder="Ej. Falla en alumbrado público" placeholderTextColor="#8a96a8" onChangeText={(title) => updateDraft({ title })} />
        <View style={styles.labelRow}><Text style={styles.sectionLabel}>Evidencia fotográfica</Text><Text style={styles.optional}>Opcional</Text></View>
        <View style={styles.photoRow}><View style={styles.photo}>{draft.photoUri ? <Image source={{ uri: draft.photoUri }} style={styles.photoImage} /> : <Text style={styles.lamp}>{photoAdded ? '✓' : '☼'}</Text>}</View><View style={styles.photoActions}><Pressable style={styles.addPhoto} onPress={takePhoto}><Text style={styles.camera}>◉</Text><Text style={styles.addPhotoText}>Tomar foto</Text></Pressable><Pressable style={styles.addPhoto} onPress={addPhoto}><Text style={styles.camera}>▣</Text><Text style={styles.addPhotoText}>Galería</Text></Pressable></View></View>
        <Text style={styles.sectionLabel}>Describe la problemática <Text style={styles.required}>*</Text></Text>
        <TextInput style={styles.description} multiline value={draft.description || ''} placeholder="Describe qué sucede, desde cuándo y cómo afecta a la comunidad" placeholderTextColor="#8a96a8" onChangeText={(description) => updateDraft({ description })} />
        <Text style={styles.helper}>{draft.description?.length || 0}/500 caracteres</Text>
        <Pressable disabled={!canContinue} style={[styles.nextButton, !canContinue && styles.nextButtonDisabled]} onPress={continueToAssistant}><Text style={styles.nextLabel}>{canContinue ? 'Continuar' : 'Completa los campos obligatorios'}</Text></Pressable>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Step({ number, label, active = false }: { number: string; label: string; active?: boolean }) {
  return <View style={styles.step}><View style={[styles.stepNumber, active && styles.stepNumberActive]}><Text style={[styles.stepNumberText, active && styles.stepNumberTextActive]}>{number}</Text></View><Text style={styles.stepLabel}>{label}</Text></View>;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: { height: 60, backgroundColor: '#1c2d50', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18 },
  back: { color: '#fff', fontSize: 37, fontWeight: '200', lineHeight: 38 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },
  headerSpace: { width: 25 },
  content: { paddingHorizontal: 20, paddingTop: 16 },
  keyboard: { flex: 1 },
  eyebrow: { color: '#55739c', fontSize: 11, fontWeight: '800', letterSpacing: 1.2, marginBottom: 6 },
  pageTitle: { color: '#182744', fontSize: 24, fontWeight: '800', marginBottom: 5 },
  pageDescription: { color: '#68778e', fontSize: 13, lineHeight: 19, marginBottom: 20 },
  steps: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 },
  step: { alignItems: 'center', width: 60 },
  stepNumber: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#e8edf3', alignItems: 'center', justifyContent: 'center' },
  stepNumberActive: { backgroundColor: '#243b75' },
  stepNumberText: { color: '#4b5a73', fontWeight: '700' },
  stepNumberTextActive: { color: '#fff' },
  stepLabel: { color: '#4c5b71', fontSize: 11, fontWeight: '700', marginTop: 6 },
  stepLine: { height: 2, backgroundColor: '#dfe5ec', flex: 1, marginTop: 12 },
  locationInput: { borderColor: '#d6dce4', borderWidth: 1, borderRadius: 10, height: 46, paddingHorizontal: 13, color: '#263b5f', fontSize: 13, fontWeight: '600', backgroundColor: '#fff', marginBottom: 12 },
  map: { height: 118, backgroundColor: '#e8ece7', overflow: 'hidden', position: 'relative' },
  mapRoadOne: { position: 'absolute', width: '150%', height: 27, backgroundColor: '#fff', top: 35, left: -50, transform: [{ rotate: '18deg' }] },
  mapRoadTwo: { position: 'absolute', width: '150%', height: 22, backgroundColor: '#fff', top: 77, left: -30, transform: [{ rotate: '-27deg' }] },
  pin: { position: 'absolute', top: 28, left: '50%', marginLeft: -15, backgroundColor: '#e85f55', borderRadius: 18, width: 30, height: 30, alignItems: 'center', justifyContent: 'center' },
  pinText: { color: '#fff', fontSize: 15 },
  locationButton: { height: 42, borderColor: '#d6dce4', borderWidth: 1, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 18, backgroundColor: '#f8fafc' },
  locationButtonReady: { borderColor: '#b8dfc1', backgroundColor: '#effaf1' },
  locationIcon: { color: '#526b91', fontSize: 20 },
  locationLabel: { color: '#263c63', fontSize: 13, fontWeight: '700' },
  locationLabelReady: { color: '#327046' },
  sectionLabel: { color: '#17191c', fontSize: 14, fontWeight: '800', marginBottom: 8 },
  required: { color: '#d35b54' },
  labelRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  optional: { color: '#8a96a8', fontSize: 11, marginBottom: 8 },
  photoRow: { flexDirection: 'row', gap: 10, marginBottom: 17 },
  photoActions: { flex: 1, gap: 8 },
  photo: { width: 130, height: 99, borderRadius: 9, backgroundColor: '#283447', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  photoImage: { width: '100%', height: '100%' },
  lamp: { color: '#f5d889', fontSize: 40 },
  addPhoto: { flex: 1, width: '100%', borderRadius: 9, borderColor: '#cbd3df', borderWidth: 1, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' },
  camera: { color: '#8ca0bd', fontSize: 26 },
  addPhotoText: { color: '#596c89', fontSize: 12, fontWeight: '700', marginTop: 6 },
  description: { height: 112, borderColor: '#d0d8e3', borderWidth: 1, borderRadius: 10, padding: 12, color: '#52627b', fontSize: 14, textAlignVertical: 'top', marginBottom: 4 },
  helper: { color: '#8a96a8', fontSize: 11, textAlign: 'right', marginBottom: 18 },
  nextButton: { height: 48, borderRadius: 10, backgroundColor: '#243b75', alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  nextButtonDisabled: { backgroundColor: '#b6c0cf' },
  nextLabel: { color: '#fff', fontSize: 13, fontWeight: '800' },
});
