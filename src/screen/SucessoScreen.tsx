import React from 'react';
import { View, Text, Button, StyleSheet, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function SucessoScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    'Rubik-SemiBold': require('../../assets/fonts/Rubik-SemiBold.ttf'),
    'Rubik-Bold': require('../../assets/fonts/Rubik-Bold.ttf'),
  });
  
  return (
    <LinearGradient colors={['#79DDF3', '#5E845F']} style={styles.container}>
       <View style={styles.innerContainer}>
          <View style={styles.header}>
             <View style={styles.iconCircle}>
                <Image source={require('../../assets/Logo_Saude.png')} style={styles.logo}/>
              </View>
              <Text style={styles.title}>AGENDAMENTO DE CONSULTAS</Text>
          </View>
       </View>

       <View style={styles.card}>
          <View style={styles.containerText}>
             <Text style={styles.text}>Agendamento da consulta realizado com sucesso!</Text>
          </View>
       </View>

      <View style={styles.button}>
        <Button title="Voltar"  onPress={() => navigation.goBack()} color={'#246536'} ></Button>
      </View>
       
    </LinearGradient>

  );
}

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
    marginBottom: 560,
    marginLeft: 6
  },

  containerText: {
    width: 365,
    height: 300,
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden', // Isso faz o conteúdo respeitar o border radius
  },

  text:{
      textAlign: 'center',
      color:'#0E5ED6',
      fontSize: 26,
      fontWeight: 600,
      marginTop: 90,
      fontFamily: 'Rubik-Bold'
  },

   button:{
    width: 115,
    height: 31,
    marginLeft: 140,
    position: 'relative',
    bottom: 185,
    borderRadius: 32,
    overflow: 'hidden',
   },
});