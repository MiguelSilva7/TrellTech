import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, TextInput, ImageBackground, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const API_KEY = '1006ebc0b2b6e2431b065884d8d9d0a0';
const TOKEN = 'ATTA05a495bdded535f87ba28b9396a0ddf753d8782bccb50f34aee0d3003e166b5778945DEA';
const BASE_URL = 'https://api.trello.com/1';

const TestScreen = () => {
  const { boardId } = useLocalSearchParams();
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedList, setSelectedList] = useState(null);
  const [newListName, setNewListName] = useState('');
  const [newCardName, setNewCardName] = useState('');
  const [editingListId, setEditingListId] = useState(null);
  const [editedListName, setEditedListName] = useState('');

  useEffect(() => {
    fetchLists();
  }, [boardId]);

  const fetchLists = async () => {
    try {
      const response = await fetch(`${BASE_URL}/boards/${boardId}/lists?key=${API_KEY}&token=${TOKEN}`);
      const data = await response.json();
      setLists(data);
      setLoading(false);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de récupérer les listes');
    }
  };

  const fetchCards = async (listId) => {
    setSelectedList(listId);
    try {
      const response = await fetch(`${BASE_URL}/lists/${listId}/cards?key=${API_KEY}&token=${TOKEN}`);
      const data = await response.json();
      setCards(data);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de récupérer les cartes');
    }
  };

  const createList = async () => {
    if (!newListName) return;
    try {
      const response = await fetch(`${BASE_URL}/lists?key=${API_KEY}&token=${TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newListName, idBoard: boardId })
      });
      const data = await response.json();
      setLists([...lists, data]);
      setNewListName('');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de créer la liste');
    }
  };

  const deleteList = async (listId) => {
    try {
      await fetch(`${BASE_URL}/lists/${listId}/closed?key=${API_KEY}&token=${TOKEN}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: true })
      });
      setLists(lists.filter(list => list.id !== listId));
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de supprimer la liste');
    }
  };

  const updateList = async (listId) => {
    if (!editedListName) return;
    try {
      const response = await fetch(`${BASE_URL}/lists/${listId}?key=${API_KEY}&token=${TOKEN}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editedListName })
      });
      const data = await response.json();
      setLists(lists.map(list => list.id === listId ? data : list));
      setEditingListId(null);
      setEditedListName('');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de mettre à jour la liste');
    }
  };

  const createCard = async () => {
    if (!newCardName || !selectedList) return;
    try {
      const response = await fetch(`${BASE_URL}/cards?key=${API_KEY}&token=${TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCardName, idList: selectedList })
      });
      const data = await response.json();
      setCards([...cards, data]);
      setNewCardName('');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de créer la carte');
    }
  };

  const deleteCard = async (cardId) => {
    try {
      await fetch(`${BASE_URL}/cards/${cardId}?key=${API_KEY}&token=${TOKEN}`, {
        method: 'DELETE'
      });
      setCards(cards.filter(card => card.id !== cardId));
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de supprimer la carte');
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/images/bg-auth.jpg')} 
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}
    >
      <TextInput 
        placeholder="Nom de la liste" 
        value={newListName} 
        onChangeText={setNewListName} 
        className="border border-gray-300 p-3 w-4/5 mb-4 rounded-lg bg-white"
      />
      <TouchableOpacity onPress={createList} className="bg-green-500 p-3 rounded-lg mb-4">
        <Text className="text-white text-center">Créer une Liste</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="p-4 mb-3 bg-blue-800 rounded-lg">
              {editingListId === item.id ? (
                <TextInput
                  value={editedListName}
                  onChangeText={setEditedListName}
                  onBlur={() => updateList(item.id)}
                  autoFocus
                  className="border border-white p-2 bg-white text-black rounded-lg"
                />
              ) : (
                <Text className="text-white text-lg">{item.name}</Text>
              )}

              <View className="flex-row justify-between mt-2">
                {editingListId === item.id ? (
                  <TouchableOpacity onPress={() => updateList(item.id)} className="bg-yellow-500 p-3 rounded-lg">
                    <Text className="text-white text-center">Sauvegarder</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => setEditingListId(item.id)} className="bg-yellow-500 p-3 rounded-lg">
                    <Text className="text-white text-center">Modifier</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity onPress={() => deleteList(item.id)} className="bg-red-500 p-3 rounded-lg">
                  <Text className="text-white text-center">Supprimer</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => fetchCards(item.id)} className="bg-blue-500 p-3 rounded-lg">
                  <Text className="text-white text-center">Voir les cartes</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {selectedList && (
        <>
          <TextInput 
            placeholder="Nom de la carte" 
            value={newCardName} 
            onChangeText={setNewCardName} 
            className="border border-gray-300 p-3 w-4/5 mb-4 rounded-lg bg-white"
          />
          <TouchableOpacity onPress={createCard} className="bg-green-500 p-3 rounded-lg mb-4">
            <Text className="text-white text-center">Créer une Carte</Text>
          </TouchableOpacity>
          <FlatList
            data={cards}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="p-4 mb-2 bg-blue-300 rounded-lg border-2 border-blue-900">
                <Text className="text-lg font-semibold text-center text-blue-900">{item.name}</Text>
                <TouchableOpacity onPress={() => deleteCard(item.id)} className="bg-red-500 p-3 rounded-lg mt-2">
                  <Text className="text-white text-center">Supprimer</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}
    </ImageBackground>
  );
};

export default TestScreen;
