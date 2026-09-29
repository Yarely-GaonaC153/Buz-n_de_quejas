import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppData } from '@/context/app-data';
import { FlowScreen, flowStyles as s } from '@/components/flow-screen';

export default function MyReportScreen() {
  const router = useRouter();
  const { reports } = useAppData();
  const report = reports[0];
  if (!report) {
    return <FlowScreen title="Mi reporte" action="Crear un reporte" onAction={() => router.replace('/report')}><Text style={s.body}>Todavía no has enviado un reporte.</Text></FlowScreen>;
  }
  return <FlowScreen title="Mi reporte" action="Volver al inicio" onAction={() => router.replace('/explore')}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}><View style={{ width: 105, height: 105, borderRadius: 10, backgroundColor: '#283447', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: '#f5d889', fontSize: 40 }}>☼</Text></View><View style={{ paddingLeft: 15, flex: 1 }}><Text style={s.cardTitle}>{report.title}</Text><Text style={s.body}>{report.address}</Text><Text style={{ color: '#4f8f61', fontWeight: '800', marginTop: 8 }}>{report.status}</Text></View><Text style={s.body}>{report.createdAt}</Text></View>
    <Text style={s.title}>Información del reporte</Text>
    <View style={s.card}><Info icon="⌖" label="Ubicación" value={report.address} /><Info icon="♧" label="Descripción" value={report.description} /><Info icon="♙" label="Propuesta ciudadana" value={report.proposal || 'El ciudadano decidió no agregar una propuesta.'} /></View>
    <View style={{ backgroundColor: '#eef7ff', borderRadius: 12, padding: 18 }}><Text style={s.body}>ⓘ  Tu reporte ha sido enviado al departamento correspondiente. Te mantendremos informado sobre su avance.</Text></View>
  </FlowScreen>;
}

function Info({ icon, label, value }: { icon: string; label: string; value: string }) { return <View style={s.row}><Text style={s.rowIcon}>{icon}</Text><Text style={s.rowText}><Text style={{ fontWeight: '800' }}>{label}{'\n'}</Text>{value}</Text></View>; }
