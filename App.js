import { NavigationContainer } from '@react-navigation/native'; // Importa el contenedor de navegación
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Importa el creador de stack navigator

import Sesion from './src/screens/Sesion.js'; // Importa la pantalla de Sesión
import SignUp from './src/screens/SignUp.js'; // Importa la pantalla de Registro

import TabNavigator from './src/tabNavigator/tabNavigator.js'; // Importa el navegador de pestañas
import Home from './src/screens/Home.js';
import DetalleProducto from './src/screens/DetalleProducto.js';
import EditPersonalInfo from './src/screens/editrProfile.js';

export default function App() {

  const Stack = createNativeStackNavigator(); // Crea una instancia del stack navigator

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
        <Stack.Screen name="DetalleProducto" component={DetalleProducto} /> 
        <Stack.Screen name="editProfile" component={EditPersonalInfo}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}