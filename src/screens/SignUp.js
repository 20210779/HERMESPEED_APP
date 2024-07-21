import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import * as Constantes from "../utils/constantes";
import Constants from "expo-constants";
// Import de componentes
import Input from "../components/Inputs/Input";
import InputMultiline from "../components/Inputs/InputMultiline";
import Buttons from "../components/Buttons/Button";
import TwoInput from "../components/Inputs/TwoInput";
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import InputEmail from "../components/Inputs/InputEmail";
import InputEdad from "../components/Inputs/InputEdad";

export default function SignUp({ navigation }) {
  const ip = Constantes.IP;

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [dui, setDui] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [clave, setClave] = useState("");
  const [confirmarClave, setConfirmarClave] = useState("");
  const [edad, setEdad] = useState("");

  // Expresiones regulares para validar DUI y teléfono
  const duiRegex = /^\d{8}-\d$/;
  const telefonoRegex = /^\d{4}-\d{4}$/;

  // Código para mostrar el datetimepicker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);

    // Código para convertir la fecha al formato año-mes-día
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const fechaNueva = `${year}-${month}-${day}`;
    setFechaNacimiento(fechaNueva);

    // Calcular la edad
    const today = new Date();
    let age = today.getFullYear() - year;
    const m = today.getMonth() - currentDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < currentDate.getDate())) {
      age--;
    }
    setEdad(age);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  // Función para manejar la creación de la cuenta
  const handleCreate = async () => {
    try {
      // Calcular la fecha mínima permitida (18 años atrás desde la fecha actual)
      const fechaMinima = new Date();
      fechaMinima.setFullYear(fechaMinima.getFullYear() - 18);

      // Validar los campos
      if (
        !nombre.trim() ||
        !apellido.trim() ||
        !email.trim() ||
        !direccion.trim() ||
        !dui.trim() ||
        !fechaNacimiento.trim() ||
        !telefono.trim() ||
        !clave.trim() ||
        !confirmarClave.trim()||
        !edad.trim()
      ) {
        Alert.alert("Debes llenar todos los campos");
        return;
      } else if (!duiRegex.test(dui)) {
        Alert.alert("El DUI debe tener el formato correcto (########-#)");
        return;
      } else if (edad < 18) {
        Alert.alert("Error", "Debes tener al menos 18 años para registrarte.");
        return;
      } else if (isNaN(edad)) {
        Alert.alert("Error", "La edad debe ser un número válido.");
        return;
      } else if (!telefonoRegex.test(telefono)) {
        Alert.alert("El teléfono debe tener el formato correcto (####-####)");
        return;
      } else if (date > fechaMinima) {
        Alert.alert("Error", "Debes tener al menos 18 años para registrarte.");
        return;
      }
      

      // Si todos los campos son válidos, proceder con la creación del usuario
      const formData = new FormData();
      formData.append("nombreCliente", nombre);
      formData.append("apellidoCliente", apellido);
      formData.append("correoCliente", email);
      formData.append("duiCliente", dui);
      formData.append("telefonoCliente", telefono);
      formData.append("direccionCliente", direccion);
      formData.append("claveCliente", clave);
      formData.append("edadCliente",edad);
      formData.append("nacimientoCliente", fechaNacimiento);
      formData.append("confirmarClave", confirmarClave);


      const response = await fetch(
        `${ip}/HERMESPEED/api/servicios/publico/cliente.php?action=signUpMovil`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.status) {
        Alert.alert("Datos Guardados correctamente");
        navigation.navigate("Sesion");
      } else {
        Alert.alert("Error", data.error);
      }
    } catch (error) {
      Alert.alert("Ocurrió un error al intentar crear el usuario");
    }
  };

  // Función para manejar el logout
  const handleLogout = async () => {
    navigation.navigate("Sesion");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Text style={styles.titulo}>Crea una cuenta</Text>
        <Text style={styles.subtitulo}>Ingresa tus datos</Text>

        <InputEmail
          placeHolder="correo electrónico"
          setValor={email}
          setTextChange={setEmail}
        />
        <Input
          placeHolder="contraseña"
          contra={true}
          setValor={clave}
          setTextChange={setClave}
        />
        <Input
          placeHolder="repetir contraseña"
          contra={true}
          setValor={confirmarClave}
          setTextChange={setConfirmarClave}
        />

        <TwoInput
          leftIconName="user"
          leftPlaceholder="Nombre"
          leftValue={nombre}
          leftOnChangeText={setNombre}
          rightIconName="user"
          rightPlaceholder="Apellido"
          rightValue={apellido}
          rightOnChangeText={setApellido}
        />
        <View style={styles.row}>
          <MaskedInputTelefono telefono={telefono} setTelefono={setTelefono} />
          <MaskedInputDui dui={dui} setDui={setDui} setEditable={true} />
        </View>

        <InputMultiline
          placeHolder="Dirección Cliente"
          setValor={setDireccion}
          valor={direccion}
          setTextChange={setDireccion}
        />

        <View style={styles.contenedorFecha}>
          <MaterialIcons
            name="date-range"
            size={34}
            color="#ACACAD"
            style={styles.icon}
          />
          <TouchableOpacity onPress={showDatepicker}>
            <Text style={styles.fecha}>
              {fechaNacimiento ? fechaNacimiento : "../../../"}
            </Text>
          </TouchableOpacity>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              minimumDate={
                new Date(
                  new Date().getFullYear() - 100,
                  new Date().getMonth(),
                  new Date().getDate()
                )
              } // Fecha mínima permitida (100 años atrás desde la fecha actual)
              maximumDate={new Date()} // Fecha máxima permitida (fecha actual)
              onChange={onChange}
            />
          )}
        </View>
        <InputEdad value={edad} onChangeText={setEdad} />
        <Buttons textoBoton="Registrarse" accionBoton={handleCreate} />
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.textRegistrar}>
            Ya tienes una cuenta?
            <Text style={styles.textRegistrarA}> Inicia sesión</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1F21",
    paddingTop: Constants.statusBarHeight + 5, // el 5 es para darle un pequeño margen cuando hay una cámara en el centro de la pantalla
  },
  scrollViewStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  texto: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
  },
  textRegistrar: {
    color: "#322C2B",
    fontWeight: "700",
    fontSize: 18,
  },
  titulo: {
    marginTop: 35,
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 35,
  },
  subtitulo: {
    color: "#FFBE00",
    fontSize: 20,
  },
  fecha: {
    fontWeight: "600",
    color: "#ACACAD",
    marginLeft: 15,
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
  fechaSeleccionar: {
    fontWeight: "700",
    color: "#322C2B",
    textDecorationLine: "underline",
  },
  contenedorFecha: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#FFBE00",
    padding: 5,
    width: "80%",
    marginTop: 20,
    paddingStart: 5,
    borderRadius: 4,
  },
});
