import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === 'iso' ? -44 : 0}
          >
            <Stack.Navigator>
              <Stack.Screen 
                name="HomeScreen"
                component={HomeScreen}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen 
                name="MapScreen"
                component={MapScreen}
                options={{
                  headerShown: false
                }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
