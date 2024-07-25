import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Platform, StyleSheet, View } from 'react-native';
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
    <View style={styles.tabContainer}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          headerShown: false, // Oculta el header
          tabBarActiveTintColor: 'black', // Color de los íconos activos
          tabBarInactiveTintColor: '#4F3F02', // Color de los íconos inactivos
          tabBarStyle: styles.tabBar, // Estilo de la barra de pestañas
          tabBarIcon: ({ focused, color, size }) => { // Función que define el ícono de la pestaña
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Productos') {
              iconName = 'search1';
            } else if (route.name === 'Carrito') {
              iconName = 'shoppingcart';
            } else if (route.name === 'CarruselScreen') {
              iconName = 'car';
            } else if (route.name === 'Profile') {
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
          name="Profile"
          component={Profile}
          options={{ title: 'Profile' }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    
  },
  tabBar: {
    backgroundColor: '#FFBE00',
    height: Platform.OS === 'ios' ? 80 : 60,
    borderTopWidth: 0,
    borderTopLeftRadius: 25, // Bordes redondeados en los costados de arriba
    borderTopRightRadius: 25,
    overflow: 'hidden', // Asegura que el contenido de la barra de pestañas se ajuste a los bordes redondeados
    position: 'absolute',
  },
});

export default TabNavigator;
