
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';

export default function Buttons({textoBoton, accionBoton}) {

    return(
        <>
        <TouchableOpacity style={styles.button} onPress={accionBoton}>
            <Text style={styles.buttonText}>{textoBoton}</Text>
        </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({

    button: {
        marginTop: 50,
        width: '85%',
        borderRadius: 4,
        backgroundColor: "#FFBE00",
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginVertical: 5,
        alignSelf: 'center',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        color: "#FFF", fontWeight: '600', textTransform: 'capitalize'
    }
});