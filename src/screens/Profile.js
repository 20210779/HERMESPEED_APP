import React from 'react';
import { StyleSheet, Text, View, Image,Alert, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import Buttons from '../components/Buttons/Button';
import * as Constantes from '../utils/constantes';
import Constants from 'expo-constants';

export default function Profile({navigation}) {
  const ip = Constantes.IP;
  const [correo, setCorreo] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [dataUsuario, setDataUsuario] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${ip}/HERMESPEED/api/servicios/publico/cliente.php?action=logOut`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        navigation.navigate('Sesion');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión: ' + error);
    }
  };

  const getUser = async () => {
    try {
      const response = await fetch(`${ip}/HERMESPEED/api/servicios/publico/cliente.php?action=readProfile`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        setDataUsuario(data.dataset)
      } else {
        console.log(data);
        // Alert the user about the error
        Alert.alert('Error del usuario', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'No hay ningun correo para mostrar');
    }
  };


  useEffect(() => {
    getUser();
  }, []);


  // Función para manejar el logout
  const handleEditProfile = async () => {
    navigation.navigate("editProfile");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
        <TouchableOpacity>
          <MaterialIcons name="settings" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://example.com/profile-image-url' }} // replace with your image URL
          style={styles.profileImage}
        />
        <Text style={styles.name}>{dataUsuario.nombre_cliente}</Text>
        <Text style={styles.email}>{dataUsuario.correo_cliente}</Text>
        <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.menuContainer}>
        <MenuItem icon="heart-broken" text="Mis favoritos" />    
        <MenuItem icon="language" text="Lenguaje" />
        <MenuItem icon="location-pin" text="Ubicacion" />
        <MenuItem icon="history" text="Mirar historial" />
        <Buttons
        textoBoton='Cerrar Sesión'
        accionBoton={handleLogout}
      />
      </ScrollView>
      <Text style={styles.versionText}>App version 003</Text>
    </View>
  );
}

const MenuItem = ({ icon, text, color = "##FFFFFF" }) => (
  <TouchableOpacity style={styles.menuItem}>
    <MaterialIcons name={icon} size={24} color={color} />
    <Text style={styles.menuItemText}>{text}</Text>
    <MaterialIcons name="chevron-right" size={24} color="#E6E6E6" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD52B',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    textShadowColor:'#FFF',
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  editProfileButton: {
    backgroundColor: '#28A745',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  editProfileButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  menuItemText: {
    flex: 1,
    marginLeft: 20,
    fontSize: 16,
  },
  versionText: {
    textAlign: 'center',
    color: '#ACACAD',
    marginTop: 20,
  },
});

