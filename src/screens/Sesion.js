import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import Input from '../components/Inputs/Input';
import InputEmail from '../components/Inputs/InputEmail';
import Buttons from '../components/Buttons/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Constantes from '../utils/constantes';
import { useFocusEffect } from '@react-navigation/native';

export default function Sesion({ navigation }) {
  const ip = Constantes.IP;

  const [isContra, setIsContra] = useState(true);
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      validarSesion(); 
    }, [])
  );

  const validarSesion = async () => {
    try {
      const response = await fetch(`${ip}/HERMESPEED/api/servicios/publico/cliente.php?action=getUser`, {
        method: 'GET'
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Expected JSON, but received: ${text}`);
      }

      const data = await response.json();

      if (data.status === 1) {
        navigation.navigate('TabNavigator');
        console.log("Se ingresa con la sesión activa");
      } else {
        console.log("No hay sesión activa");
        return;
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al validar la sesión');
    }
  };

  const cerrarSesion = async () => {
    try {
      const response = await fetch(`${ip}/HERMESPEED/api/servicios/publico/cliente.php?action=logOut`, {
        method: 'GET'
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Expected JSON, but received: ${text}`);
      }

      const data = await response.json();

      if (data.status) {
        console.log("Sesión Finalizada");
      } else {
        console.log('No se pudo eliminar la sesión');
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al cerrar sesión');
    }
  };

  const handlerLogin = async () => {
    if (!usuario || !contrasenia) {
      Alert.alert('Error', 'Por favor ingrese su correo y contraseña');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('correo', usuario);
      formData.append('clave', contrasenia);

      const response = await fetch(`${ip}/HERMESPEED/api/servicios/publico/cliente.php?action=logIn`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.status) {
        setContrasenia('');
        setUsuario('');
        navigation.navigate('TabNavigator');
      } else {
        console.log(data);
        Alert.alert('Error sesión', data.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
    }
  };

  const irRegistrar = async () => {
    navigation.navigate('SignUp');
  };
  const irHome = async () => {
    navigation.navigate('Home');
  };

  useEffect(() => { validarSesion(); }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../img/snacker_shoe.png')}
        style={styles.image}
      />
      <Text style={styles.titulo}>Bienvenido</Text>
      <Text style={styles.subtitulo}>Ingresa tus datos</Text>
      <View style={styles.inputEmail}>
      <MaterialCommunityIcons name="email-outline" size={35} color="#ACACAD" style={styles.icon} />
        <TextInput
          placeholder='correo electrónico'
          placeholderTextColor="#ACACAD"
          style={styles.textinput}
          value={usuario}
          keyboardType='email-address'
          onChangeText={setUsuario}
        />
      </View>
      <View style={styles.inputPassword}>
        <Icon name="lock" size={35} color="#ACACAD" style={styles.icon} />
        <TextInput
          placeholder='contraseña'
          placeholderTextColor="#ACACAD"
          style={styles.textinput}
          value={contrasenia}
          onChangeText={setContrasenia}
          secureTextEntry={isContra}
        />
      </View>
      <Buttons
        textoBoton='Iniciar Sesión'
        accionBoton={handlerLogin} />
      <TouchableOpacity onPress={irRegistrar}><Text style={styles.textRegistrar}>¿No tienes cuenta?
      <Text style={styles.textRegistrarA}> Crea una nueva cuenta</Text>
      </Text>
      </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1F21',
    alignItems: 'center',
  },
  titulo: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 35,
  },
  subtitulo: {
    color: '#FFBE00',
    fontSize: 20,
    marginBottom: 40,
  },
  textRegistrar: {
    color: '#ffffff',
    fontSize: 17,
    marginTop: 10,
  },
  textRegistrarA: {
    color: '#FFBE00',
    fontSize: 17,
    marginTop: 10,
  },
  image: {
    width: 140,
    height: 65,
    marginBottom: 5,
    marginTop: 70,
  },
  inputEmail: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFBE00',
    padding: 5,
    width: '80%',
    marginTop: 45,
    paddingStart: 5,
    borderRadius: 4,
  },
  inputPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFBE00',
    padding: 5,
    width: '80%',
    marginTop: 45,
    paddingStart: 11,
    borderRadius: 4,
  },
  icon: {
    marginRight: 15,
  },
  textinput: {
    flex: 1,
    justifyContent: 'center',
    color: '#ffffff',
    fontWeight: 'bold', 
  },
  
});
