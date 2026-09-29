import { useRouter } from 'expo-router';
import { Alert, Text, View } from 'react-native';
import { FlowScreen, flowStyles as s } from '@/components/flow-screen';
import { useAppData } from '@/context/app-data';

export default function SummaryScreen() {
  const router = useRouter();
  const { draft, submitReport } = useAppData();
  const acceptProposal = async () => {
    try { await submitReport(); router.replace('/my-report'); } catch (error) { Alert.alert('No se pudo enviar', error instanceof Error ? error.message : 'Revisa la configuración de Supabase.'); }
  };
  return <FlowScreen title="Resumen del proyecto" icon="▤" action="Ver recomendación sustentable" onAction={() => router.push('/sustainable')} secondaryAction="Aceptar propuesta y enviar" onSecondaryAction={acceptProposal}>
    <Text style={s.title}>{draft.title || 'Resumen del reporte'}</Text>
    <Text style={[s.body, { marginBottom: 14 }]}>Mini cédula ciudadana para enviar al departamento correspondiente del Plan México.</Text>
    <View style={s.card}>
      <Info icon="⌖" label="Ubicación" value={draft.address || 'No especificada'} />
      <Info icon="♧" label="Descripción" value={draft.description || 'Sin descripción'} />
      <Info icon="♙" label="Propuesta ciudadana" value={draft.proposal || 'Sin propuesta'} />
      <Info icon="✦" label="Generado con IA" value={draft.proposal ? 'Sí' : 'No'} />
    </View>
    <View style={[s.card, { backgroundColor: '#f3f7ff' }]}>
      <Text style={s.cardTitle}>Costo estimado (referencial)</Text>
      <Text style={{ color: '#243b75', fontSize: 27, fontWeight: '800' }}>{draft.estimatedCost ? `$${draft.estimatedCost.toLocaleString('es-MX')} MXN` : 'Pendiente de estimar'}</Text>
      <Text style={[s.body, { marginTop: 10 }]}>15 luminarias LED          $30,000{'\n'}Instalación                         $8,000{'\n'}Material eléctrico                 $4,000</Text>
    </View>
  </FlowScreen>;
}

function Info({ icon, label, value }: { icon: string; label: string; value: string }) {
  return <View style={s.row}><Text style={s.rowIcon}>{icon}</Text><Text style={s.rowText}><Text style={{ fontWeight: '800' }}>{label}{'\n'}</Text>{value}</Text></View>;
}
