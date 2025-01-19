import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Route from "./components/Route"; // Your custom navigator
import IntroScreen from "./components/IntroScreen"; // Your splash/intro screen

export default function App() {
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);

  // Hide splash screen after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashScreenVisible(false);
    }, 2000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  // Render the splash screen or the main navigation container
  return isSplashScreenVisible ? (
    <IntroScreen />
  ) : (
    <NavigationContainer>
      <Route />
    </NavigationContainer>
  );
}
