import React from "react";
import { View, Text, Image, StyleSheet, StatusBar } from "react-native";
import splashgif from "../assets/tambola.png";
import { useFonts } from "expo-font";

const IntroScreen = () => {
  const [fontsLoaded, error] = useFonts({
    aristotelica: require("../assets/fonts/aristotelica.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {/* Set the StatusBar */}
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Image source={splashgif} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.fromtext}>from</Text>
          <Text style={styles.bournetext}>bourneSoftech</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7b5a99", // Optional: Set background color for better appearance
  },
  image: {
    width: "80%", // Adjust width proportionally to the screen
    height: undefined, // Let height adjust automatically to maintain aspect ratio
    aspectRatio: 1024 / 368, // Maintain image aspect ratio
    resizeMode: "contain", // Ensure the image fits well
  },
  textContainer: {
    position: "absolute",
    bottom: 20,
    alignItems: "center", // Center the text horizontally
  },
  bournetext: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "aristotelica",
    textAlign: "center",
    marginBottom: 10,
  },
  fromtext: {
    color: "#fff",
    fontSize: 13,
    marginTop: 10,
    textAlign: "center",
    marginBottom: 5,
    fontWeight: "400",
  },
});

export default IntroScreen;
