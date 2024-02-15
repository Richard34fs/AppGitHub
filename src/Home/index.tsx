// Home.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { BookmarkSimple, MagnifyingGlass, UserCircle } from 'phosphor-react-native';


const Home = () => {
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  const handleSearch = async () => {
    try {
      const profileResponse = await axios.get(`https://api.github.com/users/${username}`);
      const repositoriesResponse = await axios.get(`https://api.github.com/users/${username}/repos`);

      const profileData = profileResponse.data;
      const repositoriesData = repositoriesResponse.data;

      navigation.navigate('Perfil', { profileData, repositoriesData});
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoToSavedUsers = () => {
    navigation.navigate('SavedUsers');
  };
  return (
    <View style={styles.container}>

      <View style={styles.headerOptions}>
        <TouchableOpacity onPress={handleGoToSavedUsers}>
          <BookmarkSimple size={28} weight = "bold" color = "#25282B"/>
        </TouchableOpacity>

        <TouchableOpacity>
          <UserCircle size={40} weight = "regular" color = "#25282B"/>
        </TouchableOpacity>
      </View>
      
      <Text style = {styles.headerText}>
        <Text style = {styles.bold}>Find</Text> a dev
      </Text>

        <View style = {styles.containerImput}>
          <TextInput
            style={styles.input}
            placeholderTextColor="#CACCCF" 
            placeholder="Search a dev" 
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <MagnifyingGlass size={32} weight = "bold" />
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Find</Text>
        </TouchableOpacity>
      


      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  headerOptions: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 30,
      alignItems: "center",
  },
  headerText: {
      fontSize: 40,
      color: "#A0A4A8",
      top: 90,
      height: 56,
  },
  bold: {
      color: "#25282B"
  },
  containerImput:{
      backgroundColor: "#F6F6F6",
      alignSelf: "stretch",
      width: "auto",
      height: 76,
      top: 100,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      borderRadius: 8,
      padding: 20,

  },
  button: {
      backgroundColor: "#4485FD",
      alignSelf: "stretch",
      width: "auto",
      height: 76,
      top: 120,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
  },
  buttonText: {
      color: "#FFF",
      fontSize: 20,
  },
  input:{
      color: 'black',
      width: '80%',


  },
});

export default Home;
