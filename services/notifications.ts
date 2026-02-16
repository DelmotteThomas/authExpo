import * as Notification from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { api } from "@/services/api";

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const registerForPushNotificationsAsync = async (): Promise<
  string | null
> => {
  let token: string | null = null;
  if (!Device.isDevice) {
    console.log("Les notifications push necessice un appareil physique");
    return null;
  }

  if (Platform.OS === "android") {
    await Notification.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notification.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  if (Platform.OS === "ios") {
  }

  const { status: existingStatus } = await Notification.getPermissionsAsync();
  // on récupére les permission

  let finalStatus = existingStatus;
  // si pas de perm, on demande si on peut l'avoir
  if (existingStatus !== "granted") {
    const { status } = await Notification.requestPermissionsAsync();
    finalStatus = status;
  }

  // Si pas de permission , on consol log
  if (finalStatus !== "granted") {
    console.log("Permission non accordée");
    return null;

    // 2eme solution serait de sauvegarder la notif dans le phone. car c'est pas du push.
    // on pourrait dire la notification apparait quand on ouvre l'appli par exemple.
  }
  try {
    const projectId = Constants.expoConfig?.extra?.eas.projectId;
    const pushToken = await Notification.getExpoPushTokenAsync({
      // ID du projet sur le serveur expo
      // possibilité de build sur expo sur leur serveur pour preservé la machine)
      projectId,
    });
    token = pushToken.data;
    console.log("Push token:", token);
  } catch (error) {
    console.log("Erreur obtention push token", error);
  }

  return token;
};

// enregister notre token dans le backend

export async function registerAndSavePushToken(): Promise<boolean> {
  const token = await registerForPushNotificationsAsync();
  if (token) {
    try {
      await api.savePushToken(token);
      return true;
    } catch (error) {
      console.error("erreur de sauvegarde", error);
      return false;
    }
  }
  return false;
}


export function addNotificationReceivedListener(
     callback : (notification :Notification.Notification)=>void,
    ){
        return Notification.addNotificationReceivedListener(callback);
    }
    
// Ecouter les notification cliquer
export function addNotificationResponseReceivedListener(
    callback : (notification :Notification.NotificationResponse)=>void,
){
    return Notification.addNotificationResponseReceivedListener(callback);
}