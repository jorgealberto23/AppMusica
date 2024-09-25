import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { firestore } from "../firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

export default function AlterarMusicas({ navigation, route }) {

    const id = route.params.id;

    const [nomeMusica, setNomeMusica] = useState(route.params.nomeMusica);
    const [artistaMusica, setArtistaMusica] = useState(route.params.artistaMusica);
    const [albumMusica, setAlbumMusica] = useState(route.params.albumMusica);


    async function alterarMusica(id, nomeMusica, artistaMusica, albumMusica) {
        try {
            await updateDoc(doc(collection(firestore, "tbmusica"), id), {
                nomeMusica: nomeMusica,
                artistaMusica: artistaMusica,
                albumMusica: albumMusica
            })
            Alert.alert("Aviso", "Musica Alterado com sucesso.")
            navigation.navigate("Home")
        }
        catch (error) {
            console.error("Erro ao alterar: ", error);
            Alert.alert("Erro", "Erro ao alterar. Por favor, tente novamente.");
        }
    }
    return (
        <View>
            <View>
                <Text> Alterar dados da musica </Text>
            </View>
            <View>
                <TextInput autoCapitalize='words' placeholder="Digite o nome da musica" onChangeText={setNomeMusica} value={nomeMusica} />
                <TextInput placeholder="Digite a Sigla" onChangeText={setArtistaMusica} value={artistaMusica} />
                <TextInput placeholder="Digite o valor" onChangeText={setAlbumMusica} value={albumMusica} />
                <TouchableOpacity
                    onPress={() => {
                        alterarMusica(id, nomeMusica, artistaMusica, albumMusica);
                    }}>
                    <Text> Alterar </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}