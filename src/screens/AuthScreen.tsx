import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, } from 'react-native';
import {  Button, Title, TextInput,} from 'react-native-paper';
import { authApi } from '../services/auth';
import { ErrorMessage } from '../components/common/ErrorMessage';

export default function AuthScreen({ navigation }: any) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setError('');
      setLoading(true);
      console.log(isLogin)
      if (isLogin) {
        await authApi.login(email, password);
      } else {
        await authApi.register(name, email, password);
      }

      navigation.replace('Home');
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred'+err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Title style={styles.title}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </Title>

        {!isLogin && (
          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}

          />
        )}

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />

        {error && <ErrorMessage message={error} />}

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          {isLogin ? 'Login' : 'Register'}
        </Button>

        <Button
          mode="text"
          onPress={() => setIsLogin(!isLogin)}
          style={styles.switchButton}
        >
          {isLogin
            ? "Don't have an account? Register"
            : 'Already have an account? Login'}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
  },
  switchButton: {
    marginTop: 8,
  },
});