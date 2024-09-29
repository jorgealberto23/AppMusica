import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./Home"
import Cadastrar from "./Cadastrar";
import Alterar from "./Alterar";

const Stack = createStackNavigator();

export default function Rotas() {
    return (
        <Stack.Navigator>
    <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ headerStyle: { backgroundColor: '#2196F3' }, headerTintColor: '#fff', headerTitleStyle: { fontSize: 25  } }} 
    />
    <Stack.Screen 
        name="Cadastrar" 
        component={Cadastrar} 
        options={{ headerStyle: { backgroundColor: '#2196F3' }, headerTintColor: '#fff', headerTitleStyle: { fontSize: 25 } }} 
    />
    <Stack.Screen 
        name="Alterar" 
        component={Alterar} 
        options={{ headerStyle: { backgroundColor: '#2196F3' }, headerTintColor: '#fff', headerTitleStyle: { fontSize: 25 } }} 
    />
        </Stack.Navigator >
    );
}