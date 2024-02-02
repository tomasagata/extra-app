import { PermissionsAndroid } from "react-native";
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { useCallback, useEffect, useState } from "react";
import { postToApi } from "../utils/fetching";
import NotificationsRegistrationError from "../errors/NotificationsRegistrationError";
import notifee from '@notifee/react-native';
import { useQueryClient } from "@tanstack/react-query";








// ***********************************
//
//  Functions
//
// ***********************************

/**
 * Checks and requests to use notifications if necessary.
 * @returns true if permissions were granted, false otherwise
 */
async function requestNotificationsPermission_android(): Promise<boolean> {
  let granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  if(granted){
    return true;
  }

  console.log("Notifications: Permission request sent")
  let status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    {
      title: "Allow Notifications",
      message: "Notifications help in alerting of recurrent deposits",
      buttonPositive: "Allow"
    }
  );

  if(status == PermissionsAndroid.RESULTS.GRANTED){
    console.log("Notifications: Permission was granted");
    return true;
  }
  console.log("Notifications: Permission was denied");
  return false;
}

async function onMessageHandler(message: FirebaseMessagingTypes.RemoteMessage) {
  console.log("Message received: " + JSON.stringify(message));

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: message.notification?.title,
    body: message.notification?.body,
    android: {
      channelId,
      smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });

}

async function onNotificationOpenedAppHandler(message: FirebaseMessagingTypes.RemoteMessage) {
  console.log("Message opened app: " + JSON.stringify(message))
}

function registerDevice(fcmToken: string): Promise<ApiResponse> {
  return postToApi("/registerDevice", {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: fcmToken
    })
  });
}

function deregisterDevice(fcmToken: string): Promise<ApiResponse> {
  return postToApi("/unregisterDevice", {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: fcmToken
    })
  });
}




// ***********************************
//
//  Custom Hooks
//
// ***********************************

/**
 * Hook that allows manual register and unregister of notifications.
 * Requests permission to OS if necessary.
 * 
 * @example
 * const { register, deregister } = useNotifications();
 * register(); // Register new device
 * deregister(); // deregister current device
 */
export function useNotifications() {

  const initRegisterFlow = useCallback(async () => {
    // Check for Notification permission
    // Code block 1
    const notificationsAllowed = await requestNotificationsPermission_android();

    // If Notifications are not allowed
    // then return
    // unsuccessful exit block 1
    if (!notificationsAllowed){
      return Promise.reject(
        new NotificationsRegistrationError("Notifications are blocked")
      );
    }

    // Check for FCM permission
    // code block 2
    var authStatus = await messaging().hasPermission();
    
    // If FCM permission was never requested
    // then request FCM permission
    // code block 3
    if (
      authStatus === messaging.AuthorizationStatus.NOT_DETERMINED || 
      authStatus === messaging.AuthorizationStatus.DENIED
    ) {
      authStatus = await messaging().requestPermission();
    }

    // if permission was requested and is blocked
    // then return
    // unsuccessful exit block 2
    if (authStatus === messaging.AuthorizationStatus.DENIED) {
      return Promise.reject(
        new NotificationsRegistrationError("FCM Permission denied")
      );
    }

    // get token from FCM
    // code block 4
    const token = await messaging().getToken();

    // if no token was available or couldn't be generated
    // then return
    // unsuccessful exit block 3
    if (token == null) {
      return Promise.reject(
        new NotificationsRegistrationError("Couldn't get token from Firebase")
      );
    }

    // Post registration request to api
    // code block 5
    return registerDevice(token).catch(() => Promise.reject(
      new NotificationsRegistrationError("Couldn't register device on api")
    ));
  }, []);

  const initDeregisterFlow = useCallback(async () => {
    // Get token from FCM
    // code block 1
    const token = await messaging().getToken();

    // if no token was available
    // then return
    // unsuccessful exit block 2
    if (token == null){
      return Promise.reject(
        new NotificationsRegistrationError("Couldn't get token from Firebase")
      );
    }

    // Post deregistration request to api
    // code block 2
    return deregisterDevice(token).catch(() => Promise.reject( 
      new NotificationsRegistrationError("Couldn't unregister device on api")
    ));
    
  }, []);

  const register = useCallback(() => {
    initRegisterFlow().then(() => {
      console.log("Notifications: registered successfully");
    }).catch((registerError: NotificationsRegistrationError) => {
      requestNotificationsPermission_android();
      console.error(registerError);
    });
  }, [initRegisterFlow]);

  const deregister = useCallback(() => {
    initDeregisterFlow().then(() => {
      console.log("Notifications: deregistered successfully");
    }).catch((registerError: NotificationsRegistrationError) => {
      console.error(registerError);
    });
  }, [initDeregisterFlow]);
  
  return {
    register,
    deregister
  };
}

/**
 * Hook to handle Firebase Cloud Messaging notifications.
 * Should be used once in the App Component.
 */
export function useNotificationHandler() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribeOnMessage = messaging().onMessage(msg => (onMessageHandler(msg).then(() => queryClient.invalidateQueries())));
    const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp(onNotificationOpenedAppHandler);

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
    };
  }, []);
}
