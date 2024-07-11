import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Constantes from "../utils/constantes";
import Buttons from "../components/Buttons/Button";

export default function DetalleProducto({ route, navigation }) {
  const { productId } = route.params;
  const [dataTallas, setDataTallas] = useState([]);
  const [dataColores, setDataColores] = useState([]);
  const [dataProducto, setDataProducto] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [idTalla, setTalla] = useState(0);
  const [idColor, setColor] = useState(0);

  // IP del servidor
  const ip = Constantes.IP;

  const getProductos = async () => {
    try {
      console.log("Iniciando la solicitud para el producto con ID:", productId);
      const formData = new FormData();
      formData.append("idProducto", productId);
      // Utilizar la dirección IP del servidor y no localhost
      const response = await fetch(
        `${ip}/HERMESPEED/api/servicios/publico/producto.php?action=readOne`,
        {
          method: "POST",
          body: formData,
        }
      );
      console.log("Respuesta recibida:", response);
      const data = await response.json();
      console.log("Datos recibidos al obtener producto:", data);
      if (data.status) {
        console.log("Datos del producto obtenidos con éxito:", data.dataset);
        setDataProducto(data.dataset);
      } else {
        console.log("Error en la respuesta del servidor:", data);
        Alert.alert("Error producto", data.error);
      }
    } catch (error) {
      console.error("Error durante la solicitud:", error);
      Alert.alert("Error", "Ocurrió un error al mostrar el producto");
    }
  };

  const getColores = async () => {
    try {
      //utilizar la direccion IP del servidor y no localhost
      const response = await fetch(
        `${ip}/HERMESPEED/api/servicios/publico/color.php?action=readAll`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      if (data.status) {
        setDataColores(data.dataset);
      } else {
        console.log(data);
        // Alert the user about the error
        Alert.alert("Error colores", data.error);
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al listar los colores");
    }
  };

  const getTallas = async () => {
    try {
      //utilizar la direccion IP del servidor y no localhost
      const response = await fetch(
        `${ip}/HERMESPEED/api/servicios/publico/talla.php?action=readAll`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      if (data.status) {
        setDataTallas(data.dataset);
      } else {
        console.log(data);
        // Alert the user about the error
        Alert.alert("Error tallas", data.error);
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al listar las tallas");
    }
  };

  const handleCreateDetail = async () => {
    if (quantity <= 0 || !selectedSize || !selectedColor) {
      Alert.alert("Debes llenar todos los campos");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('cantidadProducto', quantity);
      formData.append('idProducto', productId);  
      formData.append('colorZapato', selectedColorId);
      formData.append('tallaZapato', selectedSizeId);

      const response = await fetch(`${ip}/HERMESPEED/api/servicios/publico/pedido.php?action=createDetail`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.status) {
        Alert.alert('Datos Guardados correctamente');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Ocurrió un error al crear detalle');
    }
  };

  useEffect(() => {
    getProductos();
    getColores();
    getTallas();
  }, [productId]);

  const handleQuantityChange = (text) => {
    if (/^\d*$/.test(text)) {
      setQuantity(text);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={30} color="#1E1F21" />
          </TouchableOpacity>
          <MaterialIcons name="favorite-border" size={30} color="#1E1F21" />
        </View>

        {/* Product Image */}
        <Image
          source={require("../../assets/product-detail.png")}
          style={styles.productImage}
        />
        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productBrand}>Nike Dunk</Text>
          <Text style={styles.productName}>{dataProducto.nombre_producto}</Text>
          <Text style={styles.productPrice}>
            ${dataProducto.precio_producto}
          </Text>
          <View style={styles.rating}>
            <MaterialIcons name="star" size={20} color="#FFBE00" />
            <MaterialIcons name="star" size={20} color="#FFBE00" />
            <MaterialIcons name="star" size={20} color="#FFBE00" />
            <MaterialIcons name="star" size={20} color="#FFBE00" />
            <MaterialIcons name="star-border" size={20} color="#FFBE00" />
          </View>

          {/* Size Selector */}
          <Text style={styles.sizeTitle}>Talla</Text>
          <ScrollView horizontal contentContainerStyle={styles.sizeSelector}>
            {dataTallas.map((talla) => (
              <TouchableOpacity
                key={talla.id_talla}
                style={[
                  styles.sizeButton,
                  selectedSize === talla.tamano_talla && styles.selectedSize,
                  
                ]}
                onPress={() => {
                  setSelectedSize(talla.tamano_talla);
                  setSelectedSizeId(talla.id_talla);
                }}
              >
                <Text
                  style={[
                    styles.sizeButtonText,
                    selectedSize === talla.tamano_talla &&
                      styles.selectedSizeText,
                  ]}
                >
                   {talla.tamano_talla}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Color Selector */}
          <Text style={styles.colorTitle}>Color</Text>
          <View style={styles.colorSelector}>
            {dataColores.map((color) => (
              <TouchableOpacity
                key={color.id_color}
                style={[
                  styles.colorButton,
                  selectedColor === color.color_zapato &&
                    styles.selectedColor(color.color_zapato),
                 
                ]}
                onPress={() => {
                  setSelectedColor(color.color_zapato);
                  setSelectedColorId(color.id_color);
                }}
              >
                <View
                  style={[
                    styles.colorCircle,
                    { backgroundColor: color.color_zapato },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Quantity Selector */}
          <Text style={styles.quantityTitle}>Cantidad</Text>
          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            value={quantity}
            onChangeText={handleQuantityChange}
          />
          {/* Buy Button */}
          <TouchableOpacity style={styles.buyButton} onPress={handleCreateDetail}>
            <Text style={styles.buyButtonText}>comprar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1F21",
  },
  scrollViewStyle: {
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 20,
  },
  productImage: {
    width: "90%",
    height: 300,
    resizeMode: "contain",
    marginTop: 20,
  },
  productInfo: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  productBrand: {
    fontSize: 18,
    color: "#ACACAD",
    marginBottom: 5,
  },
  productName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E1F21",
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFBE00",
    marginVertical: 10,
  },
  quantityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  rating: {
    flexDirection: "row",
    marginBottom: 20,
  },
  sizeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E1F21",
    marginBottom: 10,
  },
  sizeSelector: {
    flexDirection: "row",
    marginBottom: 20,
  },
  sizeButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ACACAD",
    marginRight: 10,
  },
  selectedSize: {
    backgroundColor: "#FFBE00",
    borderColor: "#FFBE00",
  },
  sizeButtonText: {
    color: "#1E1F21",
  },
  selectedSizeText: {
    color: "#ffffff",
  },
  colorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E1F21",
    marginBottom: 10,
  },
  colorSelector: {
    flexDirection: "row",
    marginBottom: 20,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ACACAD",
    marginRight: 10,
  },
  selectedColor: (color) => ({
    backgroundColor: color,
    borderColor: color,
  }),
  buyButton: {
    backgroundColor: "#FFBE00",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buyButtonText: {
    color: "#1E1F21",
    fontWeight: "bold",
    fontSize: 18,
  },
});
