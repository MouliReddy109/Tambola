import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./Dashboard"; // Your Dashboard component
import History from "./History"; // Your History component
import SettingsScreen from "./SettingsScreen"; // Your SettingsScreen component
import { Dimensions, StatusBar,Image } from "react-native"; // Import StatusBar for notification bar control
import { myStyles } from "../assets/styles";
const Stack = createNativeStackNavigator();

export default function Route() {
  const [isLandscape, setIsLandscape] = useState(false);

  // Check the initial screen orientation
  useEffect(() => {
    const onChange = () => {
      const window = Dimensions.get("window");
      setIsLandscape(window.width > window.height);
    };

    const dimensionsSubscription = Dimensions.addEventListener("change", onChange);

    // Check initial orientation
    onChange();

    // Cleanup the event listener on unmount
    return () => dimensionsSubscription.remove();
  }, []);

  return (
    <>
      {/* Transparent notification bar */}
      <StatusBar
        backgroundColor="black"
        barStyle="light-content" // Adjust text/icons color for visibility
      />
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: {
            backgroundColor: myStyles.topcolor, // Set Header background color
          },
          headerTitleAlign: "left", // Center the title
          headerTintColor: "#fff", // Header text color
          headerTitleStyle: {
            fontWeight: "600", // Header text style
            fontSize: 18, // Reduce the font size to make the header smaller
          },
        }}
      >
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerTitle: () => (
              <Image
                source={require("../assets/tambola.png")} // Path to your image
                style={{ width: 140, height: 40 }} // Adjust dimensions
              />
            ),
            headerTitleAlign: "center", // Center the image
          }}
        />

        <Stack.Screen
          name="History"
          component={History}
          options={{
            title: "History", // Set Header Title
            headerTitleAlign: "left",
          }}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            title: "Settings", // Set Header Title
            headerTitleAlign: "left",
            headerTintColor: "#fff", // Set Header text color
            headerTitleStyle: {
              fontWeight: "600", // Set Header text style
            },
          }}
        />
      </Stack.Navigator>
    </>
  );
}
