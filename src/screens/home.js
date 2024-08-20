import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { obtenermaterasapi } from '../apis/getmaterias';
import { getToken } from '../utils/storage';
import { Card, Title, Paragraph, Appbar } from 'react-native-paper';

const Home = () => {
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMaterias = useCallback(async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await obtenermaterasapi(token); // Pasar userId aquí
      console.log('Materias obtenidas:', response); // Verifica los datos recibidos
      setMaterias(response.materias);
    } catch (error) {
      console.error('Error fetching materias:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMaterias();
  }, [fetchMaterias]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMaterias();
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  console.log('Estado de materias después de la carga:', materias); // Verifica el estado de materias después de la carga

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Materias" />
      </Appbar.Header>
      <View style={styles.container}>
        <FlatList
          data={materias}
          keyExtractor={(item) => item.id_m} // Asegúrate de que item.id_m sea único y sea un string
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <Title style={styles.cardTitle}>{item.nombre_materia}</Title>
                <Paragraph>ID: {item.id_m}</Paragraph>
              </Card.Content>
            </Card>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Home;
