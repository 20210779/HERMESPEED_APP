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
  const [rating, setRating] = useState(0);  // Estado para la calificación

  const ip = Constantes.IP;

  useEffect(() => {
    getProductos();
    getColores();
    getTallas();
  }, [productId]);

  const getProductos = async () => {
    try {
      const formData = new FormData();
      formData.append("idProducto", productId);

      const response = await fetch(
        `${ip}/HERMESPEED/api/servicios/publico/producto.php?action=readOne`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.status) {
        setDataProducto(data.dataset);
      } else {
        Alert.alert("Error producto", data.error);
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al mostrar el producto");
    }
  };

  const getColores = async () => {
    try {
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
        Alert.alert("Error colores", data.error);
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al listar los colores");
    }
  };

  const getTallas = async () => {
    try {
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
      formData.append("cantidadProducto", quantity);
      formData.append("idProducto", productId);
      formData.append("colorZapato", selectedColorId);
      formData.append("tallaZapato", selectedSizeId);

      const response = await fetch(
        `${ip}/HERMESPEED/api/servicios/publico/pedido.php?action=createDetail`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.status) {
        Alert.alert("Datos Guardados correctamente");
        navigation.goBack();
      } else {
        Alert.alert("Error", data.error);
      }
    } catch (error) {
      Alert.alert("Ocurrió un error al crear detalle");
    }
  };

  const handleQuantityChange = (text) => {
    if (/^\d*$/.test(text)) {
      setQuantity(text);
    }
  };

  // Componente de calificación por estrellas
  const StarRating = ({ rating, setRating }) => {
    return (
      <View style={styles.container2}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={star <= rating ? "star" : "star-border"}
              size={32}
              color={star <= rating ? "#ffd700" : "#ccc"}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        {/* Parte superior */}
        <View style={styles.topContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={30} color="#1E1F21" />
            </TouchableOpacity>
            <MaterialIcons name="favorite-border" size={30} color="#1E1F21" />
          </View>

          <Image
            source={require("../../assets/product-detail.png")}
            style={styles.productImage}
          />
        </View>

        {/* Parte inferior */}
        <View style={styles.bottomContainer}>
          <View style={styles.productInfo}>
            <Text style={styles.productBrand}>Nike Dunk</Text>
            <Text style={styles.productName}>
              {dataProducto.nombre_producto}
            </Text>
            <Text style={styles.productPrice}>
              ${dataProducto.precio_producto}
            </Text>

            {/* Calificación del producto */}
            <StarRating rating={rating} setRating={setRating} />
            <Text style={styles.text1}>Tu calificación: {rating} estrellas</Text>

            {/* Selector de talla */}
            <Text style={styles.sizeTitle}>Talla</Text>
            <ScrollView horizontal contentContainerStyle={styles.sizeSelector}>
              {dataTallas.map((talla) => (
                <TouchableOpacity
                  key={talla.id_talla}
                  style={[
                    styles.sizeButton,
                    selectedSize === talla.tamano_talla &&
                      styles.selectedSize,
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

            {/* Selector de color */}
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

            {/* Selector de cantidad */}
            <Text style={styles.quantityTitle}>Cantidad</Text>
            <TextInput
              style={styles.quantityInput}
              keyboardType="numeric"
              value={quantity}
              onChangeText={handleQuantityChange}
            />

            {/* Botón de compra */}
            <TouchableOpacity
              style={styles.buyButton}
              onPress={handleCreateDetail}
            >
              <Text style={styles.buyButtonText}>Comprar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewStyle: {
    flexGrow: 1,
  },
  topContainer: {
    backgroundColor: "#ffd21b", // Color de fondo para la parte superior
    paddingBottom: 20, // Espacio bajo la imagen
  },
  bottomContainer: {
    backgroundColor: "#1a1a1b", // Color de fondo para la parte inferior
    padding: 16,
    borderTopLeftRadius: 30, // Bordes redondeados en la transición
    borderTopRightRadius: 30,
    marginTop: -30, // Ajuste para conectar sin solaparse
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  productInfo: {
    padding: 16,
    backgroundColor: "#1a1a1b", // Color de fondo de la parte inferior
  },
  productBrand: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: 'white',
    
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: 'white',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
  },
  container2: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  text1: {
    fontSize: 16,
    textAlign: "center",
    color: 'white',
    marginBottom: 16,
  },
  sizeTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: "bold",
    marginBottom: 8,
  },
  sizeSelector: {
    flexDirection: "row",
    marginBottom: 16,
  },
  sizeButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
  },
  selectedSize: {
    backgroundColor: "#1E1F21",
  },
  sizeButtonText: {
    fontSize: 16,
    color: "#333",
  },
  selectedSizeText: {
    color: "#fff",
  },
  colorTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: "bold",
    marginBottom: 8,
  },
  colorSelector: {
    flexDirection: "row",
    marginBottom: 16,
  },
  colorButton: {
    marginRight: 8,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  selectedColor: (color) => ({
    borderColor: color,
    borderWidth: 2,
  }),
  quantityTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: "bold",
    marginBottom: 8,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    color: 'white',
    fontSize: 16,
    marginBottom: 16,
  },
  buyButton: {
    backgroundColor: "#ffd21b",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 18,
    
    fontWeight: "bold",
  },
});
