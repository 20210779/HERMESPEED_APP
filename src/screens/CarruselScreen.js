import React, { useRef } from "react";
import { Dimensions, View, Image, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import Banners from "../data/banners"; // Importa el array de banners con imágenes

// Obtener el ancho de la pantalla
const width = Dimensions.get("window").width;

export default function CarruselScreen({ navigation }) {
  // Crear una referencia al carrusel
  const ref = useRef(null);

  // Valor compartido para el progreso del carrusel
  const progress = useSharedValue(0);

  // Función para manejar el cambio de progreso
  const onProgressChange = (offsetProgress, absoluteProgress) => {
    progress.value = absoluteProgress;
  };

  // Función para manejar el evento de presionar en la paginación
  const onPressPagination = (index) => {
    ref.current.scrollTo({ index, animated: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Carousel
          ref={ref}
          autoPlay={true}
          mode="parallax"
          autoPlayInterval={2000}
          width={width} // Ancho del carrusel basado en el ancho de la pantalla
          height={width / 2} // Altura del carrusel (mitad del ancho de la pantalla)
          data={Banners} // Data del carrusel proveniente de Banners
          onProgressChange={onProgressChange} // Maneja el cambio de progreso
          renderItem={({ item }) => ( // Renderiza cada item del carrusel
          // Dentro de Carousel, el renderItem renderiza cada imagen.
            <View style={styles.carouselItem}>
              <Image source={item.src} style={styles.ajustarImagen} />
            </View>
          )}
        />
        <Pagination
          progress={progress} // Progreso del carrusel
          data={Banners} // Data del carrusel
          dotStyle={styles.dotStyle} // Estilos para los puntos 
          containerStyle={styles.paginationContainer} // Estilos para el contenedor de la paginación
          onPress={onPressPagination} // Maneja el evento de presionar en la paginación
        />
      </View>
    </View>
  );
}

const Pagination = ({ progress, data, dotStyle, containerStyle, onPress }) => {
  return (
    <View style={[styles.paginationContainer, containerStyle]}>
      {data.map((_, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          const isActive = Math.round(progress.value) === index;
          return {
            opacity: withTiming(isActive ? 1 : 0.5),  // Ajusta la opacidad del punto
            transform: [
              {
                scale: withTiming(isActive ? 1.2 : 1), // Ajusta la escala del punto
              },
            ],
          };
        });

        return (
          <Animated.View
            key={index}
            style={[styles.dotStyle, dotStyle, animatedStyle]}
            onStartShouldSetResponder={() => {
              onPress(index);
              return true;
            }}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda la pantalla
    justifyContent: "center", // Centra verticalmente
    alignItems: "center", // Centra horizontalmente
    backgroundColor: "red", // Color de fondo rojo
  },
  carouselContainer: {
    alignItems: "center", // Centra horizontalmente
    position: "absolute", // Posición absoluta para ajustar su posición
    top: 20, // Desplazar hacia abajo 20 unidades
  },
  carouselItem: {
    flex: 1, // Ocupa toda el área disponible
    borderWidth: 1, // Ancho del borde de 1 unidad
    justifyContent: "center", // Centra verticalmente
    alignItems: "center", // Centra horizontalmente
    margin: 15, // Margen de 15 unidades
    borderRadius: 10, // Bordes redondeados
    backgroundColor: "#fff", // Fondo blanco
  },
  ajustarImagen: {
    borderRadius: 10,
    width: "100%",
    height: "100%", // Ocupa toda el área disponible
  },
  dotStyle: {
    width: 8, // Ancho del punto
    height: 8, // Altura del punto
    borderRadius: 4, // Bordes redondeados
    backgroundColor: "black", // Color de fondo negro
    marginHorizontal: 4, // Margen horizontal de 4 unidades
  },
  paginationContainer: {
    flexDirection: "row", // Disposición en fila
    justifyContent: "center", // Centra horizontalmente
  },
});
