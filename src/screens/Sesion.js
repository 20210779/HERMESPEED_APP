import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import Input from "../components/Inputs/Input";
import InputEmail from "../components/Inputs/InputEmail";
import Buttons from "../components/Buttons/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Constantes from "../utils/constantes";
import fetchData from "../utils/fetchData";
import { useFocusEffect } from "@react-navigation/native";

export default function Sesion({ navigation }) {
  const ip = Constantes.IP;

  const [isContra, setIsContra] = useState(true);
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  // URL de la API para el usuario
  const USER_API = "servicios/publico/cliente.php";

  // Función que ayuda a verificar si existe previamente una sesión abierta
  const verifyLogged = async () => {
    try {
      const data = await fetchData(USER_API, "getUser");
      if (data.session) {
        console.log(data);
        navigation.navigate("TabNavigator");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Función para el manejo del inicio de sesión
  const handleLogin = async () => {
    if (usuario === "" || contrasenia === "") {
      Alert.alert("Error", "Por favor, complete todos los campos");
    } else {
      try {
        // Creación del formulario para la petición
        const formData = new FormData();
        formData.append("correo", usuario);
        formData.append("clave", contrasenia);
        // Petición para iniciar sesión.
        const responseData = await fetchData(USER_API, "logIn", formData);

        if (responseData.status) {
          Alert.alert(responseData.message);
          setTimeout(() => {
            navigation.navigate("TabNavigator");
            verifyLogged();
          }, 1500);
        } else {
          Alert.alert("Error", responseData.error);
          console.log(responseData.error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const irRegistrar = async () => {
    navigation.navigate("SignUp");
  };
  const irHome = async () => {
    navigation.navigate("Profile");
  };

  const irEmail = async () => {
    navigation.navigate("REmail");
  };

  useEffect(() => {
    verifyLogged();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../img/snacker_shoe.png")} style={styles.image} />
      <Text style={styles.titulo}>Bienvenido</Text>
      <Text style={styles.subtitulo}>Ingresa tus datos</Text>
      <View style={styles.inputEmail}>
        <MaterialCommunityIcons
          name="email-outline"
          size={35}
          color="#ACACAD"
          style={styles.icon}
        />
        <TextInput
          placeholder="correo electrónico"
          placeholderTextColor="#ACACAD"
          style={styles.textinput}
          value={usuario}
          keyboardType="email-address"
          onChangeText={setUsuario}
        />
      </View>
      <View style={styles.inputPassword}>
        <Icon name="lock" size={35} color="#ACACAD" style={styles.icon} />
        <TextInput
          placeholder="contraseña"
          placeholderTextColor="#ACACAD"
          style={styles.textinput}
          value={contrasenia}
          onChangeText={setContrasenia}
          secureTextEntry={isContra}
        />
      </View>
      <TouchableOpacity onPress={irEmail} style={styles.textContainer}>
  <Text style={styles.textEmail}>Restablecer contraseña</Text>
</TouchableOpacity>

      <Buttons textoBoton="Iniciar Sesión" accionBoton={handleLogin} />
      <TouchableOpacity onPress={irRegistrar}>
        <Text style={styles.textRegistrar}>
          ¿No tienes cuenta?
          <Text style={styles.textRegistrarA}> Crea una nueva cuenta</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1F21",
    alignItems: "center",
  },
  titulo: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 35,
  },
  subtitulo: {
    color: "#FFBE00",
    fontSize: 20,
    marginBottom: 40,
  },
  textRegistrar: {
    color: "#ffffff",
    fontSize: 17,
    marginTop: 10,
  },
  textRegistrarA: {
    color: "#FFBE00",
    fontSize: 17,
    marginTop: 10,
  },
  textContainer: {
    width: "80%", // Para que el contenedor abarque el 80% del ancho de la pantalla
    alignItems: 'flex-start', // Alinear el contenido del contenedor a la izquierda
  },
  textEmail: {
    color: "#ADACAC",
    fontSize: 13,
    fontWeight: '600',
    marginTop: 10,
  },
  image: {
    width: 140,
    height: 65,
    marginBottom: 5,
    marginTop: 70,
  },
  inputEmail: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#FFBE00",
    padding: 5,
    width: "80%",
    marginTop: 45,
    paddingStart: 5,
    borderRadius: 4,
  },
  inputPassword: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#FFBE00",
    padding: 5,
    width: "80%",
    marginTop: 45,
    paddingStart: 11,
    borderRadius: 4,
  },
  icon: {
    marginRight: 15,
  },
  textinput: {
    flex: 1,
    justifyContent: "center",
    color: "#ffffff",
    fontWeight: "bold",
  },
});
