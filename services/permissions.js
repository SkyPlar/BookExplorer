import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import * as MediaLibrary from 'expo-media-library';

export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    return { ok: false, error: 'Push notifications require a physical device.' };
  }
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    return { ok: false, error: 'Permission denied' };
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return { ok: true, token };
}

export async function requestMediaLibraryPermission() {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  return status === 'granted';
}
