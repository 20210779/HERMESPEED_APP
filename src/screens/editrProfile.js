import {
  StyleSheet, // Importa la función para crear estilos
  Text, // Componente de texto
  View, // Contenedor
  TextInput, // Campo de entrada de texto
  TouchableOpacity, // Botón que responde a toques
  Alert, // Muestra alertas emergentes
  ScrollView, // Contenedor que permite hacer scroll
} from "react-native";
import { useState, useEffect } from "react"; // Hooks de estado y efecto
import DateTimePicker from "@react-native-community/datetimepicker"; // Selector de fecha y hora
import { MaterialIcons } from "@expo/vector-icons"; // Iconos de Material Design
import * as Constantes from "../utils/constantes"; // Importa constantes definidas en otra parte del proyecto
import Constants from "expo-constants"; // Constantes específicas de Expo, como el alto de la barra de estado

// Import de componentes personalizados para campos de entrada y botones
import Input from "../components/Inputs/Input";
import InputMultiline from "../components/Inputs/InputMultiline";
import Buttons from "../components/Buttons/Button";
import TwoInput from "../components/Inputs/TwoInput";
import MaskedInputTelefono from "../components/Inputs/MaskedInputTelefono";
import MaskedInputDui from "../components/Inputs/MaskedInputDui";
import InputEmail from "../components/Inputs/InputEmail";
import InputEdad from "../components/Inputs/InputEdad";

// Componente principal para la pantalla de registro (SignUp)
export default function SignUp({ navigation }) {
  const ip = Constantes.IP; // Dirección IP desde las constantes

  // Estados para manejar la fecha, su modo (solo fecha o hora), y si se muestra el selector
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  // Estados para almacenar los datos del formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [clave, setClave] = useState("");


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

  const fillData = async () => {
    try {
        const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=editProfile`, {
            method: 'GET'
        });
        const data = await response.json();
        console.log("Data en actualizar consultada", data);
        if (data.status) {
            console.log(data.name, 'Valor de editar perfil')
            setNombre(data.name.nombreCliente);
            setApellido(data.name.apellidoCliente);
            setEmail(data.name.correoCliente);
            setDireccion(data.name.direccionCliente);
            setTelefono(data.name.telefonoCliente);
            setClave(data.name.claveCliente);
        } else {
            Alert.alert('Error', data.error);
        }
    } catch (error) {
        Alert.alert('Ocurrió un error al intentar obtener los datos del usuario');
    }
  };

  // Función para manejar el logout
  const handleLogout = async () => {
    navigation.navigate("Sesion");
  };

  // Si todos los campos son válidos, proceder con la creación del usuario
  const formData = new FormData();
  formData.append('nombreCliente', nombre);
  formData.append('apellidoCliente', apellido);
  // formData.append('correoCliente', email);
  formData.append('direccionCliente', direccion);
  // formData.append('telefonoCliente', telefono);
  
  const editProfile = async () => {
    try {
        console.log("Datos a enviar", nombre, apellido, direccion, clave, telefono)

        // Si todos los campos son válidos, proceder con la creación del usuario
        const formData = new FormData();
        formData.append('nombreCliente', nombre);
        formData.append('apellidoCliente', apellido);
        // formData.append('correoCliente', email);
        formData.append('direccionCliente', direccion);
        formData.append('telefonoCliente', telefono);
        formData.append('claveCliente', clave);
        const response = await fetch(`${ip}/HERMESPEED/api/servicios/publico/cliente.php?action=editProfile`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        console.log(data, "Data desde Editar Perfil OK")
        if (data.status) {
            console.log(data, 'Valor de editar perfil OK')
            Alert.alert('Perfil editado correctamente', '', [
                { text: 'OK', onPress: () => fillData() },
            ], { icon: 'success' });
        } else {
            Alert.alert('Error', data.error);
        }
    } catch (error) {
        Alert.alert('Ocurrió un aqui error al intentar crear el usuario');
    }
  };
//DESDE AQUI
  const handleUpdateDetalleCarrito = async () => {
    try {
     

      const formData = new FormData();
      formData.append('nombreCliente', nombre);
      formData.append('apellidoCliente', apellido);
      formData.append('direccionCliente', direccion);
      formData.append('claveCliente', clave);
      formData.append('idDetalle', idDetalle);

      const response = await fetch(`${ip}/HERMESPEED/api/servicios/publico/cliente.php?action=editProfile`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.status) {
        Alert.alert('Se actualizo el perfil');
        getDetalleCarrito();
      } else {
        Alert.alert('Error al editar el perfil', data.error);
      }
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error en editar perfil", error);
      setModalVisible(false);
    }
  };

  useEffect(() => {
    editProfile();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Text style={styles.titulo}>Editar Perfil</Text>
        <Text style={styles.subtitulo}>Ingresa los cambions</Text>
        <Input
          placeHolder="contraseña"
          contra={true}
          setValor={clave}
          setTextChange={setClave}
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
        </View>
        <InputMultiline
          placeHolder="Dirección Cliente"
          setValor={setDireccion}
          valor={direccion}
          setTextChange={setDireccion}
        />
        <Buttons textoBoton="guardar" accionBoton={editProfile} />
      </ScrollView>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleProfile}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Full name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        keyboardType="phone-pad"
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
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
header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
backButton: {
    fontSize: 16,
    color: '#000',
  },
});