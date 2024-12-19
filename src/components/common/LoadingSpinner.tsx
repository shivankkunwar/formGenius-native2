import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export const LoadingSpinner = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#6200ee" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});