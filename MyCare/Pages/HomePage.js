import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const HomePage = ({ navigation }) => {
    const hasVehicle = true; 

    return (
        <View style={styles.container}>
            {hasVehicle ? (
                <>
                    <View style={styles.vehicleInfo}>
                        <Image source={{ uri: '' }} style={styles.vehicleImage} />
                        <View>
                            <Text>Car Number: 123456</Text>
                            <Text>Car Type: SUV</Text>
                        </View>
                    </View>
                    <Button title="Add Another Vehicle" onPress={() => navigation.navigate('Add Vehicle')} />
                    <Button title="Emergency" onPress={() => {}} color="red" />
                    <Button title="Search Garages" onPress={() => {}} />
                    <Button title="Check Faults" onPress={() => {}} />
                </>
            ) : (
                <Button title="Add Vehicle" onPress={() => navigation.navigate('Add Vehicle')} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    vehicleInfo: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    vehicleImage: {
        width: 100,
        height: 100,
        marginRight: 16,
    },
});

export default HomePage;
