import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import { logout } from '../services/auth';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const navigation = useNavigation();
  const systemScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemScheme === 'dark');

  const toggleTheme = () => setIsDarkMode(prev => !prev);
  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  const handleLogout = async () => {
    await logout();
    navigation.replace('Login');
  };

  return (
    <View style={[styles.container, themeStyles.container]}>
      {/* Theme Toggle - Moon Icon */}
      <TouchableOpacity style={styles.themeToggleIcon} onPress={toggleTheme}>
        <Ionicons
          name={isDarkMode ? 'moon' : 'moon-outline'}
          size={24}
          color={isDarkMode ? '#fff' : '#333'}
        />
      </TouchableOpacity>

      {/* Title */}
      <Text style={[styles.title, themeStyles.title]}>Welcome to CitiAlert</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Report an Incident" onPress={() => navigation.navigate('ReportForm')} />
        <Button title="View Incident Feed" onPress={() => navigation.navigate('Feed')} />
        <Button title="About" onPress={() => navigation.navigate('About')} />
      </View>

      <Button title="Logout" onPress={handleLogout} color="red" />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('ReportForm')}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    position: 'relative',
  },
  themeToggleIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    gap: 10,
    marginBottom: 30,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#2196f3',
    borderRadius: 30,
    padding: 16,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Light Theme Styles
const lightStyles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  title: { color: '#333' },
});

// Dark Theme Styles
const darkStyles = StyleSheet.create({
  container: { backgroundColor: '#121212' },
  title: { color: '#fff' },
});
