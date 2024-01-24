import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import clearDay from "../assets/clearday.png";
import clearNight from "../assets/clearnight.png";
import cloudyDay from "../assets/cloudyday.jpg";
import cloudyNight from "../assets/cloudynight.jpg";
import rainyDay from "../assets/rainyday.jpg";
import rainyNight from "../assets/rainynight.jpg";
import mistDay from "../assets/mistday.jpg";
import mistNight from "../assets/mistnight.jpg";
import fogDay from "../assets/foggyday.jpg";
import fogNight from "../assets/foggynight.jpg";
import defaultDay from "../assets/defaultday.jpg";
import defaultNight from "../assets/defaultnight.jpg";
import { kelvinToCelsius } from "../usedfunctions/temperaturConvert";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
];

export default function TempCard({ data, tommrowSunrise }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const date = currentDate.getDate();

  const month = months[currentDate.getMonth()];
  const day = days[currentDate.getDay()];

  const DayImages = {
    Rain: (
      <Image style={styles.imagestyle} source={rainyDay} resizeMode="cover" />
    ),
    Clouds: (
      <Image style={styles.imagestyle} source={cloudyDay} resizeMode="cover" />
    ),
    Clear: (
      <Image style={styles.imagestyle} source={clearDay} resizeMode="cover" />
    ),
    Mist: (
      <Image style={styles.imagestyle} source={mistDay} resizeMode="cover" />
    ),
    Fog: <Image style={styles.imagestyle} source={fogDay} resizeMode="cover" />,
  };

  const NightImages = {
    Rain: (
      <Image style={styles.imagestyle} source={rainyNight} resizeMode="cover" />
    ),
    Clouds: (
      <Image
        style={styles.imagestyle}
        source={cloudyNight}
        resizeMode="cover"
      />
    ),
    Clear: (
      <Image style={styles.imagestyle} source={clearNight} resizeMode="cover" />
    ),
    Mist: (
      <Image style={styles.imagestyle} source={mistNight} resizeMode="cover" />
    ),

    Fog: (
      <Image style={styles.imagestyle} source={fogNight} resizeMode="cover" />
    ),
  };

  const renderImage = () => {
    if (data.dt > data.sunrise && data.dt < data.sunset) {
      if (
        data.weather[0].main !== "Clear" &&
        data.weather[0].main !== "Clouds" &&
        data.weather[0].main !== "Mist" &&
        data.weather[0].main !== "Rain" &&
        data.weather[0].main !== "Fog"
      ) {
        return (
          <Image
            style={styles.imagestyle}
            source={defaultDay}
            resizeMode="cover"
          />
        );
      } else {
        return DayImages[data.weather[0].main];
      }
    } else if (data.dt > data.sunset && data.dt < tommrowSunrise) {
      if (
        data.weather[0].main !== "Clear" &&
        data.weather[0].main !== "Clouds" &&
        data.weather[0].main !== "Mist" &&
        data.weather[0].main !== "Rain" &&
        data.weather[0].main !== "Fog"
      ) {
        return (
          <Image
            style={styles.imagestyle}
            source={defaultNight}
            resizeMode="cover"
          />
        );
      } else {
        return NightImages[data.weather[0].main];
      }
    }
  };

  return (
    <View style={styles.container}>
      {renderImage()}
      <View style={styles.textcontainer}>
        <Text style={styles.datestyle}>{`${date} ${month}, ${day}`}</Text>

        <View style={styles.midcontainer}>
          <Text style={styles.citystyle}>Chandigarh</Text>
          <Text style={styles.tempraturestyle}>
            {kelvinToCelsius(data.temp)}°
          </Text>

          <Text style={[styles.citystyle, { fontSize: 40, lineHeight: 40 }]}>
            {data.weather[0].main}
          </Text>

          <Text style={styles.feelstyle}>
            real feel {kelvinToCelsius(data.feels_like)}°C
          </Text>
        </View>
      </View>
    </View>
  );
}

const SCREEN_HEIGHT = Dimensions.get("screen").height;
const CONTAINER_HEIGHT = 0.55 * SCREEN_HEIGHT;

const styles = StyleSheet.create({
  container: {
    height: CONTAINER_HEIGHT,
    width: "100%",
    backgroundColor: "#000",
    padding: 10,
  },
  imagestyle: {
    height: "100%",
    width: "100%",
    borderRadius: 40,
  },
  textcontainer: {
    position: "absolute",
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  midcontainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: 30,
    marginTop: 30,
  },
  datestyle: {
    left: 30,
    color: "white",
    marginTop: 40,
  },
  tempraturestyle: {
    fontSize: 50,
    fontWeight: "600",
    color: "white",
    lineHeight: 50,
  },
  citystyle: {
    color: "white",
    fontSize: 40,
    fontWeight: "600",
    lineHeight: 40,
  },
  feelstyle: {
    color: "white",
    fontWeight: "500",
  },
});
