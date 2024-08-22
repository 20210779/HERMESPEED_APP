import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para el ícono del botón

export default function ProductCardHome({ product, onPress }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.imagen_producto }} style={styles.image} />
      <Text style={styles.name}>{product.nombre_producto}</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => onPress(product.id_producto)}>
        <Ionicons name="add" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: '48%', // Ocupa el 48% del ancho para tener 2 por fila
    marginBottom: 10,
    marginRight: '2%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#ffeb3b',
    borderRadius: 50,
    padding: 10,
  },
});
