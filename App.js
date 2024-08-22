// Hooks de React
import { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
// Utilidades de React Navigation
import { NavigationContainer } from '@react-navigation/native'; // Importa el contenedor de navegación
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Importa el creador de stack navigator

import Sesion from './src/screens/Sesion.js'; // Importa la pantalla de Sesión
import SignUp from './src/screens/SignUp.js'; // Importa la pantalla de Registro
import RevisarEmail from './src/screens/RevisarEmail.js'
import TabNavigator from './src/tabNavigator/tabNavigator.js'; // Importa el navegador de pestañas
import Home from './src/screens/Home.js';
import CarruselScreen from './src/screens/CarruselScreen.js';
import DetalleProducto from './src/screens/DetalleProducto.js';
import EditPersonalInfo from './src/screens/editrProfile.js';
import Profile from './src/screens/Profile.js';

//librerias para el splash screen

import 'intl-pluralrules';

export default function App() {

  const Stack = createNativeStackNavigator(); // Crea una instancia del stack navigator
  const [appIsReady, setAppIsReady] = useState(false);
  const [logueado, setLogueado] = useState(false);

   
  // URL de la API para el usuario
  const USER_API = "servicios/publico/cliente.php";

  // Función que ayuda a verificar si existe previamente una sesión abierta
  const verifyLogged = async () => {
    try {
      const data = await fetchData(USER_API, 'getUser');
      if (data.session) {
        console.log(data);
        setLogueado(true);
        //navigation.navigate("Home");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function inicia() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 4000));
        await verifyLogged();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    inicia();
  }, []);

  if (!appIsReady) {
    return (
      <View style={styles.container}>
        <Image
          source={require('./assets/HGLogo.gif')}
          onLoadEnd={async () => {
            await SplashScreen.hideAsync();
          }}
          style={styles.gif}
        />
      </View>
    );
  }


  return (
    <NavigationContainer> 
      <Stack.Navigator
        initialRouteName='Sesion' // Establece 'Sesion' como la ruta inicial
        screenOptions={{
          headerShown: false // Oculta el header por defecto
        }}>
        <Stack.Screen name="Sesion" component={Sesion} /> 
        <Stack.Screen name="SignUp" component={SignUp} /> 
        <Stack.Screen name="TabNavigator" component={TabNavigator} /> 
        <Stack.Screen name="Home" component={Home} /> 
        <Stack.Screen name="REmail" component={RevisarEmail} /> 
        <Stack.Screen name="CarruselScreen" component={CarruselScreen} /> 
        <Stack.Screen name="DetalleProducto" component={DetalleProducto} /> 
        <Stack.Screen name="editProfile" component={EditPersonalInfo}/>
        <Stack.Screen name="Profile" component={Profile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  gif: {
    width: 200,
    height: 200,
  },
});