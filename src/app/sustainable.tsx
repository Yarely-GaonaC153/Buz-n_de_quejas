import { Alert, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppData } from '@/context/app-data';
import { FlowScreen, flowStyles as s } from '@/components/flow-screen';

export default function SustainableScreen() {
  const router = useRouter();
  const { submitReport } = useAppData();
  const finish = async () => { try { await submitReport(); router.replace('/my-report'); } catch (error) { Alert.alert('No se pudo enviar', error instanceof Error ? error.message : 'Revisa la configuración de Supabase.'); } };
  return <FlowScreen title="Recomendación sustentable" icon="◒" action="Enviar propuesta a presidencia" onAction={finish}>
    <View style={{ backgroundColor: '#effaf0', borderRadius: 12, padding: 18, marginBottom: 18 }}><Text style={s.cardTitle}>Opción recomendada: Luminarias LED</Text><Text style={s.body}>Con consumo al alcance de 800 hogares</Text><Text style={{ color: '#4f8f61', fontWeight: '800', marginTop: 10 }}>Más eficiente y ecológica</Text></View>
    <Text style={s.title}>¿Por qué?</Text>
    <Text style={[s.body, { marginBottom: 18 }]}>✓ Consume hasta 60% menos energía que las luminarias tradicionales.{ '\n\n' }✓ Tiene una vida útil de 50,000 horas.{ '\n\n' }✓ Reduce emisiones de CO₂.{ '\n\n' }✓ Disminuye costos de mantenimiento a largo plazo.</Text>
    <View style={{ backgroundColor: '#effaf0', borderRadius: 12, padding: 18 }}><Text style={s.body}>Esta alternativa contribuye al cuidado del medio ambiente y al uso responsable de los recursos.</Text></View>
  </FlowScreen>;
}
