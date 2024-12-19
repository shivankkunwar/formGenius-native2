import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import FormEditorScreen from '../screens/FormEditorScreen';
import PreviewScreen from '../screens/PreviewScreen';
import ResponsesScreen from '../screens/ResponsesScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'My Forms' }}
        />
        <Stack.Screen
          name="FormEditor"
          component={FormEditorScreen}
          options={({ route }: any) => ({
            title: route.params?.formId ? 'Edit Form' : 'Create Form',
          })}
        />
        <Stack.Screen
          name="Preview"
          component={PreviewScreen}
          options={{ title: 'Preview Form' }}
        />
         <Stack.Screen
          name="Responses"
          component={ResponsesScreen}
          options={{ title: 'Responses' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}