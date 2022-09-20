import { useRef, useEffect } from 'react';
import { View, StatusBar } from 'react-native';

import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter';
import { Subscription } from 'expo-modules-core';
import * as Notification from 'expo-notifications';

import { Background } from './src/components/background';
import { Routes } from './src/routes';
import { Loading } from './src/components/loading';
import './src/services/notificationConfigs';
import { getPushNotificationToken } from './src/services/getNotificationPushToken';



export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black
  });

  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  /*Necessário estar logado para poder utilizar o serviço de notificação do Expo*/
  useEffect(() => {
    getPushNotificationToken()
  });


  useEffect(() => {
    getNotificationListener.current = Notification.addNotificationReceivedListener(notification => {

    });
    responseNotificationListener.current = Notification.addNotificationResponseReceivedListener(response => {

    });

    return () => {
      if(getNotificationListener.current && responseNotificationListener.current){
        Notification.removeNotificationSubscription(getNotificationListener.current);
        Notification.removeNotificationSubscription(responseNotificationListener.current);
      }
    }
  }, []);

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}


