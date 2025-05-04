import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AgendamentoScreen from '../screen/AgendamentoScreen';
import SucessoScreen from '../screen/SucessoScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Agendamento">
      <Stack.Screen name="Agendamento" 
      component={AgendamentoScreen} 
      options={{ headerShown: false }}
      />
      <Stack.Screen name="Sucesso" 
      component={SucessoScreen}
      options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}