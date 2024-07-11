import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,Image,Alert,TouchableOpacity,ScrollView} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Buttons from '../components/Buttons/Button';
import * as Constantes from '../utils/constantes';

export default function Home({ navigation }) {
  const [correo, setCorreo] = useState(null);
  const ip = Constantes.IP;

  const getUser = async () => {
    try {
      const response = await fetch(`${ip}/HERMESPEED/api/servicios/publico/cliente.php?action=getUser`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        setCorreo(data.username);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'No hay ningun correo para mostrar');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        {/* Banner */}
        <View style={styles.banner}>
          <Image
            source={require('../../assets/banner-shoe.png')}
            style={styles.bannerImage}
          />
          <View style={styles.bannerContent}>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Comprar ahora</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.Text}>Bienvenid@</Text>
      <Text style={styles.Text}>
        { /*correo ? correo : 'No hay correo para mostrar'*/}
        {correo ? correo : 'No hay Nombre para mostrar'}
      </Text>

        {/* Navigation Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>recientes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>populares</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>más vendidos</Text>
          </TouchableOpacity>
        </View>

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          <View style={styles.productCard}>
            <Image
              source={require('../../assets/product1.png')}
              style={styles.productImage}
            />
            <Text style={styles.productName}>Puma max 97</Text>
          </View>
          <View style={styles.productCard}>
            <Image
              source={require('../../assets/product1.png')}
              style={styles.productImage}
            />
            <Text style={styles.productName}>Gazelle Bold Shoes</Text>
          </View>
          <View style={styles.productCard}>
            <Image
              source={require('../../assets/product1.png')}
              style={styles.productImage}
            />
            <Text style={styles.productName}>Samba OG Shoes</Text>
          </View>
          <View style={styles.productCard}>
            <Image
              source={require('../../assets/product1.png')}
              style={styles.productImage}
            />
            <Text style={styles.productName}>Air Black Shoes</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1F21',
  },
  Text:{
    color: '#ffffff',
  },
  scrollViewStyle: {
    alignItems: 'center',
  },
  banner: {
    width: '90%',
    height: 150,
    backgroundColor: '#FFBE00',
    borderRadius: 10,
    marginTop: 20,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerContent: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  bannerText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  bannerButton: {
    backgroundColor: '#1E1F21',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  bannerButtonText: {
    color: '#FFBE00',
    
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabText: {
    color: '#FFBE00',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  productCard: {
    width: '45%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  productName: {
    marginTop: 10,
    color: '#1E1F21',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFBE00',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
});
