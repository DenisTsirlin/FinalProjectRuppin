import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserManagementScreen = () => {
    const [userDetails, setUserDetails] = useState({
        customerId: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        birthDay: '',
        drivingLicense: '',
    });

    const navigation = useNavigation();

    const handleSave = () => {
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Customer ID:</Text>
            <TextInput
                style={styles.input}
                value={userDetails.customerId}
                onChangeText={(text) => setUserDetails({ ...userDetails, customerId: text })}
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
                style={styles.input}
                value={userDetails.password}
                onChangeText={(text) => setUserDetails({ ...userDetails, password: text })}
            />
            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                value={userDetails.email}
                onChangeText={(text) => setUserDetails({ ...userDetails, email: text })}
            />
            <Text style={styles.label}>First Name:</Text>
            <TextInput
                style={styles.input}
                value={userDetails.firstName}
                onChangeText={(text) => setUserDetails({ ...userDetails, firstName: text })}
            />
            <Text style={styles.label}>Last Name:</Text>
            <TextInput
                style={styles.input}
                value={userDetails.lastName}
                onChangeText={(text) => setUserDetails({ ...userDetails, lastName: text })}
            />
            <Text style={styles.label}>Birth Day:</Text>
            <TextInput
                style={styles.input}
                value={userDetails.birthDay}
                onChangeText={(text) => setUserDetails({ ...userDetails, birthDay: text })}
            />
            <Text style={styles.label}>Driving License:</Text>
            <TextInput
                style={styles.input}
                value={userDetails.drivingLicense}
                onChangeText={(text) => setUserDetails({ ...userDetails, drivingLicense: text })}
            />
            <Button title="Save" onPress={handleSave} />
            <Button title="Add Vehicle" onPress={() => navigation.navigate('AddVehicleScreen')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});

export default UserManagementScreen;
