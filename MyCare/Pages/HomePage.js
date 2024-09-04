import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Divider } from 'react-native-elements'; 

const HomePage = ({ navigation }) => {
    const userName = null; 
    const car = null; 

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/Images/logo.png')} style={styles.logo} />
            </View>

            <Text style={styles.welcomeText}>שלום {userName ? userName : 'התחברת/הירשם'}, ברוך הבא!</Text>

            <View style={styles.content}>
                <View style={styles.leftSection}>
                    {car ? (
                        <View>
                            <Text style={styles.carTitle}>הרכב שלך</Text>
                            <Text>מספר רכב: 123456</Text>
                            <Text>יצרן: Toyota</Text>
                            <Text>שנת ייצור: 2021</Text>
                            <Text>צבע: Red</Text>
                            <Text>קילומטרים: 50,000</Text>
                            <Text>תוקף ביטוח: 01/01/2025</Text>
                            <Text>מספר טיפולים: 3</Text>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.addCarButton}>
                            <Icon name="add-circle" size={20} color="green" />
                            <Text style={styles.addCarText}>הוסף רכב</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <Divider style={styles.divider} />

            <View style={styles.menu}>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={[styles.button, styles.greenButton]} onPress={() => navigation.navigate('Nearby Garages')}>
                        <Icon name="help-outline" size={24} color="white" />
                        <Text style={styles.buttonText}>מוסכים בקרבת מקום</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.orangeButton]} onPress={() => navigation.navigate('Add Vehicle')}>
                        <Icon name="directions-car" size={24} color="white" />
                        <Text style={styles.buttonText}>הוספת רכב</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={[styles.button, styles.redButton]} onPress={() => navigation.navigate('Emergency')}>
                        <Icon name="error-outline" size={24} color="white" />
                        <Text style={styles.buttonText}>אופס עשיתי תאונה</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.grayButton]} onPress={() => navigation.navigate('User Profile')}>
                        <Icon name="person" size={24} color="white" />
                        <Text style={styles.buttonText}>פרופיל משתמש</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 120,
        height: 120,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftSection: {
        width: '45%',
    },
    carTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    addCarButton: {
        backgroundColor: 'lightgreen',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    addCarText: {
        color: 'green',
        fontSize: 16,
    },
    divider: {
        backgroundColor: '#d3d3d3',
        height: 2,
        marginVertical: 20,
    },
    menu: {
        marginTop: 30,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    greenButton: {
        backgroundColor: 'green',
    },
    orangeButton: {
        backgroundColor: 'orange',
    },
    redButton: {
        backgroundColor: 'red',
    },
    grayButton: {
        backgroundColor: 'gray',
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        marginLeft: 10,
    },
});

export default HomePage;
