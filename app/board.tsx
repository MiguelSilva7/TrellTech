import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, TextInput, ImageBackground, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const API_KEY = '1006ebc0b2b6e2431b065884d8d9d0a0';
const TOKEN = 'ATTA05a495bdded535f87ba28b9396a0ddf753d8782bccb50f34aee0d3003e166b5778945DEA';
// const BASE_URL = 'https://api.trello.com/1/organizations';

const BoardList = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newBoardName, setNewBoardName] = useState('');
  const [editingBoardId, setEditingBoardId] = useState(null);
  const [editedBoardName, setEditedBoardName] = useState('');

  useEffect(() => {
    fetchBoards();
  }, [id]);

  const fetchBoards = async () => {
    try {
      const response = await fetch(`https://api.trello.com/1/organizations/${id}/boards?key=${API_KEY}&token=${TOKEN}`);
      const data = await response.json();
      setBoards(data);e8ab3ab4b06fe3419febffc
      setLoading(false);
    } catch (error) {
      Alert.alert('Impossible de recup les broards');
    }
  };

  const createBoard = async () => {
    if (!newBoardName) {
      Alert.alert('BIP, Nom du board requis');
      return;
    }

    try {
      const response = await fetch(`https://api.trello.com/1/boards?key=${API_KEY}&token=${TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newBoardName, idOrganization: id })
      });
      const data = await response.json();
      setBoards([...boards, data]);
      setNewBoardName('');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de créer le board');
    }
  };

  const updateBoard = async (boardId) => {
    if (!editedBoardName) {
      Alert.alert('Erreur', 'Le nom du board est requis');
      return;
    }

    try {
      const response = await fetch(`https://api.trello.com/1/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editedBoardName })
      });
      const data = await response.json();
      setBoards(boards.map(board => (board.id === boardId ? data : board)));
      setEditingBoardId(null);
      setEditedBoardName('');
    } catch (error) {
      Alert.alert('Impossible de mettre à jour le board');
    }
  };

  const deleteBoard = async (boardId) => {
    try {
      const response = await fetch(`https://api.trello.com/1/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`, {
        method: 'DELETE', //suppr
      });
      if (response.ok) {
        setBoards(boards.filter(board => board.id !== boardId));
      } else {
        Alert.alert('IMpossible de suppr le board');
      }
    } catch (error) {
      Alert.alert('Impossible de suppre le board');
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/images/bg-auth.jpg')} 
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}
    >
      <Text className="text-2xl font-bold mb-5 text-white">Boards du Workspace</Text>
      <TextInput 
        placeholder="Nom du board" 
        value={newBoardName} 
        onChangeText={setNewBoardName} 
        className="border border-gray-300 p-3 w-4/5 mb-4 rounded-lg bg-white"
      />
      <TouchableOpacity 
        onPress={createBoard} 
        className="bg-green-500 p-3 rounded-lg mb-4"
      >
        <Text className="text-white text-center">Créer un Board</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <FlatList
          data={boards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="p-4 mb-3 bg-blue-800 rounded-lg">
              {editingBoardId === item.id ? (
                <TextInput
                  value={editedBoardName}
                  onChangeText={setEditedBoardName}
                  onBlur={() => updateBoard(item.id)}
                  autoFocus
                  className="border border-white p-2 bg-white text-black rounded-lg"
                />
              ) : (
                <Text className="text-white text-lg">{item.name}</Text>
              )}

              <View className="flex-row justify-between mt-2">
                <TouchableOpacity
                  onPress={() => {
                    setEditingBoardId(item.id);
                    setEditedBoardName(item.name);
                  }}
                  className="bg-yellow-500 p-3 rounded-lg"
                >
                  <Text className="text-white text-center"> Modifier</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => deleteBoard(item.id)}
                  className="bg-red-500 p-3 rounded-lg"
                >
                  <Text className="text-white text-center"> Supprimer</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push(`/test?boardId=${item.id}`)}
                  className="bg-blue-500 p-3 rounded-lg"
                >
                  <Text className="text-white text-center"> Voir les cartes</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </ImageBackground>
  );
};

export default BoardList;
