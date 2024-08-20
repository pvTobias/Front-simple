// NewSubject.js
import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Platform, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import Input from '../components/input';
import { addMateria } from '../config/urlapis'; 
import { useNavigation } from '@react-navigation/native';
import { getValueFor } from '../utils/storage';

const NewSubject = () => {
  const [nombre, setNombre] = useState('');
  const navigation = useNavigation();

  const handleSave = async () => {
    if (!nombre) {
      Alert.alert('Error', 'Por favor, ingresa el nombre de la materia.');
      return;
    }

    try {
      const token = await getValueFor("token");
      const response = await fetch(addMateria, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'mani': token,
        },
        body: JSON.stringify({ nombre_materia: nombre }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'La materia ha sido guardada correctamente.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ]);
        setNombre(''); // Limpiar el input después de guardar
      } else {
        Alert.alert('Error', data.message || 'Error al guardar la materia.');
      }
    } catch (error) {
      console.error("Error saving subject:", error);
      Alert.alert('Error', 'No se pudo guardar la materia. Verifica tu conexión a internet e intenta nuevamente.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Nueva Materia</Text>
        <Input 
          label="Nombre de la Materia" 
          value={nombre} 
          onChange={setNombre} 
          icon="book"
        />
        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.saveButton}
        >
          Guardar
        </Button>
        {/* Botón opcional para volver manualmente a Home */}
        {/* <Button
          onPress={() => navigation.navigate('Home')}
          title="Volver a Home"
        /> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 25 : 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  saveButton: {
    marginTop: 20,
  },
});

export default NewSubject;
