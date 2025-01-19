import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { myStyles } from "../assets/styles";

const History = ({ route }) => {
  const { historyData } = route.params; // Get the passed history data

  return (
    <View style={styles.container}>
     
      <ScrollView contentContainerStyle={styles.historyContainer}>
        <View style={styles.row}>
          {historyData.length === 0 ? (
            <Text style={styles.noHistory}>No numbers generated yet.</Text>
          ) : (
            historyData.map((num, index) => (
              <View key={index} style={styles.numberContainer}>
                <Text style={styles.numberText}>{num}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ab392e",
    marginBottom: 20,
    textAlign: "center",
  },
  historyContainer: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap", // Allows wrapping if there are too many numbers
    justifyContent: "center", // Centers the row content
  },
  numberContainer: {
    marginHorizontal: 8,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#E3E3E3",
  },
  numberText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  noHistory: {
    fontSize: 18,
    color: myStyles.maincolor,
    fontStyle: "italic",
  },
});

export default History;
