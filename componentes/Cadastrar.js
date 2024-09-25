import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { firestore } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CadastrarMusicas({navigation}) {

    const [nomeMusica, setNomeMusica] = useState(null);
    const [artistaMusica, setArtistaMusica] = useState(null);
    const [albumMusica, setAlbumMusica] = useState(null);

    async function addMusica() {
        try {
            const docRef = await addDoc(collection(firestore, 'tbmusica'), {
                nomeMusica: nomeMusica,
                artistaMusica: artistaMusica,
                albumMusica: albumMusica
            });
            console.log("Cadastrado com ID: ", docRef.id);
            Alert.alert("Cadastro", "Registros cadastrados com sucesso")
            navigation.navigate("Home");
        } catch (error) {
            console.error("Erro ao cadastrar: ", error);
            Alert.alert("Erro", "Erro ao cadastrar . Por favor, tente novamente.");
        }
    }

    return (
        <View>
            <View>
                <Text> Cadastre uma nova Musica</Text>
            </View>
            <TextInput autoCapitalize='words' placeholder="Digite o nome da musica" onChangeText={setNomeMusica} value={nomeMusica} />
            <TextInput placeholder="Digite o artista" onChangeText={setArtistaMusica} value={artistaMusica} />
            <TextInput placeholder="Digite o album" onChangeText={setAlbumMusica} value={albumMusica} />

            <TouchableOpacity
                onPress={() => {
                    addMusica();
                }}>
                <Text> Enviar </Text>
            </TouchableOpacity>
        </View>
    );
}