// screens/AboutScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>About CitiAlert</Text>
      <Text style={styles.paragraph}>
        CitiAlert is a citizen reporting solution that empowers individuals to report and view incidents in real-time. 
        Whether it's an accident, public disturbance, or emergency situation — your report helps raise awareness and drive community response.
      </Text>
      <Text style={styles.paragraph}>
        Key Features:
        {'\n'}- Report incidents with images and live location
        {'\n'}- Browse incidents by category
        {'\n'}- Real-time feed updates
        {'\n'}- Dark mode and FAB for accessibility
        {'\n'}- Firebase secure login system
      </Text>
      <Text style={styles.footer}>Built with ReactNative and Firebase By salisuabdulsamad99@gmail.com</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 50, alignItems: 'center' },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  paragraph: { fontSize: 16, lineHeight: 24, marginBottom: 15, textAlign: 'center' },
  footer: { fontSize: 14, color: '#888', marginTop: 20 }
});
