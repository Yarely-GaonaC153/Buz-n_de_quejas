import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { FlowScreen, flowStyles as s } from '@/components/flow-screen';

export default function ProjectsScreen() {
  const router = useRouter();
  return <FlowScreen title="Proyectos en mi comunidad" action="Proponer un proyecto" onAction={() => router.push('/assistant')}>
    <Text style={s.title}>Proyectos activos</Text>
    <Project title="Luminarias LED en Los Fresnos" detail="15 luminarias propuestas" status="En evaluación" />
    <Project title="Parque vecinal Centro" detail="Mejora de áreas verdes" status="En votación" />
    <Project title="Cruce seguro Col. La Paz" detail="Señalización y accesibilidad" status="Próximamente" />
  </FlowScreen>;
}

function Project({ title, detail, status }: { title: string; detail: string; status: string }) { return <View style={s.card}><Text style={s.cardTitle}>{title}</Text><Text style={s.body}>{detail}</Text><Text style={{ color: '#4f8f61', fontWeight: '800', marginTop: 10 }}>{status}  ›</Text></View>; }
