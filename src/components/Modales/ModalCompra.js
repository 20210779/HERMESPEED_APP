import React, { useState, useEffect} from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import Buttons from '../Buttons/Button';
import RNPickerSelect from 'react-native-picker-select';
import * as Constantes from '../../utils/constantes'

const ModalCompra = ({ visible, cerrarModal, nombreProductoModal, idProductoModal, cantidad,color, talla, setCantidad,setColor,setTalla}) => {
  const [dataTallas, setDataTallas] = useState([])
  const [dataColores, setDataColores] = useState([])
  const [selectedValue, setSelectedValue] = useState(null);
  const ip = Constantes.IP;

  const handleCreateDetail = async () => {

    try {
        if ((cantidad<0)) {
            Alert.alert("Debes llenar todos los campos")
            return
        }
        else {
            const formData = new FormData();
            formData.append('idProducto', idProductoModal);
            formData.append('cantidadProducto', cantidad);
            formData.append('colorZapato',color);
            formData.append('tallaZapato',talla);

            const response = await fetch(`${ip}/HERMESPEED/api/servicios/publico/pedido.php?action=createDetail`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log("data despues del response", data);
            if (data.status) {
                Alert.alert('Datos Guardados correctamente');
                
            } else {
                Alert.alert('Error', data.error);
            }
        }

    } catch (error) {
        Alert.alert('Ocurrió un error al crear detalle');
    }
};

const getColores = async () => {
  try {
    const response = await fetch(`${ip}/HERMESPEED/api/servicios/publico/color.php?action=readAll`, {
      method: 'GET',
    });
    const data = await response.json();
    if (data.status) {
      setDataColores(data.dataset)
    } else {
      console.log(data);
      // Alert the user about the error
      Alert.alert('Error colores', data.error);
    }
  } catch (error) {
    Alert.alert('Error', 'Ocurrió un error al listar los colores');
  }
}

const getTallas = async () => {
  try {

    //utilizar la direccion IP del servidor y no localhost
    const response = await fetch(`${ip}/HERMESPEED/api/servicios/publico/talla.php?action=readAll`, {
      method: 'GET',
    });

    const data = await response.json();
    if (data.status) {
      setDataTallas(data.dataset)
    } else {
      console.log(data);
      // Alert the user about the error
      Alert.alert('Error tallas', data.error);
    }
  } catch (error) {
    Alert.alert('Error', 'Ocurrió un error al listar las tallas');
  }
}

  const handleCancelCarrito = () => {
    // Lógica para agregar al carrito con la cantidad ingresada
    cerrarModal(false)
  };
  //logica para la compra del producto - agregar el producto al carrito


  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        cerrarModal(!visible);
      }}
    >
      <View style={styles.centeredView}>
        <View>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            style={{ inputAndroid: styles.picker }}
            onValueChange={(value) => getColores(value)}
            placeholder={{ label: 'Selecciona un color...', value: null }}
            items={dataColores.map(color => ({
              label: color.color_zapato,
              value: color.id_color,
            }))}
          />
        </View>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{nombreProductoModal}</Text>
          <Text style={styles.modalText}>Cantidad:</Text>
          <TextInput  
            style={styles.input}
            value={cantidad}
            onChangeText={text => setCantidad(text)}
            keyboardType="numeric"
            placeholder="Ingrese la cantidad"
          />
          
        </View>
          <Text style={styles.modalText}>Talla:</Text>
          <TextInput  
            style={styles.input}
            value={cantidad}
            onChangeText={text => setCantidad(text)}
            keyboardType="numeric"
            placeholder="Ingrese la cantidad"
          />
          <Buttons
          textoBoton='Agregar al carrito'
          accionBoton={() => handleCreateDetail()}/>
                    <Buttons
          textoBoton='Cancelar'
          accionBoton={() => handleCancelCarrito()}/>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: 200,
    textAlign: 'center',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#AF8260', // Color del borde
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor: '#AF8260', // Color de fondo
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  picker: {
    color: 'black'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ModalCompra;