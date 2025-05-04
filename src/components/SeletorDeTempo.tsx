import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const horariosDisponiveis = [
  '08:00', '09:00', '09:30', '10:00', '11:00',
  '13:00', '13:30', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30' 
];


const horariosIndisponiveis = ['08:30', '09:30', '11:30', '15:00', '17:00'];

type Props = {
  selectedDate: string;
  horaSelecionada: string;
  setHoraSelecionada: (hora: string) => void;
};

export default function HorarioSelector({ horaSelecionada, setHoraSelecionada , selectedDate }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [fontsLoaded] = useFonts({
      'Rubik-SemiBold': require('../../assets/fonts/Rubik-SemiBold.ttf'),
      'Rubik-Bold': require('../../assets/fonts/Rubik-Bold.ttf'),
    });

    if (!fontsLoaded) {
      return <AppLoading/>; // ou qualquer componente de loading
    }
  
    const selecionarHorario = (horario) => {
      const agora = new Date();
      const hojeString = agora.toISOString().split('T')[0];
      const ehHoje = selectedDate === hojeString;
      const horaCompleta = new Date(selectedDate + 'T' + horario + ':00');
      const horarioPassado = ehHoje && horaCompleta <= agora;
    
      const indisponivel = horariosIndisponiveis.includes(horario) || horarioPassado;

      if (!indisponivel) {
        setHoraSelecionada(horario);
        setModalVisible(false);
      }

      /*if (!horariosIndisponiveis.includes(horario)) {
        setHoraSelecionada(horario);
        setModalVisible(false);
      }*///
    };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selectorBox} onPress={() => setModalVisible(true)} disabled={!selectedDate}>
        <Text style={styles.textoHorario}>
          {horaSelecionada || ''}
        </Text>
        <View style={styles.iconCircle2}>
          <Icon name="arrow-drop-down" size={22} color="#246536" />
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={horariosDisponiveis}
              keyExtractor={(item) => item}
              numColumns={4}
              columnWrapperStyle={{ justifyContent: 'space-around', marginBottom: 10 }} //Organiza as linhas
              renderItem={({ item }) => {
               // const indisponivel = horariosIndisponiveis.includes(item);////

                const agora = new Date();
                const hojeString = agora.toISOString().split('T')[0]; // Formato YYYY-MM-DD
                const ehHoje = selectedDate === hojeString;

                let horaCompleta = new Date(selectedDate + 'T' + item + ':00'); // Cria o Date exato do horário

                const horarioPassado = ehHoje && horaCompleta <= agora;
                const indisponivel = horariosIndisponiveis.includes(item) || horarioPassado;
                return (
                  <TouchableOpacity
                    style={[styles.horarioBotao, indisponivel && styles.horarioIndisponivel]}
                    onPress={() => selecionarHorario(item)}
                    disabled={indisponivel}
                  >
                    <Text style={[styles.horarioTexto, indisponivel && styles.horarioTextoIndisponivel]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              
            />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: '#246536', marginTop: 10 }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  marginVertical: 1,
  height: 90,
},
selectorBox: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: 'transparent',
  borderRadius: 8,
  padding: 9,
  backgroundColor: '#fff',
},
textoHorario: {
  fontSize: 18,
  fontFamily: 'Rubik-SemiBold',
  color: '#0E5ED6',
  position: 'relative',
  bottom: 12
},
iconCircle2: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#246536',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    position: 'relative',
    bottom: 12,
    left: 6
},
modalOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
},
modalContent: {
  backgroundColor: '#fff',
  borderWidth: 2,
  borderColor: 'blue',
  padding: 20,
  borderRadius: 10,
  width: '95%',
  height: '30%',
  alignItems: 'center',
},
horarioBotao: {
  backgroundColor: '#0E5ED6',
  paddingVertical: 8,
  paddingHorizontal: 12,
  margin: 6,
  borderRadius: 50,
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 60,
},
horarioTexto: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#fff',
},

horarioIndisponivel: {
  backgroundColor: '#FF0000', // Vermelho para indisponível
},
horarioTextoIndisponivel: {
  color: '#fff', // Letra branca mesmo no vermelho
},
});