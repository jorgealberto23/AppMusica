import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { firestore } from "../firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

const backgroundImage = require('../assets/fundoAlterar.jpg'); // Ajuste o caminho da imagem

export default function AlterarMusicas({ navigation, route }) {
    const id = route.params.id;

    const [nomeMusica, setNomeMusica] = useState(route.params.nomeMusica);
    const [artistaMusica, setArtistaMusica] = useState(route.params.artistaMusica);
    const [albumMusica, setAlbumMusica] = useState(route.params.albumMusica);

    async function alterarMusica(id, nomeMusica, artistaMusica, albumMusica) {
        try {
            await updateDoc(doc(collection(firestore, "tbmusica"), id), {
                nomeMusica,
                artistaMusica,
                albumMusica
            });
            Alert.alert("Aviso", "Música alterada com sucesso.");
            navigation.navigate("Home");
        } catch (error) {
            console.error("Erro ao alterar: ", error);
            Alert.alert("Erro", "Erro ao alterar. Por favor, tente novamente.");
        }
    }

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Alterar dados da música</Text>
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
                <TouchableOpacity style={styles.button} onPress={() => alterarMusica(id, nomeMusica, artistaMusica, albumMusica)}>
                    <Text style={styles.buttonText}>Alterar</Text>
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
        width: '90%',
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
