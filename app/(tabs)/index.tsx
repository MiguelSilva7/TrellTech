import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, TextInput, ImageBackground, Alert } from 'react-native';
import { useRouter } from 'expo-router';
// import { API_KEY, TOKEN, API_BASE_URL } from '@env'; // essai du dotenv.
// import Constants from 'expo-constants';  // essai du expo constant.


const API_KEY = '1006ebc0b2b6e2431b065884d8d9d0a0';
const TOKEN = 'ATTA05a495bdded535f87ba28b9396a0ddf753d8782bccb50f34aee0d3003e166b5778945DEA';
const API_BASE_URL = 'https://api.trello.com/1/organizations';


// const { API_BASE_URL, API_KEY,TOKEN } = Constants.expoConfig.extra;
console.log("API Key:", API_KEY);
console.log("Token:", TOKEN);
console.log("URL:", API_BASE_URL);

const WorkspaceList = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const response = await fetch(`https://api.trello.com/1/members/me/organizations?key=${API_KEY}&token=${TOKEN}`);
      const data = await response.json();
      setWorkspaces(data);
      setLoading(false);
    } catch (error) {
      Alert.alert('Aucun workspace');
    }
  };

  const createWorkspace = async () => {
    if (!newWorkspaceName) {
      Alert.alert('Ajoutez un nom de workspace');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}?key=${API_KEY}&token=${TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: newWorkspaceName }),
      });
      const data = await response.json();
      setWorkspaces([...workspaces, data]);
      setNewWorkspaceName('');
    } catch (error) {
      Alert.alert('Aucun Workspace');
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/bg-auth.jpg')} 
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 390, height: 844 }}
    >      
      <Text className="text-2xl text-blue-800 font-bold mt-32 mb-4 text-center">
        Workspaces Trello
      </Text>

      <TextInput
        placeholder="Nom workspace"
        value={newWorkspaceName}
        onChangeText={setNewWorkspaceName}
        className="border-2 border-gray-300 p-2 rounded-lg w-80 mb-2"
      />
      <TouchableOpacity className="bg-green-500 p-3 rounded-lg mb-2" onPress={createWorkspace}>
        <Text className="text-white text-center">Créer un Workspace</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <FlatList
          data={workspaces}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="p-4 px-8 rounded-lg mb-2 bg-blue-800"
              onPress={() => router.push(`/board?id=${item.id}`)}
            >
              <Text className="text-lg text-center font-semibold text-white">
                {item.displayName}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </ImageBackground>
  );
};

export default WorkspaceList;
