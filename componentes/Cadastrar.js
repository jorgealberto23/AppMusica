import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground } from "react-native";
import { firestore } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const backgroundImage = require('../assets/fundoCadastrar.jpg'); // Ajuste o caminho da imagem

export default function CadastrarMusicas({ navigation }) {
    const [nomeMusica, setNomeMusica] = useState(null);
    const [artistaMusica, setArtistaMusica] = useState(null);
    const [albumMusica, setAlbumMusica] = useState(null);

    async function addMusica() {
        try {
            const docRef = await addDoc(collection(firestore, 'tbmusica'), {
                nomeMusica,
                artistaMusica,
                albumMusica,
            });
            Alert.alert("Cadastro", "Registros cadastrados com sucesso");
            navigation.navigate("Home");
        } catch (error) {
            Alert.alert("Erro", "Erro ao cadastrar. Por favor, tente novamente.");
        }
    }

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Cadastre uma nova Música</Text>
                <TextInput
                    style={styles.input}
                    autoCapitalize='words'
                    placeholder="Digite o nome da música"
                    onChangeText={setNomeMusica}
                    value={nomeMusica}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Digite o artista"
                    onChangeText={setArtistaMusica}
                    value={artistaMusica}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Digite o álbum"
                    onChangeText={setAlbumMusica}
                    value={albumMusica}
                />
                <TouchableOpacity style={styles.button} onPress={addMusica}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fundo semi-transparente
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
