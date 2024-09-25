import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { firestore } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function Home({ navigation }) {

    const [musicas, setMusicas] = useState([]);

    async function deleteMusicas(id) {
        try {
            await deleteDoc(doc(firestore, "tbmusica", id))
            Alert.alert("A musica foi deletada.")
        } catch (error) {
            console.error("Erro ao deletar.", error)
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
        <View>
            <View>
                <Text>Lista das Musicas</Text>
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
                                <View>
                                    <Text> Nome da Musica: <Text>{item.nomeMusica}</Text></Text>
                                    <Text> Nome do Artista: <Text>{item.artistaMusica}</Text></Text>
                                    <Text> Nome do Album <Text>{item.albumMusica}</Text></Text>
                                </View>
                            </TouchableOpacity>
                            <View>
                                <TouchableOpacity onPress={() => { deleteMusicas(item.id) }}>
                                    <Text>X</Text>
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
    );    
}