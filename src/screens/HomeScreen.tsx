import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, FAB, Button } from 'react-native-paper';
import { formApi } from '../services/api';
import { Form } from '../types';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { authApi } from '../services/auth';
import { storage } from '../utils/storage';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }: any) {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const loadUser = async () => {
      const userData = await storage.getItem('user');
      setUser(userData);
    };
    loadUser();
  }, []);
  useFocusEffect(
    useCallback(() => {
      loadForms();
    }, [])
  );

  const loadForms = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await formApi.getForms();
      setForms(response);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load forms');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await authApi.logout();
    navigation.replace('Auth');
  };
  const handleDeleteForm = async (formId: string) => {
    try {
      await formApi.deleteForm(formId);
      loadForms(); 
    } catch (err: any) {
      console.error('Error deleting form:', err);
    }
  };

  const renderForm = ({ item }: { item: Form }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.description}</Paragraph>
        <View style={styles.cardActions}>
          <Button
            mode="text"
            onPress={() => navigation.navigate('Preview', { formId: item._id })}
          >
            Preview
          </Button>
          <Button
            mode="text"
            onPress={() => navigation.navigate('FormEditor', { formId: item._id })}
          >
            Edit
          </Button>
          <Button
            mode="text"
            onPress={() => handleDeleteForm(item._id!)}
            textColor="red"
          >
            Delete
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>{console.log(user)}
        {user && <Paragraph>Welcome, {user.name}</Paragraph>}
      </View>
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <FlatList
          data={forms}
          renderItem={renderForm}
          keyExtractor={(item) => item._id!}
          contentContainerStyle={styles.listContainer}
          refreshing={loading}
          onRefresh={loadForms}
        />
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('FormEditor')}
      />
      <Button onPress={handleLogout} style={styles.logoutButton}>
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  logoutButton: {
    margin: 'auto',
    marginBottom:20,
    width:'50%'
  },
});