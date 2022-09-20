import * as Notification from 'expo-notifications';

export async function getPushNotificationToken() {
    const { granted } = await Notification.getPermissionsAsync();

    if(!granted){
        await Notification.requestPermissionsAsync();
    }

    if(granted){
        const pushtoken = Notification.getExpoPushTokenAsync();
        return  (await pushtoken).data;
    }
}