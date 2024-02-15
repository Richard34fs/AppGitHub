// Perfil.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BookmarkSimple, CaretLeft, House } from 'phosphor-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Perfil = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { profileData, repositoriesData } = route.params || {};
  const [isUserSaved, setIsUserSaved] = useState(false);

  const handleGoToRepositories = () => {
    navigation.navigate('Repositories', { repositoriesData });
  };

  useEffect(() => {
    // Verificar se o usuário está salvo ao carregar a página
    const checkIfUserIsSaved = async () => {
      try {
        const savedUsers = JSON.parse(await AsyncStorage.getItem('savedUsers')) || [];
        const isSaved = savedUsers.some((user: any) => user.id === profileData.id);
        setIsUserSaved(isSaved);
      } catch (error) {
        console.error('Erro ao verificar se o usuário está salvo:', error);
      }
    };

    checkIfUserIsSaved();
  }, [profileData.id]);
  
  const handleToggleSaveUser = async () => {
    try {
      // Obter a lista de usuários salvos
      let savedUsers = JSON.parse(await AsyncStorage.getItem('savedUsers')) || [];
  
      // Verificar se o usuário já está na lista antes de salvar ou remover
      const userIndex = savedUsers.findIndex((user: any) => user.id === profileData.id);
  
      if (userIndex === -1) {
        // Adicionar o usuário à lista com dados dos repositórios
        savedUsers.push({ ...profileData, repositories: repositoriesData, avatar_url: profileData.avatar_url });
      } else {
        // Remover o usuário da lista
        savedUsers.splice(userIndex, 1);
      }
  
      // Salvar a lista atualizada no AsyncStorage
      await AsyncStorage.setItem('savedUsers', JSON.stringify(savedUsers));
  
      // Atualizar o estado para refletir a mudança
      setIsUserSaved((prev) => !prev);
    } catch (error) {
      console.error('Erro ao salvar ou remover o usuário:', error);
    }
  };
  

  return (
    <View style = {styles.container}>

      <Image 
          style = {styles.imagePerfil}
          source={{ uri: profileData.avatar_url }}
      />

      <View style = {styles.header}>
          
          <View style = {styles.headerIcon}>
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                  <House color = "black" size = {28}/>
              </TouchableOpacity>

              <TouchableOpacity  onPress={handleToggleSaveUser}>
                  <BookmarkSimple 
                    color = "black" 
                    size = {28}
                    weight={isUserSaved ? 'fill' : 'regular'}
                />
              </TouchableOpacity>
          </View>

          <View style = {styles.headertexts}>
                  <Text style={{ fontSize: 40, fontWeight: "bold", color: "#25282B" }}>
                      {profileData.login}
                  </Text>
                  <Text style={{ color: "#c4c4c4" }}>
                      {profileData.name}
                  </Text>
                  <Text style={{ color: "#c4c4c4" }}>
                      {profileData.bio}
                  </Text>
                  
          </View>

      </View>
      
      <View style = {styles.container2}>

          <View style = {styles.follow}>
              <View style = {styles.followers}>
                  <Text style={{ fontSize: 20, color: "#25282B" }}>Followers</Text>
                  <Text style={{ fontSize: 20,color: "#2B92E4" }}>{profileData.followers}</Text>
              </View>

              <View style={{ height: 70, width: 2, backgroundColor: "#c4c4c4", marginBottom: 10 }}></View>

              <View style = {styles.following}>
                  <Text style={{ fontSize: 20, color: "#25282B" }}>Following</Text>
                  <Text style={{ fontSize: 20, color: "#2B92E4" }}>{profileData.following}</Text>
              </View>
          </View>
          
              <TouchableOpacity style={styles.button} onPress={handleGoToRepositories}>
                  <Text style={styles.buttonText}>See repositories</Text>
              </TouchableOpacity>

      </View>

        </View>
        
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        
    },
    header: {
        padding: 20,
    },
    headerIcon: {
        paddingTop: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
    imagePerfil: {
        position: "absolute",
        alignSelf: "stretch",
        width: "100%",
        height: 400,
    },    
    headertexts: {
        height: 260,
        justifyContent: "space-evenly",
        top: 320,
        alignItems: "stretch",
    },
    button: {
        alignSelf: "stretch",
        width: "auto",
        backgroundColor: "#00CC6A",
        height: 76,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 20,
    },
    container2: {
        flex: 1,
        justifyContent: "flex-end",
        padding: 20,
        flexDirection: "column",
    },
    follow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    followers: {
        alignItems: "center",
    },
    following: {
        alignItems: "center",
    },
});

export default Perfil;
