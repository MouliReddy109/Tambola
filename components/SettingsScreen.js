import React from "react";
import {
  Linking,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import Rate, { AndroidMarket } from "react-native-rate";

import insta from "../assets/insta.png";
import youtube from "../assets/youtube.png";
import linkedin_pic from "../assets/linkedin.png";

export default function Example() {
  const handleRateApp = () => {
    const options = {
      GooglePackageName: "com.myapps.tambola",
      preferredAndroidMarket: AndroidMarket.Google,
    };
    Rate.rate(options, (success) => {
      if (success) {
        console.log("User successfully rated app");
      }
    });
  };

  const handleEmailClick = () => {
    Linking.openURL("mailto:moulireddy109@gmail.com");
  };

  const handleTerms = () => {
    try {
      Linking.openURL(
       "https://www.freeprivacypolicy.com/live/791b7d3e-447c-4b5a-9d0a-430d4ced05b1"
      );
    } catch (error) {
      console.error("Error opening Terms and Conditions:", error);
    }
  };

  const handlePrivacyPolicy = () => {
    try {
      Linking.openURL(
        "https://www.freeprivacypolicy.com/live/be0bc647-d75a-4d64-9fa6-bdea9af7765f"
      );
    } catch (error) {
      console.error("Error opening Privacy Policy:", error);
    }
  };

  const handleMoreApps = () => {
    try {
      Linking.openURL(
        "https://play.google.com/store/apps/developer?id=Mouli+Reddy"
      );
    } catch (error) {
      console.error("Error opening More Apps:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>
          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <TouchableOpacity onPress={handleEmailClick} style={styles.row}>
                <Text style={styles.rowLabel}>Contact Us</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
              </TouchableOpacity>
            </View>

            <View style={styles.rowWrapper}>
              <TouchableOpacity onPress={handleRateApp} style={styles.row}>
                <Text style={styles.rowLabel}>Rate Us</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
              </TouchableOpacity>
            </View>

            <View style={styles.rowWrapper}>
              <TouchableOpacity
                onPress={handlePrivacyPolicy}
                style={styles.row}
              >
                <Text style={styles.rowLabel}>Privacy Policy</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
              </TouchableOpacity>
            </View>

            <View style={styles.rowWrapper}>
              <TouchableOpacity onPress={handleTerms} style={styles.row}>
                <Text style={styles.rowLabel}>Terms and Conditions</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
              </TouchableOpacity>
            </View>

            <View style={[styles.rowWrapper, styles.rowLast]}>
              <TouchableOpacity onPress={handleMoreApps} style={styles.row}>
                <Text style={styles.rowLabel}>More Apps</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.mainHeader}>Follow me on Social Network</Text>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() =>
              Linking.openURL("https://www.instagram.com/mouli_tirumalareddy/")
            }
          >
            <Image
              style={{ width: 50, height: 50, marginRight: 10 }}
              source={insta}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() =>
              Linking.openURL(
                "https://www.youtube.com/channel/UC_f79Uvc-JS4oXEBIt5lWzg"
              )
            }
          >
            <Image
              style={{ width: 50, height: 50, marginRight: 10 }}
              source={youtube}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() =>
              Linking.openURL("https://www.linkedin.com/in/moulidesigns/")
            }
          >
            <Image style={{ width: 50, height: 50 }} source={linkedin_pic} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.madecontainer}>
        <Text style={styles.fromtext}>Made with '❤️'</Text>
      
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  madecontainer: {
    position: "absolute",
    bottom: 2,
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
 

  fromtext: {
    color: "grey",
    fontSize: 13,
    marginTop: 10,
    textAlign: "center",
    marginBottom: 5,
    fontWeight: "400",
  },
  content: {
    paddingHorizontal: 16,
  },
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 13,
    letterSpacing: 0.33,
    fontWeight: "500",
    color: "#a69f9f",
    textTransform: "uppercase",
  },
  sectionBody: {
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  row: {
    height: 44,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 12,
  },
  rowWrapper: {
    paddingLeft: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#f0f0f0",
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: "#000",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  mainHeader: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    marginHorizontal: 10,
  },
});
