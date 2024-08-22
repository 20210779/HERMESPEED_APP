import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ProductCardHome from './ProductCardHome';
import fetchData from '../../utils/fetchData';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation(); // Instancia de navegación

  const PRODUCTO_API = "servicios/publico/producto.php"; 
  // Llamada a la API para obtener los productos
  const fetchProducts = async () => {
    try {
      const response = await fetchData(PRODUCTO_API, 'readAll');
      if (response.status === 1) {
        setProducts(response.dataset);
      } else {
        console.log('Error fetching products:', response.error);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Manejar la navegación cuando se presiona un producto
  const handlePress = (productId) => {
    console.log("Selected Product ID:", productId);
    navigation.navigate('DetalleProducto', { productId: productId.toString() });
  };

  // Renderiza 2 productos por fila
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <ProductCardHome product={item[0]} onPress={handlePress} />
      {item[1] && <ProductCardHome product={item[1]} onPress={handlePress} />}
    </View>
  );

  // Función para dividir los productos en pares
  const pairProducts = (data) => {
    let result = [];
    for (let i = 0; i < data.length; i += 2) {
      result.push([data[i], data[i + 1]]);
    }
    return result;
  };

  return (
    <FlatList
      data={pairProducts(products)}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
    />
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});









