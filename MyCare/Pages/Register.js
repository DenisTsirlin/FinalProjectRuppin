import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Register({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
        <ScrollView>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../assets/Images/login.png')} style={{ width: 200, height: 200, transform: [{ rotate: '-5deg' }] }} />
        </View>
        <Text style={styles.titleLogin}>Register</Text>

        <View style={styles.inputField}>
          <MaterialIcons name='person-outline' size={20} color='#666' style={{ marginRight: 5 }} />
          <TextInput placeholder='Full Name' style={{ flex: 1, paddingVertical: 0 }} />
        </View>

        <View style={styles.inputField}>
          <MaterialIcons name='calendar-today' size={20} color='#666' style={{ marginRight: 5 }} />
          <TextInput placeholder='Date of Birth' style={{ flex: 1, paddingVertical: 0 }} />
        </View>

        <View style={styles.inputField}>
          <MaterialIcons name='drive-eta' size={20} color='#666' style={{ marginRight: 5 }} />
          <TextInput placeholder="Driver's License Number" style={{ flex: 1, paddingVertical: 0 }} />
        </View>

        <View style={styles.inputField}>
          <MaterialIcons name='alternate-email' size={20} color='#666' style={{ marginRight: 5 }} />
          <TextInput placeholder='Put your email' style={{ flex: 1, paddingVertical: 0 }} keyboardType='email-address' />
        </View>

        <View style={styles.inputField}>
          <Ionicons name='lock-closed-outline' size={24} color='#666' style={{ marginRight: 5 }} />
          <TextInput placeholder='Put your Password' style={{ flex: 1, paddingVertical: 0 }} secureTextEntry={true} />
          <TouchableOpacity>
            <Text style={{ color: '#AD40AF', fontSize: 14 }}>Forgot?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => { }} style={styles.buttonLogin}>
          <Text style={styles.textLogin}>Register</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ textAlign: 'center', color: '#666', marginBottom: 14 }}>Or use one of your social profiles</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
        <TouchableOpacity>
          <View style={{ borderColor: '#ddd', borderRadius: 10, borderWidth: 2, paddingHorizontal: 30, paddingVertical: 10 }}>
            <Image source={require('../assets/Images/google.png')} style={{ width: 30, height: 30 }} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={{ borderColor: '#ddd', borderRadius: 10, borderWidth: 2, paddingHorizontal: 30, paddingVertical: 10 }}>
            <Image source={require('../assets/Images/facebook.png')} style={{ width: 34, height: 34 }} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={{ borderColor: '#ddd', borderRadius: 10, borderWidth: 2, paddingHorizontal: 30, paddingVertical: 10 }}>
            <Image source={require('../assets/Images/twitter.png')} style={{ width: 34, height: 34 }} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Login</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleLogin: {
    fontSize: 28,
    fontWeight: '500',
    color: '#333',
    marginBottom: 30,
  },
  inputField: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
  },
  buttonLogin: {
    backgroundColor: '#AD40AF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  textLogin: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
  },
});
