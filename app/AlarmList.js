import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

const FirestoreDataScreen = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'COLLECTION_TO_ADD_TO'));
        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          const datetime = doc.data().datetime; 
          fetchedData.push({ id: doc.id, datetime }); 
        });
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {data.length === 0 ? (
        <Text>No data available</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <Text>{`ID: ${item.id}`}</Text>
              <Text>{`Datetime: ${item.datetime}`}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default FirestoreDataScreen;
