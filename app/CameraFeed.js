import React, { useEffect, useState } from 'react';
import { FlatList, Image, View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from './firebaseConfig';

const fetchImagesFromStorage = async () => {
  const storageRef = ref(storage, '');
  try {
    const imageList = await listAll(storageRef);
    const imageUrls = await Promise.all(
      imageList.items.map(item => getDownloadURL(item))
    );
    return imageUrls;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};

const ImageListScreen = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      const imageUrls = await fetchImagesFromStorage();
      setImages(imageUrls);
      setLoading(false);
    }
    fetchImages();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (images.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No images found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <Image style={styles.image} source={{ uri: item }} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    width: 400,
    height: 400,
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageListScreen;