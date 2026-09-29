import { ReactNode } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function FlowScreen({ title, icon, children, action, onAction, secondaryAction, onSecondaryAction }: { title: string; icon?: string; children: ReactNode; action?: string; onAction?: () => void; secondaryAction?: string; onSecondaryAction?: () => void }) {
  const router = useRouter();
  const styles = flowStyles;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <Text style={styles.headerTitle}>{icon ? `${icon}  ` : ''}{title}</Text>
        <View style={styles.headerSpace} />
      </View>
      <View style={styles.content}>{children}</View>
      {(action || secondaryAction) && <View style={styles.footer}>
        {action && <Pressable style={styles.primaryButton} onPress={onAction}><Text style={styles.primaryText}>{action}</Text></Pressable>}
        {secondaryAction && <Pressable style={styles.secondaryButton} onPress={onSecondaryAction}><Text style={styles.secondaryText}>{secondaryAction}</Text></Pressable>}
      </View>}
    </SafeAreaView>
  );
}

export const flowStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 20 },
  header: { height: 60, backgroundColor: '#1c2d50', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18 },
  back: { width: 34 },
  backText: { color: '#fff', fontSize: 37, lineHeight: 38 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },
  headerSpace: { width: 34 },
  footer: { padding: 18, gap: 10, backgroundColor: '#fff' },
  primaryButton: { height: 46, borderRadius: 10, backgroundColor: '#243b75', alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  secondaryButton: { height: 42, borderRadius: 10, borderColor: '#cbd3df', borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  secondaryText: { color: '#243b75', fontWeight: '700', fontSize: 13 },
  title: { color: '#243b75', fontSize: 19, fontWeight: '800', marginBottom: 18 },
  body: { color: '#354564', fontSize: 14, lineHeight: 21 },
  card: { borderColor: '#d8e0ea', borderWidth: 1, borderRadius: 12, padding: 17, backgroundColor: '#fff', marginBottom: 12 },
  cardTitle: { color: '#243b75', fontWeight: '800', fontSize: 15, marginBottom: 7 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  rowIcon: { color: '#243b75', fontSize: 25, width: 30, textAlign: 'center' },
  rowText: { color: '#354564', fontSize: 14, flex: 1 },
});
