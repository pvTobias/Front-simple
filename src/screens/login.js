import React, { useState } from 'react';
import { SafeAreaView, View, Text, ImageBackground, StyleSheet, Platform, Image, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import Input from '../components/input';
import PassInput from '../components/passinput';
import { loginApi } from '../apis/login'; // Asegúrate de importar la función loginApi correctamente
import { save } from '../utils/storage'; // Asegúrate de importar la función save correctamente
import { useNavigation } from '@react-navigation/native'; // Importamos useNavigation

const Login = () => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Obtenemos la navegación

  const handleLogin = async () => {
    if (!dni || !password) {
      Alert.alert('Error', 'Por favor, ingresa el nombre de usuario y la contraseña.');
      return;
    }

    try {
      const data = await loginApi(dni, password);
      console.log("Data:", data);
      if (data.success) {
        Alert.alert('Éxito', 'Has iniciado sesión correctamente.');
        await save("token", data.token); // Guardamos el token en el almacenamiento seguro
        navigation.navigate("tabs");
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrecta. Por favor, verifica tus credenciales e intenta nuevamente.');
      }
    } catch (error) {
      console.error("Error logging in:", error);
      Alert.alert('Error', 'No se pudo iniciar sesión. Verifica tu conexión a internet e intenta nuevamente.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/fordgt.jpg')}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <View style={styles.overlay} />
        <View style={styles.container}>
          <View style={styles.topSpace} />
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/rangopomerumpel.png')}
              style={styles.logo}
            />
            <Text style={styles.greetingText}>
              Inicia sesión
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Input 
              label="Nombre de Usuario" 
              value={dni} 
              onChange={setDni} 
              icon="account"
            />
            <PassInput 
              label="Contraseña" 
              value={password} 
              onChange={setPassword} 
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.loginButton}
            >
              Ingresar
            </Button>
            <Button
              mode="outlined"
              onPress={() => {
                navigation.navigate("crearCuenta")
              }}
              style={styles.createAccountButton}
            >
              Crear Cuenta
            </Button>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'android' ? 25 : 0,
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semi-transparente
  },
  topSpace: {
    flex: 0.1, // Espacio superior ajustable
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.4, // Espacio para el logo ajustable
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // Texto blanco sobre fondo oscuro
    marginBottom: 20,
  },
  inputContainer: {
    flex: 0.3, // Espacio para los inputs ajustable
    padding: 10,
  },
  buttonContainer: {
    flex: 0.2, // Espacio para los botones ajustable
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    width: '80%',
  },
  createAccountButton: {
    marginTop: 10, // Margen superior ajustable
  },
});

export default Login;
