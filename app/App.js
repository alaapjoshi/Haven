import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const Tab = createMaterialBottomTabNavigator();
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageListScreen from './CameraFeed';
import FirestoreDataScreen from './AlarmList';
import Map2 from './CommunityMap';

function HomeScreen() {
  return (
    <Map2/>
  );

}

function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={App2} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Community" component={HomeScreen} options={{
          tabBarLabel: 'Community',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-multiple" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
    </NavigationContainer>
  );
}
const App2 = () => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isInfoVisible1, setIsInfoVisible1] = useState(false);
  const [isArmed, setIsArmed] = useState(false);

  const toggleSwitch = () => {
    setIsArmed(previousState => !previousState);
  };

  const handlePress = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  const handlePress1 = () => {
    setIsInfoVisible1(!isInfoVisible1);
  };

  return (

    <View style={styles.container}>
          <Text style={{color:'#6a00ff', fontSize: 45,marginTop: 60}}>
          Haven
        </Text>
       
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>
          {isInfoVisible ? 'Hide Recent Alarms' : 'Show Recent Alarms'}
        </Text>
      </TouchableOpacity>
      {isInfoVisible && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            This is the additional information that you can view on the same page.
          </Text>
          <FirestoreDataScreen/>
        </View>
      )}

<TouchableOpacity style={styles.button} onPress={handlePress1}>
        <Text style={styles.buttonText}>
          {isInfoVisible1 ? 'Hide Camera Feed' : 'Show Camera Feed'}
        </Text>
      </TouchableOpacity>
      {isInfoVisible1 && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            This is the additional information that you can view on the same page.
          </Text>
          <ImageListScreen/>

        </View>
      )}
      <YoutubePlayer
  height={300}
  play={false}
  videoId={'iee2TATGMyI'}
  />
  <Text style={styles.label}>{isArmed ? 'Armed' : 'Disarmed'}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isArmed ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isArmed}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 5, 
    borderRadius: 5,
    marginTop:40, 
    marginBottom: 20,
    width: 300, 
    height: 30, 
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 75,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
  },
  infoText: {
    fontSize: 16,
  },
  label: {
    marginRight: 10,
    fontSize: 40,
  },
});

export default App
