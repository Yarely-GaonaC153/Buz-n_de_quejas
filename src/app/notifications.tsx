import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { FlowScreen, flowStyles as s } from '@/components/flow-screen';

export default function NotificationsScreen() {
  const router = useRouter();
  return <FlowScreen title="Notificaciones" action="Volver al inicio" onAction={() => router.replace('/explore')}>
    <Text style={s.title}>Actualizaciones</Text>
    <Notification title="Tu reporte fue recibido" detail="Falla en alumbrado público · Hace 2 horas" />
    <Notification title="Tu reporte está en revisión" detail="El departamento correspondiente ya fue notificado." />
    <Notification title="Nuevo proyecto en tu colonia" detail="Participa en la propuesta de luminarias LED." />
  </FlowScreen>;
}

function Notification({ title, detail }: { title: string; detail: string }) { return <View style={s.card}><Text style={s.cardTitle}>●  {title}</Text><Text style={s.body}>{detail}</Text></View>; }
