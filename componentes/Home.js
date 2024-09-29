import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ImageBackground } from "react-native";
import { firestore } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { useFocusEffect } from '@react-navigation/native';

// Adicione suas imagens aqui
const images = [
    require('../assets/fundo1.jpg'),
    require('../assets/fundo2.jpg'),
    require('../assets/fundo3.jpg'),
    require('../assets/fundo4.jpg'),
    require('../assets/fundo5.jpg'),
];

export default function Home({ navigation }) {
    const [musicas, setMusicas] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState(images[0]);

    async function deleteMusicas(id) {
        try {
            await deleteDoc(doc(firestore, "tbmusica", id));
            Alert.alert("A música foi deletada.");
        } catch (error) {
            console.error("Erro ao deletar.", error);
        }
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, 'tbmusica'), (querySnapshot) => {
            const lista = [];
            querySnapshot.forEach((doc) => {
                lista.push({ ...doc.data(), id: doc.id });
            });
            setMusicas(lista);
        });
        return () => unsubscribe();
    }, []);

    // Função para selecionar uma imagem aleatória
    const selectRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        setBackgroundImage(images[randomIndex]);
    };

    useFocusEffect(
        React.useCallback(() => {
            selectRandomImage(); // Muda a imagem ao entrar na página
        }, [])
    );

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Lista das Músicas</Text>
                <FlatList
                    data={musicas}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate("Alterar", { id: item.id, nomeMusica: item.nomeMusica, artistaMusica: item.artistaMusica, albumMusica: item.albumMusica })}>
                                <View style={styles.boxInfo}>
                                    <Text style={styles.text}>Nome: <Text style={styles.highlight}>{item.nomeMusica}</Text></Text>
                                    <Text style={styles.text}>Artista: <Text style={styles.highlight}>{item.artistaMusica}</Text></Text>
                                    <Text style={styles.text}>Álbum: <Text style={styles.highlight}>{item.albumMusica}</Text></Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteMusicas(item.id)} style={styles.btnExcluir}>
                                <Text style={styles.btnText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
                <TouchableOpacity onPress={() => navigation.navigate("Cadastrar")} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 25,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFFFFF',
    },
    itemContainer: {
        marginBottom: 15,
    },
    boxInfo: {
        backgroundColor: '#00BFFF',
        padding: 20,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 10,
    },
    text: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    highlight: {
        fontWeight: 'bold',
    },
    btnExcluir: {
        backgroundColor: '#dc0000',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#00BFFF',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        right: 30,
    },
    addButtonText: {
        fontSize: 30,
        color: 'white',
    },
});
