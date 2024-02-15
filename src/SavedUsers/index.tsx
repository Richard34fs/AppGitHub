// SavedUsers.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { CaretLeft } from 'phosphor-react-native';

const SavedUsers = () => {
  const navigation = useNavigation();
  const [savedUsers, setSavedUsers] = useState([]);

  useEffect(() => {
    // Obter a lista de usuários salvos ao carregar a página
    const fetchSavedUsers = async () => {
      try {
        const users = JSON.parse(await AsyncStorage.getItem('savedUsers') ?? '') || [];
        setSavedUsers(users);
      } catch (error) {
        console.error('Erro ao obter os usuários salvos:', error);
      }
    };

    fetchSavedUsers();
  }, []);

  const handleViewUser = (user) => {
    // Navegar para a página de perfil com os dados do usuário e repositórios
    navigation.navigate('Perfil', { profileData: user, repositoriesData: user.repositories });
  };

  return (
<View  style={styles.container}>
    <View style={styles.headerIcon}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CaretLeft color = "black" size = {28}/>
        </TouchableOpacity>
        <Text style={styles.title}>Saved</Text>
      </View>

    <FlatList
      data={savedUsers}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleViewUser(item)}>
          <View style={styles.userItem}>
            <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
            <Text style={styles.name}>  {item.login}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userItem: {
    height: 100,
    marginTop: 10,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: "stretch",
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  headerIcon: {
    paddingTop: 30,
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: "#25282B",
  },
  name: {
    fontSize: 25,
  }
});

export default SavedUsers;
