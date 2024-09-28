import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ImageBackground } from "react-native";
import { firestore } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

const image = require('../assets/fundo.jpg'); // Ajuste o caminho da imagem conforme necessário

export default function Home({ navigation }) {
    const [musicas, setMusicas] = useState([]);

    async function deleteMusicas(id) {
        try {
            await deleteDoc(doc(firestore, "tbmusica", id));
            Alert.alert("A música foi deletada.");
        } catch (error) {
            console.error("Erro ao deletar.", error);
        }
    }

    useEffect(() => {
        const unsubcribe = onSnapshot(collection(firestore, 'tbmusica'), (querySnapshot) => {
            const lista = [];
            querySnapshot.forEach((doc) => {
                lista.push({ ...doc.data(), id: doc.id });
            });
            setMusicas(lista);
        });
        return () => unsubcribe();
    }, []);

    return (
        <ImageBackground source={image} style={styles.background}>
            <View style={styles.container}>
                <View>
                    <Text>Lista das Músicas</Text>
                </View>
                <FlatList
                    data={musicas}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <TouchableOpacity onPress={() => navigation.navigate("Alterar", {
                                    id: item.id,
                                    nomeMusica: item.nomeMusica,
                                    artistaMusica: item.artistaMusica,
                                    albumMusica: item.albumMusica
                                })}>
                                    <View style={styles.boxInfo}>
                                        <Text style={styles.text}>Nome da Música: <Text style={styles.text}>{item.nomeMusica}</Text></Text>
                                        <Text style={styles.text}>Nome do Artista: <Text style={styles.text}>{item.artistaMusica}</Text></Text>
                                        <Text style={styles.text}>Nome do Álbum: <Text style={styles.text}>{item.albumMusica}</Text></Text>
                                    </View>
                                </TouchableOpacity>
                                <View>
                                    <TouchableOpacity onPress={() => { deleteMusicas(item.id) }}>
                                        <Text>Excluir</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    }}
                />
                <TouchableOpacity onPress={() => navigation.navigate("Cadastrar")}>
                    <Text>+</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    boxInfo: {
        flex: 1,
        backgroundColor: '#00BFFF',
        padding: 25,
    },
    text:{
        fontSize: 15,
        fontWeight: 'bold',
    }
});
