import { useRouter } from 'expo-router';
import { Alert, Pressable, Text, View } from 'react-native';
import { FlowScreen, flowStyles as s } from '@/components/flow-screen';
import { useAppData } from '@/context/app-data';

export default function AssistantScreen() {
  const router = useRouter();
  const { draft, updateDraft, submitReport } = useAppData();
  const generatedProposal = `Atender la problemática de ${draft.title || 'la zona reportada'} mediante una solución prioritaria y durable. Se recomienda intervenir el punto señalado y dar seguimiento desde presidencia.`;
  const generateProposal = () => {
    updateDraft({ proposal: generatedProposal, estimatedCost: 42000 });
    router.push('/summary');
  };
  const sendWithoutProposal = async () => {
    try { await submitReport(); router.replace('/my-report'); } catch (error) { Alert.alert('No se pudo enviar', error instanceof Error ? error.message : 'Revisa la configuración de Supabase.'); }
  };
  return <FlowScreen title="Asistente de IA" icon="✦" action="Generar propuesta con IA" onAction={generateProposal} secondaryAction="Enviar sin propuesta" onSecondaryAction={sendWithoutProposal}>
    <View style={{ backgroundColor: '#eef0ff', borderRadius: 12, padding: 18, marginBottom: 18 }}><Text style={s.body}>Te ayudo a generar una propuesta para tu reporte. Puedes escribir tu idea o dejar que la IA te sugiera una.</Text></View>
    <Pressable style={s.card} onPress={() => router.push('/summary')}><Text style={s.cardTitle}>◈  Generar propuesta con IA</Text><Text style={s.body}>Recomendado  ›</Text></Pressable>
    <Text style={[s.title, { fontSize: 16, marginTop: 14 }]}>La IA ha generado una propuesta</Text>
    <View style={s.card}><Text style={s.body}>{generatedProposal}</Text></View>
  </FlowScreen>;
}
