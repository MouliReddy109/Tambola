import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library
import { useNavigation } from "@react-navigation/native"; // For navigation
import * as Speech from "expo-speech"; // Import expo-speech
import Toast from 'react-native-toast-message'; // Import the Toast library
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import { myStyles } from "../assets/styles";

export default function TambolaHost() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [lastGenerated, setLastGenerated] = useState(null);
  const [itemSize, setItemSize] = useState(60); // Default item size
  const [isSpeakerOn, setIsSpeakerOn] = useState(true); // Speaker is ON by default
  const [isAutoEnabled, setIsAutoEnabled] = useState(false); // Auto mode disabled by default
  const isSpeakerOnRef = useRef(isSpeakerOn); // Ref to track speaker state
  const navigation = useNavigation();
  const shareViewRef = useRef(null);
  const numbers = Array.from({ length: 90 }, (_, i) => i + 1);
  const handleShare = async () => {
    try {
      if (!(await Sharing.isAvailableAsync())) {
        alert(`Uh oh, sharing isn't available on your platform`);
        return;
      }

      if (shareViewRef.current) {
        const uri = await captureRef(shareViewRef.current, {
          format: 'png',
          quality: 0.8,
        });

        // Create a new file name
        const fileName = FileSystem.documentDirectory + 'tambola_snapshot.png';

        // Move the captured file to the correct location with the new name
        await FileSystem.moveAsync({
          from: uri,
          to: fileName,
        });

        console.log('Tambola snapshot saved to', fileName);
        await Sharing.shareAsync(fileName); // Share the file with the new name
      } else {
        console.error('Error: shareViewRef is not available');
      }
    } catch (error) {
      console.error('Error while sharing the Tambola snapshot:', error);
    }
  };

  useEffect(() => {

    const calculateGridLayout = () => {
      const screenWidth = Dimensions.get("window").width;
      const numColumns = 10; // Fixed 10 columns
      const size = Math.floor(screenWidth / numColumns) - 12; // Account for margins/paddings
      setItemSize(size);
    };

    calculateGridLayout();

    const subscription = Dimensions.addEventListener("change", calculateGridLayout);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    isSpeakerOnRef.current = isSpeakerOn;
  }, [isSpeakerOn]);

  useEffect(() => {
    let interval;
    if (isAutoEnabled) {
      interval = setInterval(() => {
        handleGenerate();
      }, 4000); // Generate every 4 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoEnabled, selectedNumbers]);

  const handleGenerate = () => {
    const availableNumbers = numbers.filter((num) => !selectedNumbers.includes(num));
    if (availableNumbers.length === 0) {
      alert("All numbers have been selected!");
      return;
    }
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const newNumber = availableNumbers[randomIndex];
    setSelectedNumbers([...selectedNumbers, newNumber]);
    setLastGenerated(newNumber);

    // Speak the number aloud if the speaker is on
    if (isSpeakerOnRef.current) {
      Speech.speak(newNumber.toString());
    }
  };

  const handleReset = () => {

    return Alert.alert("Confirm", "Are you sure you want to reset the game?", [
      {
        text: "No",
        style: "default"
      },
      {
        text: "Yes",
        onPress: () => {
          setSelectedNumbers([]);
          setLastGenerated(null);
          setIsAutoEnabled(false);
          setIsSpeakerOn(true);
        },
      },

    ]);
  };


  const toggleSpeaker = () => {
    setIsSpeakerOn((prevState) => {
      const newState = !prevState;
      // Show a toast when speaker is toggled
      Toast.show({
        type: 'success', // Type of toast (can be 'success', 'error', or 'info')
        position: 'bottom', // Position of the toast (can be 'top', 'bottom', 'center')
        text1: newState ? 'Speaker is ON' : 'Speaker is OFF', // Main text
        visibilityTime: 2000, // How long the toast will be visible (in milliseconds)
        autoHide: true, // Whether the toast hides automatically
        swipeable: true,

        text1Style: {
          color: 'black', // Custom text color for info type
          fontSize: 12, // Font size

        },
      });
      //showSnackbar(newState ? "Speaker is ON" : "Speaker is OFF");

      return newState;
    });
  };

  const toggleAuto = () => {
    setIsAutoEnabled((prevState) => {
      const newState = !prevState;
      // Show a toast when auto mode is toggled

      Toast.show({
        type: 'success', // Type of toast (can be 'success', 'error', or 'info')
        position: 'bottom', // Position of the toast (can be 'top', 'bottom', 'center')
        text1: newState ? 'Auto Mode is ON' : 'Auto Mode is OFF',
        visibilityTime: 2000, // How long the toast will be visible (in milliseconds)
        autoHide: true, // Whether the toast hides automatically
        swipeable: true,
        style: {
          backgroundColor: myStyles.maincolor, // Custom background color for 'info' type
          borderRadius: 15, // Optional: rounded corners
          padding: 10, // Optional: padding
        },
        text1Style: {
          color: 'black', // Custom text color for info type
          fontSize: 12, // Font size

        },
      });
      return newState;
    });
  };

  const navigateToHistory = () => {
    // Disable auto mode before navigation
    const previousAutoState = isAutoEnabled;
    setIsAutoEnabled(false);

    navigation.navigate("History", { historyData: selectedNumbers });

    // Optionally, you can restore the auto state after returning from History screen.
    // This can be done by using useFocusEffect or useEffect hooks, but for now, it's disabled.
  };

  const navigateToSettings = () => {
    // Disable auto mode before navigation
    setIsAutoEnabled(false);

    navigation.navigate("SettingsScreen");
  };

  const renderNumber = ({ item }) => {
    const isSelected = selectedNumbers.includes(item);
    return (
      <View
        style={[
          styles.numberContainer,
          isSelected ? styles.selectedNumber : styles.unselectedNumber,
          { width: itemSize, height: itemSize },
        ]}
      >
        <Text style={styles.numberText}>{item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.previousContainer}>
          <Text style={styles.previousLabel}>Previous :</Text>
          <Text style={styles.previousNumber}>
            {selectedNumbers[selectedNumbers.length - 2] || "-"}
          </Text>
        </View>

        <View style={styles.currentContainer}>
          <Text style={styles.currentText}>{lastGenerated || "-"}</Text>
        </View>

        {/* History Icon on the right */}
        <TouchableOpacity
          style={styles.historyIconContainer}
          onPress={navigateToHistory} // Use new function to navigate to History
        >
          <Icon name="history" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Small Buttons Section */}
      <View style={styles.smallButtonsContainer}>
        {/* Auto Button */}
        <TouchableOpacity
          style={[styles.smallButton, isAutoEnabled && styles.speakerOn]}
          onPress={toggleAuto}
        >
          <View style={styles.row}>
            <Text style={styles.smallButtonText}>Auto</Text>
            {isAutoEnabled ? (
              <Icon name="check-circle" size={20} color="#fff" style={styles.icon} />
            ) : (
              <Icon name="cancel" size={20} color="#fff" style={styles.icon} />
            )}
          </View>
        </TouchableOpacity>

        {/* Speaker Button */}
        <TouchableOpacity
          style={[styles.smallButton, isSpeakerOn ? styles.speakerOn : styles.speakerOff]}
          onPress={toggleSpeaker}
        >
          <Icon name={isSpeakerOn ? "volume-up" : "volume-off"} size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.smallButton}
          onPress={handleShare} // Use new function to handle share action
        >
          <Icon name="share" size={24} color="#fff" />
        </TouchableOpacity>
        {/* Settings Button */}
        <TouchableOpacity
          style={styles.smallButton}
          onPress={navigateToSettings} // Use new function to navigate to Settings
        >
          <Icon name="settings" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />
      {/* Grid Section */}
      <FlatList
        ref={shareViewRef}
        data={numbers}
        keyExtractor={(item) => item.toString()}
        numColumns={10} // Display 10 numbers in a single row
        renderItem={renderNumber}
        contentContainerStyle={styles.gridContent}
        style={styles.gridContainer}
      />

      {/* Controls Section */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>RESET</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleGenerate}>
          <Text style={styles.buttonText}>GENERATE</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
}


const styles = StyleSheet.create({
  // Your styles remain unchanged
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 5,
  },
  smallButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#f7f9fa",
    marginHorizontal: 20,
    borderRadius: 50,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 15,
  },
  smallButton: {
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 50,
    backgroundColor: myStyles.maincolor,
  },
  speakerOn: {
    backgroundColor: myStyles.maincolor,
  },
  speakerOff: {
    backgroundColor: myStyles.maincolor,
  },
  smallButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginTop: 20,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: myStyles.maincolor,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  previousContainer: {
    position: "absolute",
    left: 15,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  previousLabel: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "left",
    marginBottom: 4,
  },
  previousNumber: {
    color: "#FFF",
    fontSize: 22,
    textAlign: "left",
  },
  currentContainer: {
    flex: 1,
    alignItems: "center",
  },
  currentText: {
    color: "#FFF",
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
  historyIconContainer: {
    position: "absolute",
    right: 15,
    top: "80%",
    transform: [{ translateY: -15 }],
  },
  container: {
    flex: 1,
    backgroundColor: "#f7f9fa",
  },
  gridContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
    marginBottom: 50, // Remove bottom margin
  },
  gridContent: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 1, // Ensure no bottom padding
  },
  numberContainer: {
    margin: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  selectedNumber: {
    backgroundColor: myStyles.maincolor,
  },
  unselectedNumber: {
    backgroundColor: "#e0e0e0",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#f7f9fa",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    marginHorizontal: 10,
    borderRadius: 20,
    elevation: 2,
    marginBottom: 25,

  },
  button: {
    backgroundColor: myStyles.maincolor,
    padding: 8,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
