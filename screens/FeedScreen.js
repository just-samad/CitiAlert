// screens/FeedScreen.js
import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, Button, StyleSheet, TextInput, TouchableOpacity, Image
} from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function FeedScreen({ navigation }) {
  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [searchCategory, setSearchCategory] = useState('');

  useEffect(() => {
    const loadIncidents = async () => {
      // Add default incidents (just for testing purposes)
      const defaultIncidents = [
        { id: '1', title: 'Car Accident', category: 'Accident', description: 'A car accident occurred on Highway 25.', imageUrl: 'https://via.placeholder.com/150', location: { latitude: 40.7128, longitude: -74.0060 } },
        { id: '2', title: 'Fight at Park', category: 'Fighting', description: 'Two people got into a fight at the park.', imageUrl: 'https://via.placeholder.com/150', location: { latitude: 40.730610, longitude: -73.935242 } },
        { id: '3', title: 'Rioting in City Center', category: 'Rioting', description: 'Riots broke out in the city center, causing major disruption.', imageUrl: 'https://via.placeholder.com/150', location: { latitude: 40.730610, longitude: -73.935242 } },
        // You can add more default incidents for testing.
      ];
      
      // Simulating fetching incidents from Firestore (for demo)
      setIncidents(defaultIncidents);
      setFilteredIncidents(defaultIncidents);
    };

    loadIncidents();
  }, []);

  const handleSearch = (text) => {
    setSearchCategory(text);
    if (text === '') {
      setFilteredIncidents(incidents);
    } else {
      const filtered = incidents.filter((incident) =>
        incident.category.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredIncidents(filtered);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.incidentCard} onPress={() => alert('Navigating to incident details')}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.category}>Category: {item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Browse Incidents</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search by category..."
        value={searchCategory}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredIncidents}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <Button
        title="Report Incident"
        onPress={() => navigation.navigate('ReportForm')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: 50,
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  incidentCard: {
    flexDirection: 'row',
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#ddd',
  },
  image: {
    width: 100,
    height: 100,
  },
  cardContent: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginVertical: 5,
  },
  category: {
    fontSize: 12,
    color: '#888',
  },
});
