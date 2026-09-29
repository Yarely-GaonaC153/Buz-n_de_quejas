import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppData } from '@/context/app-data';
import { supabase } from '@/lib/supabase';

const actions = [
  { icon: '✎', title: 'Reportar', subtitle: 'una queja o denuncia' },
  { icon: '♧', title: 'Proponer', subtitle: 'un proyecto' },
  { icon: '▤', title: 'Mis reportes', subtitle: '' },
  { icon: '◒', title: 'Proyectos en', subtitle: 'mi comunidad' },
];

export default function ExploreScreen() {
  const router = useRouter();
  const { reports } = useAppData();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.menu}>☰</Text>
          <Text style={styles.headerTitle}>CiudadEnAcción</Text>
          <View style={styles.profileCircle}><Text style={styles.profileIcon}>●</Text></View>
        </View>
        <View style={styles.intro}>
          <Text style={styles.welcome}>Hola, Bienvenido</Text>
          <Text style={styles.description}>Juntos mejoramos nuestra comunidad.</Text>
          {!supabase && <Text style={styles.connectionWarning}>Modo local: configura Supabase para enviar reportes a presidencia.</Text>}
        </View>
        <View style={styles.actionsGrid}>
          {actions.map((action, index) => (
            <Pressable
              key={action.title}
              onPress={() => router.push(['/report', '/assistant', '/my-report', '/projects'][index] as never)}
              style={({ pressed }) => [styles.actionCard, pressed && styles.pressed]}>
              <Text style={styles.actionIcon}>{action.icon}</Text>
              <Text style={styles.actionTitle}>{action.title}</Text>
              {!!action.subtitle && <Text style={styles.actionSubtitle}>{action.subtitle}</Text>}
            </Pressable>
          ))}
        </View>
        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Reportes recientes</Text>
          <Pressable onPress={() => router.push('/agency')}><Text style={styles.seeAll}>Ver todos ›</Text></Pressable>
        </View>
          <Pressable style={styles.reportList} onPress={() => reports[0] && router.push('/my-report')}>
          {reports.length === 0 ? <Text style={styles.empty}>Aún no tienes reportes. Crea el primero desde Reportar.</Text> : reports.slice(0, 3).map((report) => <ReportRow key={report.id} title={report.title} location={report.address} status={report.status} date={report.createdAt} color="#59626d" />)}
          </Pressable>
      </ScrollView>
      <View style={styles.bottomBar}>
        <View style={styles.bottomItem}><Text style={styles.bottomIconActive}>⌂</Text><Text style={styles.bottomLabelActive}>Inicio</Text></View>
        <Pressable style={styles.addButton} onPress={() => router.push('/report')}><Text style={styles.addLabel}>+</Text></Pressable>
        <Pressable style={styles.bottomItem} onPress={() => router.push('/notifications')}><Text style={styles.bottomIcon}>♧</Text><Text style={styles.bottomLabel}>Notificaciones</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}

function ReportRow({ title, location, status, date, color }: { title: string; location: string; status: string; date: string; color: string }) {
  return (
    <View style={styles.reportRow}>
      <View style={[styles.reportImage, { backgroundColor: color }]}><Text style={styles.imageSymbol}>•</Text></View>
      <View style={styles.reportInfo}>
        <Text style={styles.reportTitle}>{title}</Text>
        <Text style={styles.reportLocation}>{location}</Text>
        <View style={[styles.status, { backgroundColor: status === 'Asignado' ? '#c9def7' : '#ccefd2' }]}><Text style={styles.statusText}>{status}</Text></View>
      </View>
      <Text style={styles.reportDate}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fbfcfe' },
  content: { paddingBottom: 92 },
  header: { height: 60, backgroundColor: '#1c2d50', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 17 },
  menu: { color: '#fff', fontSize: 23, width: 42 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },
  profileCircle: { borderColor: '#fff', borderWidth: 2, borderRadius: 15, height: 25, width: 25, alignItems: 'center', justifyContent: 'flex-end' },
  profileIcon: { color: '#fff', fontSize: 14, lineHeight: 17 },
  intro: { paddingHorizontal: 22, paddingTop: 28, paddingBottom: 20 },
  welcome: { color: '#0d0d0f', fontSize: 22, fontWeight: '800' },
  description: { color: '#222', fontSize: 15, marginTop: 5 },
  connectionWarning: { color: '#8a5a12', backgroundColor: '#fff4d8', borderRadius: 8, fontSize: 12, marginTop: 12, padding: 9 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingHorizontal: 15 },
  actionCard: { width: '47.8%', minHeight: 100, borderColor: '#dfe3e9', borderWidth: 1, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', shadowColor: '#8090a5', shadowOpacity: 0.11, shadowRadius: 5, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  pressed: { opacity: 0.7 },
  actionIcon: { color: '#1d2a4b', fontSize: 32, lineHeight: 36, marginBottom: 5 },
  actionTitle: { color: '#161719', fontSize: 14, fontWeight: '800' },
  actionSubtitle: { color: '#1c1c1d', fontSize: 12, fontWeight: '600' },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 20, paddingBottom: 10 },
  sectionTitle: { color: '#18191b', fontSize: 16, fontWeight: '800' },
  seeAll: { color: '#40577f', fontSize: 12, fontWeight: '700' },
  reportList: { marginHorizontal: 15, borderColor: '#e0e4e9', borderWidth: 1, borderRadius: 11, overflow: 'hidden', backgroundColor: '#fff' },
  empty: { color: '#687383', fontSize: 13, padding: 22, textAlign: 'center' },
  reportRow: { minHeight: 99, borderBottomColor: '#edf0f4', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', padding: 9 },
  reportImage: { width: 77, height: 76, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  imageSymbol: { color: 'rgba(255,255,255,.35)', fontSize: 48 },
  reportInfo: { flex: 1, paddingLeft: 10 },
  reportTitle: { color: '#1a1b1d', fontSize: 13, fontWeight: '800' },
  reportLocation: { color: '#687383', fontSize: 11, marginTop: 4 },
  status: { alignSelf: 'flex-start', borderRadius: 12, marginTop: 7, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { color: '#24362a', fontSize: 10, fontWeight: '700' },
  reportDate: { alignSelf: 'flex-end', color: '#637086', fontSize: 10, paddingBottom: 7 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 69, borderTopColor: '#e1e5ea', borderTopWidth: 1, backgroundColor: 'rgba(255,255,255,.97)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  bottomItem: { alignItems: 'center', width: 85 },
  bottomIconActive: { color: '#243b75', fontSize: 27, lineHeight: 28 },
  bottomIcon: { color: '#7d899d', fontSize: 25, lineHeight: 28 },
  bottomLabelActive: { color: '#243b75', fontSize: 10, fontWeight: '700' },
  bottomLabel: { color: '#7d899d', fontSize: 10 },
  addButton: { backgroundColor: '#243b75', height: 48, width: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginTop: -25, shadowColor: '#243b75', shadowOpacity: 0.25, shadowRadius: 5, shadowOffset: { width: 0, height: 3 }, elevation: 4 },
  addLabel: { color: '#fff', fontSize: 30, fontWeight: '300', lineHeight: 32 },
});
