// Repositories.tsx
import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CaretLeft, Star } from 'phosphor-react-native';

const Repositories = () => {
  const route = useRoute<{ key: string; name: string; params: { repositoriesData?: any[] } }>();
  const { repositoriesData } = route.params || {};
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerIcon}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CaretLeft color = "black" size = {28}/>
        </TouchableOpacity>
        <Text style={styles.title}>Repositories</Text>
      </View>
    <ScrollView contentContainerStyle={styles.scroll}>
      {repositoriesData ? (
        repositoriesData.map((repo: any) => (
        <View key={repo.id} style={styles.repoItem}>
          <Text style={styles.repoName}>{repo.name}</Text>
          <Text style={styles.repoDescription}>{repo.description}</Text>
          <View style={styles.header}>
            <Text style={styles.repoLanguage}>{repo.language}</Text>
            
            <View style={styles.star}>
            <Star color = "#f39c12" size ={20}/>
              <Text style={styles.repoStars}>{repo.stargazers_count}</Text>
            </View>
            
          </View>
          
        </View>
       ))
       ) : (
         <Text>Nenhum repositório disponível.</Text>
       )}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scroll: {
    flexGrow: 1,
    backgroundColor: '#fff',
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
  repoItem: {
    marginTop: 10,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  repoName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  repoDescription: {
    marginTop: 5,
    color: '#666',
  },
  repoLanguage: {
    color: '#007bff',
  },
  header:{
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: "space-evenly"
  },
  repoStars: {
    marginLeft: 5,
    fontSize: 16,
    color: '#f39c12',
  },
  star:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  repoBranches: {
    marginTop: 5,
    color: '#27ae60',
  },
});

export default Repositories;
