import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { FlowScreen, flowStyles as s } from '@/components/flow-screen';
import { useAppData } from '@/context/app-data';

export default function AgencyScreen() {
  const router = useRouter();
  const { reports } = useAppData();
  return <FlowScreen title="Panel de la dependencia" icon="▣" action="Abrir primer reporte" onAction={() => router.push('/my-report')}>
    <Text style={[s.title, { textAlign: 'center' }]}>Reportes</Text>
    <View style={s.card}><Text style={s.body}>Buscar por colonia, tipo o folio...  ⌕</Text></View>
    <View style={{ flexDirection: 'row', gap: 10, marginBottom: 15 }}><View style={[s.card, { flex: 1, marginBottom: 0 }]}><Text style={s.body}>Todos los estatus⌄</Text></View><View style={[s.card, { flex: 1, marginBottom: 0 }]}><Text style={s.body}>Todas las áreas⌄</Text></View></View>
    {reports.length === 0 ? <Text style={s.body}>No hay reportes enviados todavía.</Text> : reports.map((report) => <Report key={report.id} title={report.title} place={report.address} status={report.status} />)}
  </FlowScreen>;
}

function Report({ title, place, status }: { title: string; place: string; status: string }) { return <View style={s.card}><Text style={s.cardTitle}>{title}</Text><Text style={s.body}>{place}</Text><Text style={{ color: '#4f8f61', fontWeight: '800', marginTop: 8 }}>{status}  ›</Text></View>; }
