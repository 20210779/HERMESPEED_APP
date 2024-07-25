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
import CardCarrusel from "../components/Carousel/CardCarrusel";

export default function Home({ navigation }) {
  const [correo, setCorreo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
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
          <CardCarrusel/>
        </View>
        {/* Navigation Tabs */}
        <View style={styles.categoriesHeader}>
          <Text style={styles.TittleCategoria}>Categorias</Text>
          <TouchableOpacity onPress={() => {/* handle see all action */}}>
            <Text style={styles.seeAllText}>Ver todo</Text>
          </TouchableOpacity>
        </View>
        {/* Navigation Tabs */}
        <View style={styles.tabs}>
          <ScrollView horizontal contentContainerStyle={styles.sizeSelector}>
            {["All", "Nike", "Adidas", "Puma"].map((category) => (
              <TouchableOpacity
                key={category}
                style={selectedCategory === category ? styles.activeTab : styles.tab}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={selectedCategory === category ? styles.activeTabText : styles.tabText}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    marginTop: 30,
    width: "88%",
  },
  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
    marginVertical: 15,
    width: "92%",
    alignSelf: 'center',
  },
  sizeSelector: {
    flexDirection: "row",
    
    marginBottom: 10,
  },
  greeting: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
  },
  TittleCategoria: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 20,
  },
  seeAllText: {
    color: "#cccccc",
    fontWeight: "600",
    fontSize: 14,
  },
  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    width: "92%",
    alignSelf: 'center',
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
    width: "92%",
    height: "25%",
  },
  bannerContent: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  tabs: {
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 9,
    marginRight: 12,
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginHorizontal: 7,
  },
  tabText: {
    color: "#1E1F21",
    fontSize: 14,
    fontWeight: "600",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  activeTab: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: '#FFBE00',
    borderRadius: 5,
    marginHorizontal: 7,
  },
  activeTabText: {
    color: "#ffffff",
    fontSize: 14,
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
