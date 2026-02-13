import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "@/styles/explore.style";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";
import  * as ImagePicker  from 'expo-image-picker';
import { Image } from "expo-image";
import { colors } from "@/styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AVATAR_STORAGE_KEY = 'user_avatar';


export default function TabTwoScreen() {
  const { user, logout } = useAuth();
  const [avatarUri, setAvatarUri] = useState<string| null>(null);
const loadAvatar = async () => {
    try {
      const saveAvatar = await AsyncStorage.getItem(AVATAR_STORAGE_KEY);
      if (saveAvatar) {
        setAvatarUri(saveAvatar);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'avatar :', error);
    }
  };

  
  useEffect(() => {
    loadAvatar();
  }, []);



  const saveAvatar = async (uri: string) => {
    try {
      await AsyncStorage.setItem(AVATAR_STORAGE_KEY, uri);
    } catch (error) {

      console.error('Erreur lors de la sauvegarde de l\'avatar :', error);
     
    }
  };


  const handlePickImage = async () => {
    Alert.alert('Photo de profil','Choisissez une option',
      [
        {
      text : 'Prendre une photo',
      onPress : pickFromCamera
    },
    {
      text : 'Choisir dépuis la galerie',
      onPress :  pickFromGalerie,
    },
    {
      text : 'Annuler',
      onPress :  ()=>console.log('Cancel')
    },
    
    ]);
  };

  const  pickFromGalerie = async () => {

    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(status !== 'granted'){
      Alert.alert('Permission refusée','Nous avons besoin de la permission ')
    return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
       mediaTypes : ['images'],
       allowsEditing : true,
       aspect : [1,1],
       quality : 0.8,
      
    });
    if(!result.canceled && result.assets[0]){
      const  uri = result.assets[0].uri;
      setAvatarUri(uri);
      saveAvatar(uri);
      
    }
   
  }

  const  pickFromCamera = async () => {

    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    if(status !== 'granted'){
      Alert.alert('Permission refusée','Nous avons besoin de la permission ')
    return;
    }
    
    const result = await ImagePicker.launchCameraAsync({
       mediaTypes : ['images'],
       allowsEditing : true,
       aspect : [1,1],
       quality : 0.8,
    });
    if(!result.canceled && result.assets[0]){
      const  uri = result.assets[0].uri;
      setAvatarUri(uri);
      saveAvatar(uri); 
    }
  }



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.avatarContainer} onPress={handlePickImage}>
          
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
            ):(
               <View style={styles.avatarPlaceholder}>
            <Ionicons
              name="person"
              size={48}
              color={colors.primary}
            />
          </View>
            )}
           
          <View style={styles.editBadge}>
            <Ionicons name="camera-outline" size={18} color={colors.surface} />
          </View>
        </TouchableOpacity>

        <Text style={styles.email}>{user?.email}</Text>
      </View>
      <View style={styles.section}>
        <TouchableOpacity style={styles.buttonLogout}>
          <Ionicons name="log-out-outline" size={24} color="black" />
          <Text style={styles.logOutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
