import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function WindCard({ wind, pressure, humidity }) {
  return (
    <View style={styles.container}>
      <SubComponent
        icon={
          <MaterialCommunityIcons
            name="weather-windy"
            size={24}
            color="white"
          />
        }
        text1={"Wind"}
        text2={`${wind} km/h`}
      />
      <SubComponent
        icon={<FontAwesome5 name="temperature-high" size={24} color="white" />}
        text1={"Pressure"}
        text2={`${pressure}MB`}
      />
      <SubComponent
        icon={
          <MaterialCommunityIcons
            name="water-outline"
            size={24}
            color="white"
          />
        }
        text1={"Humidity"}
        text2={`${humidity}%`}
      />
    </View>
  );
}

type SubComponentProps = {
  icon: typeof MaterialCommunityIcons | typeof FontAwesome5;
  text1: string;
  text2: string;
};

const SubComponent = ({ icon, text1, text2 }: SubComponentProps) => {
  return (
    <LinearGradient
      colors={["#FEAC5E", "#C779D0", "#4BC0C8"]}
      style={styles.subcontainer}
    >
      {icon}
      <Text style={styles.styleoftext1}>{text1}</Text>
      <Text style={styles.styleoftext2}>{text2}</Text>
    </LinearGradient>
  );
};

const SCREEN_HEIGHT = Dimensions.get("screen").height;
const CONTAINER_HEIGHT = 0.18 * SCREEN_HEIGHT;

const styles = StyleSheet.create({
  container: {
    height: CONTAINER_HEIGHT,
    width: "100%",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 5,
  },
  subcontainer: {
    flex: 1,
    backgroundColor: "#fff",

    marginRight: 5,
    borderRadius: 30,
    paddingLeft: 10,
    justifyContent: "center",
  },
  styleoftext1: {
    fontSize: 18,
    top: 4,
    color: "#fff",
  },
  styleoftext2: {
    fontSize: 15,
    bottom: -10,
    color: "#fff",
  },
});
