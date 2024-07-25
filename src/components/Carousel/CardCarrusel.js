import React, { useRef } from "react";
import { Dimensions, View, Image, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import Banners from "../../data/banners";

// Obtener el ancho de la pantalla
const width = Dimensions.get("window").width;

const CardCarrusel = ({ onPressPagination }) => {
  // Crear una referencia al carrusel
  const ref = useRef(null);

  // Valor compartido para el progreso del carrusel
  const progress = useSharedValue(0);

  // Función para manejar el cambio de progreso
  const onProgressChange = (offsetProgress, absoluteProgress) => {
    progress.value = absoluteProgress;
  };

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={ref}
        width={width}
        height={width / 2}
        autoPlay={true}
        autoPlayInterval={2000}
        data={Banners} // Usar los datos correctos
        onProgressChange={onProgressChange}
        renderItem={({ item }) => (
          <View style={styles.carouselItem}>
            <Image source={item.src} style={styles.ajustarImagen} />
          </View>
        )}
      />
      <Pagination
        progress={progress}
        data={Banners} // Usar los datos correctos
        dotStyle={styles.dotStyle}
        containerStyle={styles.paginationContainer}
        onPress={(index) => {
          if (ref.current) {
            ref.current.scrollTo({ index, animated: true });
          }
        }}
      />
    </View>
  );
};

// Componente de paginación para el carrusel
const Pagination = ({ progress, data, dotStyle, containerStyle, onPress }) => {
  return (
    <View style={[styles.paginationContainer, containerStyle]}>
      {data.map((_, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          const isActive = Math.round(progress.value) === index;
          return {
            opacity: withTiming(isActive ? 1 : 0.5),
            transform: [
              {
                scale: withTiming(isActive ? 1.2 : 1),
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
  carouselContainer: {
    alignItems: "center", // Centra horizontalmente
  },
  carouselItem: {
    flex: 1, // Ocupa toda el área disponible
    alignItems: "center", // Centra horizontalmente
    margin: 15, // Margen de 15 unidades
    borderRadius: 10, // Bordes redondeados
    backgroundColor: "#fff", // Fondo blanco
  },
  ajustarImagen: {
    borderRadius: 10,
    width: "100%", // Ancho completo del contenedor
    height: "100%", // Altura completa del contenedor
  },
  dotStyle: {
    width: 9, // Ancho del punto
    height: 5, // Altura del punto
    borderRadius: 3, // Bordes redondeados
    backgroundColor: "white", // Color de fondo negro
    marginHorizontal: 3, // Margen horizontal de 4 unidades
  },
  paginationContainer: {
    flexDirection: "row", // Disposición en fila
    justifyContent: "center", // Centra horizontalmente
  },
});

export default CardCarrusel;
