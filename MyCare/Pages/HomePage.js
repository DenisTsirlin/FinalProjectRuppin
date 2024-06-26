import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
export default function HomePage({navigation}) {
    return (
        <View>
            <Text>HomePage</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text>Log Out</Text></TouchableOpacity>
        </View>
    );
}
