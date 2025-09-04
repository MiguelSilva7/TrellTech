import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';

const Auth = () => {
  return (
    <ImageBackground 
      source={require('../../assets/images/bg-auth.jpg')} 
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width:390,height:844 }}
    >
      <Image 
        source={require('../../assets/images/logo.png')} 
        style={{ width: 230, height: 230, marginBottom: 40, bottom:30 }}
        resizeMode="contain"
      />      

      <TouchableOpacity
        style={{
          backgroundColor: '#007BFF',
          paddingVertical: 15,
          paddingHorizontal: 30,
          borderRadius: 8
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
          Se connecter avec Trello
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Auth;
