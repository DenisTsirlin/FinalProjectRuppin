import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePage = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [car, setCar] = useState(null); // הוסף משתנה car

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    const parsedUser = JSON.parse(userData);
                    console.log('Fetched user data:', parsedUser); // הוסף כאן console.log
                    setUser(parsedUser);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();

        // Add listener to fetch user data when navigating back to this screen
        const unsubscribe = navigation.addListener('focus', () => {
            fetchUser();
        });

        // Cleanup the listener on component unmount
        return unsubscribe;
    }, [navigation]);

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/Images/logo.png')} style={styles.logo} />
                </View>

                <Text style={styles.welcomeText}>
                    שלום {user ? (
                        <>
                            <Text style={styles.userName}>{user.first_Name || ''} </Text>
                            <Text style={styles.userName}>{user.last_Name || ''}</Text>
                        </>
                    ) : 'התחברת/הירשם'}, ברוך הבא!
                </Text>

                <View style={styles.content}>
                    {car ? (
                        <View style={styles.carContainer}>
                            <Text style={styles.carTitle}>הרכב שלך</Text>
                            <Text>מספר רכב: {car.number}</Text>
                            <Text>יצרן: {car.make}</Text>
                            <Text>שנת ייצור: {car.year}</Text>
                            <Text>צבע: {car.color}</Text>
                            <Text>קילומטרים: {car.mileage}</Text>
                            <Text>תוקף ביטוח: {car.insuranceExpiry}</Text>
                            <Text>מספר טיפולים: {car.serviceCount}</Text>
                        </View>
                    ) : (
                        <View style={styles.emptyCarContainer}>
                            <View style={styles.emptyCarImage}>
                                <Icon name="error-outline" size={40} color="red" />
                            </View>
                            <Text style={styles.missingCarText}>חסר רכב ברשימה</Text>
                        </View>
                    )}
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
                            <Text style={styles.buttonText}>מצב חירום</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.grayButton]} onPress={() => navigation.navigate('User Management')}>
                            <Icon name="account-circle" size={24} color="white" />
                            <Text style={styles.buttonText}>פרופיל</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
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
        width: 250,
        height: 250,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    userName: {
        color: '#AD40AF', // צבע השם הפרטי והשם משפחה
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCarContainer: {
        alignItems: 'center',
    },
    carContainer: {
        alignItems: 'center',
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
        marginTop: 10,
    },
    addCarText: {
        color: 'green',
        fontSize: 16,
    },
    emptyCarImage: {
        width: 110,
        height: 110,
        borderWidth: 2,
        borderColor: '#ccc',
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    missingCarText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
    divider: {
        backgroundColor: '#d3d3d3',
        height: 2,
        marginVertical: 20,
    },
    menu: {
        marginTop: 30,
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
