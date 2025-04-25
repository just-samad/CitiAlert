// screens/ReportFormScreen.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, Alert, Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { db, storage } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function ReportFormScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Function to handle image selection
  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need access to your photo library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Function to get user location
  const handleGetLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required.');
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };

  // Function to upload the image to Firebase Storage
  const uploadImageAsync = async (uri) => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(new TypeError('Network request failed'));
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const storageRef = ref(storage, `incidentImages/${filename}`);
      const snapshot = await uploadBytes(storageRef, blob);
      blob.close();

      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      throw new Error('Image upload failed');
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !category || !image || !location) {
      Alert.alert('Missing Info', 'Please fill out all fields and attach location/image.');
      return;
    }

    setUploading(true);
    try {
      const imageUrl = await uploadImageAsync(image);

      await addDoc(collection(db, 'incidents'), {
        title,
        description,
        category,
        imageUrl,
        location,
        createdAt: serverTimestamp(),
      });

      Alert.alert('Success', 'Incident submitted successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Error submitting:', error);
      Alert.alert('Error', 'Failed to submit incident. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report an Incident</Text>
      <TextInput
        style={styles.input}
        placeholder="Incident Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Category (e.g., Accident, Fighting, Rioting)"
        value={category}
        onChangeText={setCategory}
      />

      <Button title="Attach Image" onPress={handlePickImage} />
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      <Button title="Get Location" onPress={handleGetLocation} />
      {location && (
        <Text style={styles.coords}>
          Lat: {location.latitude.toFixed(4)}, Lon: {location.longitude.toFixed(4)}
        </Text>
      )}

      <Button
        title={uploading ? 'Submitting...' : 'Submit Report'}
        onPress={handleSubmit}
        disabled={uploading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, marginTop: 50 },
  title: { fontSize: 22, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 15, }, imagePreview: { width: 150, height: 150, marginTop: 10 }, coords: { fontSize: 14, marginTop: 10, color: '#555' }, 
  });