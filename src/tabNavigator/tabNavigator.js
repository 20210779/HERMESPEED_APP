import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// Importa tus componentes de pantalla aquí
import Productos from '../screens/Producto';
import Home from '../screens/Home';
import Carrito from '../screens/Carrito';
import Profile from '../screens/Profile';
import CarruselScreen from '../screens/CarruselScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (

<Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarShowLabel: false, 
            headerShown: false, // Oculta el header
            tabBarActiveTintColor: 'black', // Color de los íconos activos
            tabBarInactiveTintColor: '#4F3F02', // Color de los íconos inactivos
            tabBarStyle: { backgroundColor: '#FFBE00', 
              height: Platform.OS === 'ios' ? 80 : 60, // Estilo de la barra de pestañas, altura diferente para iOS y Android
           borderTopWidth: 0 }, // Estilo de la barra de pestañas
            tabBarIcon: ({ focused, color, size }) => { // Función que define el ícono de la pestaña
              let iconName;
              if (route.name === 'Home') {
                iconName = 'home' ;
              } else if (route.name === 'Productos') {
                iconName = 'search1';
              } else if (route.name === 'Carrito') {
                iconName = 'shoppingcart';
              }
              else if (route.name === 'CarruselScreen') {
                iconName = 'car';
              }
              else if (route.name === 'Profile') {
                iconName = 'user';
              }
              return <AntDesign name={iconName} size={size} color={color} />;
            },
          })}
        >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen
        name="Productos"
        component={Productos}
        options={{ title: 'Productos' }}
      />
      <Tab.Screen
        name="Carrito"
        component={Carrito}
        options={{ title: 'Carrito' }}
      />
      <Tab.Screen
        name="CarruselScreen"
        component={CarruselScreen}
        options={{ title: 'CarruselScreen' }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
    );
};

export default TabNavigator;
