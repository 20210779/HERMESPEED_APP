import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Buttons from "../components/Buttons/Button";
import * as Constantes from "../utils/constantes";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { useFocusEffect } from "@react-navigation/native";

export default function Home({ navigation }) {
  const [correo, setCorreo] = useState(null);
  const [nombre, setNombre] = useState(null);
  const ip = Constantes.IP;

  // Constante para obtener el número de horas.
  const HOUR = new Date().getHours();
  // Se define una variable para guardar un saludo.
  let greeting = "";
  // Dependiendo del número de horas transcurridas en el día, se asigna un saludo para el usuario.
  if (HOUR < 12) {
    greeting = "Buenos días";
  } else if (HOUR < 19) {
    greeting = "Buenas tardes";
  } else if (HOUR <= 23) {
    greeting = "Buenas noches";
  }

  const getUser = async () => {
    try {
      const response = await fetch(
        `${ip}/HERMESPEED/api/servicios/publico/cliente.php?action=getUser`,
        {
          method: "GET",
        }
      );
      6;
      const data = await response.json();
      if (data.status) {
        setNombre(data.name.nombre_cliente);
      } else {
        Alert.alert("Error", data.error);
      }
    } catch (error) {
      Alert.alert("Error", "No hay ningun nombre para mostrar");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUser();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={styles.userName}>
              {nombre ? nombre : "No hay Nombre para mostrar"}
            </Text>
          </View>
          <Image
            source={require("../../assets/perfilRaiden.png")}
            style={styles.avatar}
          />
        </View>
        {/* Banner */}
        <View style={styles.banner}>
          <Image
            source={require("../../assets/banner-shoe.png")}
            style={styles.bannerImage}
          />
          <View style={styles.bannerContent}>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Comprar ahora</Text>
            </TouchableOpacity>
          </View>
        </View>
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
              source={require("../../assets/product1.png")}
              style={styles.productImage}
            />
            <Text style={styles.productName}>Puma max 97</Text>
          </View>
          <View style={styles.productCard}>
            <Image
              source={require("../../assets/product1.png")}
              style={styles.productImage}
            />
            <Text style={styles.productName}>Gazelle Bold Shoes</Text>
          </View>
          <View style={styles.productCard}>
            <Image
              source={require("../../assets/product1.png")}
              style={styles.productImage}
            />
            <Text style={styles.productName}>Samba OG Shoes</Text>
          </View>
          <View style={styles.productCard}>
            <Image
              source={require("../../assets/product1.png")}
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
    backgroundColor: "#1E1F21",
  },
  Text: {
    color: "#ffffff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignItems: "flex-start",
    padding: 10,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    width: "88%",
  },
  greeting: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
  },
  userName: {
    color: "#ffffff",
    fontSize: 16,
  },
  avatar: {
    width: 45,
    height: 45,
    paddingTop: 20,
    borderRadius: 30,
  },
  scrollViewStyle: {
    alignItems: "center",
  },
  banner: {
    width: "90%",
    height: 150,
    backgroundColor: "#FFBE00",
    borderRadius: 10,
    marginTop: 20,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bannerContent: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  bannerText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
  },
  bannerButton: {
    backgroundColor: "#1E1F21",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  bannerButtonText: {
    color: "#FFBE00",

    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  tabText: {
    color: "#FFBE00",
    fontSize: 16,
    fontWeight: "bold",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  productCard: {
    width: "45%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  productName: {
    marginTop: 10,
    color: "#1E1F21",
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFBE00",
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
  },
});
