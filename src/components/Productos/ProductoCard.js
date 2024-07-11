import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function ProductoCard({
  ip,
  imagenProducto,
  idProducto,
  nombreProducto,
  descripcionProducto,
  precioProducto,
  existenciasProducto,
  accionBotonProducto,
  accionBotonDetalleProducto,
}) {
  return (
    

    <View style={styles.card}>
        {/* Favorite Icon */}  
      <TouchableOpacity style={styles.favoriteIcon}>
        <FontAwesome name="heart-o" size={24} color="#FFBE00" />
      </TouchableOpacity>
      <Text style={styles.textTitle}>{nombreProducto}</Text>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${ip}/HERMESPEED/api/images/productos/${imagenProducto}` }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Product Info */}
      
      <Text style={styles.textPrice}>${precioProducto}</Text>
      <Text style={styles.text}>{idProducto}</Text>
      {/* Add to Cart Button */}
      <TouchableOpacity
        style={styles.cartButton}
        onPress={accionBotonProducto}
      >
        <FontAwesome name="plus" size={16} color="black"/>
      </TouchableOpacity>            
    </View>
  );
}

const styles = StyleSheet.create({
  text:{
    alignSelf:'flex-end',
    backgroundColor: '#ffffff',
    color:'#ffffff',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
    width: '90%',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 8,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 9,
    textAlign: 'left',
  },
  textPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFBE00',
    marginBottom: 12,
    textAlign: 'center',
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFBE00',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
});
