import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { kelvinToCelsius } from "../usedfunctions/temperaturConvert";
import { convertTimestampToDateTime } from "../usedfunctions/changeTime";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HourCard({
  data,
  todaySunrise,
  todaySunSet,
  tommrowSunrise,
  tommrowSunSet,
}) {
  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        horizontal
        renderItem={({ item }) => (
          <Item
            item={item}
            todaySunrise={todaySunrise}
            todaySunSet={todaySunSet}
            tommrowSunrise={tommrowSunrise}
            tommrowSunSet={tommrowSunSet}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const Item = ({
  item,
  todaySunrise,
  todaySunSet,
  tommrowSunrise,
  tommrowSunSet,
}) => {
  console.log(item.dt);
  const DayIcons = {
    Rain: (
      <MaterialCommunityIcons name="weather-rainy" size={24} color="white" />
    ),
    Clouds: (
      <MaterialCommunityIcons name="weather-cloudy" size={24} color="white" />
    ),
    Clear: (
      <MaterialCommunityIcons name="weather-sunny" size={24} color="white" />
    ),
    Mist: <MaterialCommunityIcons name="weather-fog" size={24} color="white" />,
  };

  const NightIcons = {
    Rain: (
      <MaterialCommunityIcons name="weather-rainy" size={24} color="white" />
    ),
    Clouds: (
      <MaterialCommunityIcons
        name="weather-night-partly-cloudy"
        size={24}
        color="white"
      />
    ),
    Clear: (
      <MaterialCommunityIcons name="weather-night" size={24} color="white" />
    ),
    Mist: <MaterialCommunityIcons name="weather-fog" size={24} color="white" />,
  };

  const renderIcon = () => {
    if (item.dt > todaySunrise && item.dt < todaySunSet) {
      return DayIcons[item.weather[0].main];
    } else if (item.dt > todaySunSet && item.dt < tommrowSunrise) {
      return NightIcons[item.weather[0].main];
    } else {
      return DayIcons[item.weather[0].main];
    }
  };

  return (
    <View style={styles.itemConatiner}>
      <Text style={styles.text1}>{convertTimestampToDateTime(item.dt)}</Text>
      {renderIcon()}
      <Text style={styles.text2}>{kelvinToCelsius(item.temp)}°</Text>
    </View>
  );
};

const SCREEN_HEIGHT = Dimensions.get("screen").height;
const CONTAINER_HEIGHT = 0.18 * SCREEN_HEIGHT;

const SCREEN_WIDTH = Dimensions.get("screen").width;
const CONTAINER_WIDTH = SCREEN_WIDTH / 5 - 10;

const styles = StyleSheet.create({
  itemConatiner: {
    height: "100%",
    borderRadius: 10,
    width: CONTAINER_WIDTH,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  container: {
    backgroundColor: "#28282B",
    height: CONTAINER_HEIGHT,
    width: SCREEN_WIDTH - 20,
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    margin: 10,
  },
  text1: {
    color: "white",
  },
  text2: {
    color: "white",
    fontSize: 25,
    fontWeight: "600",
  },
});
