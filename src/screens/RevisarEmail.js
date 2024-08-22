import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Buttons from "../components/Buttons/Button";
import * as Constantes from "../utils/constantes";

const PasswordResetRequestScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();  // Hook para la navegación
  const ip = Constantes.IP;
  const handlePasswordResetRequest = async () => {
    if (email.trim() === "") {
      Alert.alert("Error", "Por favor, ingrese un correo electrónico válido.");
      return;
    }
  

    try {
      // URL de la API para restablecer contraseña
      const url = `${ip}/HERMESPEED/api/servicios/publico/userservice.php?action=requestReset`;
  
      // Creación del cuerpo de la petición
      const body = JSON.stringify({
        correo: email, // Este debe ser el campo esperado por tu API
      });
  
      // Configuración de la solicitud
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        // Si la respuesta es exitosa
        Alert.alert("Éxito", "Se ha enviado un enlace de restablecimiento a su correo electrónico.");
        navigation.navigate("Login"); // Redirige a la pantalla de inicio de sesión u otra según sea necesario
      } else {
        // Si hay algún error con la solicitud
        Alert.alert("Error", responseData.message || "Hubo un problema al intentar restablecer la contraseña.");
      }
    } catch (error) {
      // Manejo de errores de red u otros problemas
      Alert.alert("Error", "No se pudo conectar con el servidor. Por favor, intente nuevamente más tarde.");
      console.log(error);
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>Olvidaste tu contraseña</Text>
      <Text style={styles.subtitle}>Coloca tu correo electrónico para resetear tu contraseña.</Text>
      
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="correo electrónico"
          placeholderTextColor="#A9A9A9"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <Buttons textoBoton="Enviar" accionBoton={handlePasswordResetRequest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1F21",
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 35,
    marginTop: 100,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FFC107',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PasswordResetRequestScreen;
