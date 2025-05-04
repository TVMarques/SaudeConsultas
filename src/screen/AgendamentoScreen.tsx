import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import  HorarioSelector  from '../components/SeletorDeTempo';
import { CalendarSelector } from '../components/SeletorCalendario';
import { color } from 'react-native-elements/dist/helpers';
import * as FileSystem from 'expo-file-system';

export default function AgendamentoScreen({ navigation }) {
  const [especialidade, setEspecialidade] = useState('');
  const [local, setLocal] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [fontsLoaded] = useFonts({
    'Rubik-SemiBold': require('../../assets/fonts/Rubik-SemiBold.ttf'),
    'Rubik-Bold': require('../../assets/fonts/Rubik-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading/>; // ou qualquer componente de loading
  }

  //Para salvar os dados\\
  const salvarAgendamento = async () => {
    if (especialidade && local && data && hora) {
      const conteudo = `Agendamento:
        Especialidade: ${especialidade}
        Local: ${local}
        Data: ${data}
        Hora: ${hora}
      `;
  
      // Caminho para a pasta 'txt' dentro do diretório de documentos
      const pasta = FileSystem.documentDirectory + 'txt/';
  
      try {
        // Verifica se a pasta 'txt' existe, caso contrário, cria ela
        const pastaExiste = await FileSystem.getInfoAsync(pasta);
        if (!pastaExiste.exists) {
          await FileSystem.makeDirectoryAsync(pasta);  // Cria a pasta se não existir
        }
  
        // Define o caminho completo para o arquivo 'agendamento.txt'
        const caminhoArquivo = pasta + 'agendamento.txt';
        
        // Salva o conteúdo no arquivo de texto
        await FileSystem.writeAsStringAsync(caminhoArquivo, conteudo);
  
        // Após salvar, navega para a tela 'Sucesso'
        navigation.navigate('Sucesso');
      } catch (erro) {
        // Exibe mensagem de erro se algo der errado
        console.error('Erro ao salvar agendamento:', erro);
        alert('Ocorreu um erro ao salvar o agendamento. Por favor, tente novamente.');
      }
    } else {
      alert('Por favor, preencha todos os campos antes de salvar.');
    }
  };


  return (
    <LinearGradient colors={['#79DDF3', '#5E845F']} style={styles.container}>
      <View style={styles.innerContainer}>

        {/* Título com fundo azul e texto branco */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Image source={require('../../assets/Logo_Saude.png')} style={styles.logo}/>
          </View>
          <Text style={styles.title}>AGENDAMENTO DE CONSULTAS</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Especialidade</Text>
          <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={(value) =>{
                  if (value === 'Selecione a especialidade') {
                    setEspecialidade(null); // Limpa o valor
                  } else {
                    setEspecialidade(value); // Atualiza com a especialidade escolhida
                  }
                }}
                items={[
                  { label: '', value: 'Selecione a especialidade' },
                  { label: 'Cardiologia', value: 'Cardiologia' },
                  { label: 'Oftalmologia', value: 'Oftalmologia' }

                ]}
                value={especialidade}
                placeholder={{}} 
                style={{
                  inputAndroid: styles.pickerInput,
                  inputIOS: styles.pickerInput,
                  iconContainer: {
                    top: Platform.OS === 'ios' ? 8 : 2,
                    right: 5,
                  },
                }}
                useNativeAndroidPickerStyle={false}
                Icon={() => (
                  <View style={styles.iconCircle2}>
                    <Icon name="arrow-drop-down" size={22} color="#246536" />
                  </View>
                )}
              />
          </View>
        </View>

        <View style={styles.card}>
            <Text style={styles.label}>Escolha a Unidade</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                  onValueChange={(value) =>{
                    if (value === 'Selecione o local') {
                      setLocal(null); // Limpa o valor
                    } else {
                      setLocal(value); // Atualiza com o local escolhida
                    }
                    }}
                  items={[
                    { label: '', value: 'Selecione o local' },
                    { label: 'Hospital Geral', value: 'Hospital Geral' },
                    { label: 'Clínica Geral', value: 'Clínica Geral' }
                  ]}
                  value={local}
                  placeholder={{  }}
                  style={{
                    inputAndroid: styles.pickerInput,
                    iconContainer: {
                      top: Platform.OS === 'ios' ? 8 : 2,
                      right: 5,
                    },
                  }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => (
                    <View style={styles.iconCircle2}>
                      <Icon name="arrow-drop-down" size={22} color="#246536" />
                    </View>
                  )}
              />
            </View>
        </View> 

        <View style={[styles.card, styles.data]}>
          <Text style={styles.label}>Data</Text>
          <CalendarSelector
            selectedDate={data}
            onDateChange={setData}
          />
        </View>

        <View style={styles.horario}>
          <View style={styles.card}>
            <Text style={styles.label}>Horário de Consulta</Text>
            <View style={styles.pickerContainer}>

              <HorarioSelector
                    selectedDate={data} 
                    horaSelecionada={hora}
                    setHoraSelecionada={setHora}
              />
            </View>    
          </View>
        </View>

        {/* Botões */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.goBack()}>
            <Text style={styles.btnText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnAgendar}
            onPress={salvarAgendamento}
            disabled={!especialidade || !local || !data || !hora}
          >
            <Text style={styles.btnText}>Agendar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}


//ESTILOS\\
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 10,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 55
  },
  header: {
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // sombra no Android
    shadowColor: '#000', // sombra no iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    marginRight: 10
  },
  
  logo: {
    width: 50,
    height: 60,
    resizeMode: 'contain',
  },
 
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#246536',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 14,
  },

  card: {
    backgroundColor: '#0E5ED6',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 2,
    width: 370,
    height: 24,
    marginBottom: 20,
    marginTop: 16
  },
  
  label: {
    marginTop: 1,
    marginLeft: 4,
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  
  pickerContainer: {
    width: 365,
    height: 28,
    backgroundColor: '#f6f6f6',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden', // Isso faz o conteúdo respeitar o border radius
  },
  
  pickerInput: {
    fontSize: 19,
    color: '#0E5ED6',
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    fontFamily: 'Rubik-SemiBold',
    marginTop:  Platform.OS === 'ios' ? 0 : -10,
    marginBottom: Platform.OS === 'ios' ? 0 : -12,
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
  },

  data: {
    marginTop:14
  },

  calendar: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginTop: 2,
    height: 310,
  },

  horario:{
    position:'relative',
    top: 305
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 100,
    position: 'relative',
    top: 320
  },

  btnVoltar: {
    backgroundColor: '#246536',
    padding: 2,
    borderRadius: 12,
    width: 120,
    height: 24,
    alignItems: 'center',
  },
  btnAgendar: {
    backgroundColor: '#246536',
    padding: 2,
    borderRadius: 12,
    width: 120,
    height: 24,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  }

});