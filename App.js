import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import WindCard from "./Components/WindCard";
import HourCard from "./Components/HourCard";
import TempCard from "./Components/TempCard";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { convertTimestampToDate } from "./Components/timeStampToDateConvertor";
import { kelvinToCelsius } from "./usedfunctions/temperaturConvert";

const WEATHER_API_KEY = process.env.WEATHER_API_KEY || "";

export default function App() {
  const [currentData, setCurrentData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [dailyData, setDailyData] = useState(null);

  const WEATHER_API_URL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=30.7333&lon=76.7794&exclude=minutely,alert&appid=6ec7b2ca4d992da292242111ffeddc78";

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = () => {
    fetch(WEATHER_API_URL)
      .then((response) => response.json())
      .then((json) => {
        setCurrentData(json.current);
        setHourlyData(json.hourly);
        setDailyData(json.daily);
        // setWind();
      });
  };
  const ListHeaderComponent = () => {
    return (
      <View>
        <WindCard
          wind={currentData.wind_speed}
          pressure={currentData.pressure}
          humidity={currentData.humidity}
        />
        {dailyData ? (
          <HourCard
            data={hourlyData}
            todaySunrise={dailyData[0].sunrise}
            todaySunSet={dailyData[0].sunset}
            tommrowSunrise={dailyData[1].sunrise}
            tommrowSunSet={dailyData[1].sunset}
          />
        ) : null}

        <View style={styles.listHeader}>
          <Text style={styles.headerText}>10 Days forecast</Text>
        </View>
      </View>
    );
  };

  const ListFooter = () => {
    return <View style={styles.footer}></View>;
  };

  if (!currentData || !hourlyData || !dailyData) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={"#000"} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TempCard data={currentData} tommrowSunrise={dailyData[1].sunrise} />
      <FlatList
        data={dailyData}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooter}
        style={styles.flatList}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const Item = ({ item }) => {
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

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.textstyle}>{convertTimestampToDate(item.dt)}</Text>
      {DayIcons[item.weather[0].main]}
      <Text style={[styles.textstyle, { fontSize: 20, fontWeight: "600" }]}>
        {kelvinToCelsius(item.temp.max)}°
      </Text>
      <View style={styles.line}></View>
      <Text style={[styles.textstyle, { color: "grey" }]}>
        {kelvinToCelsius(item.temp.min)}°C
      </Text>
      <Text style={[styles.textstyle, { color: "grey" }]}>
        {item.weather[0].main}
      </Text>
    </View>
  );
};
const SCREEN_WIDTH = Dimensions.get("screen").width;
const LIST_ITEM_WIDTH = SCREEN_WIDTH - 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    width: "100%",
  },

  itemContainer: {
    width: LIST_ITEM_WIDTH,
    height: 50,
    backgroundColor: "#28282B",
    marginHorizontal: 10,
    alignSelf: "center",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flatList: {
    flex: 1,
    width: "100%",
  },
  listHeader: {
    backgroundColor: "#28282B",
    width: LIST_ITEM_WIDTH,
    alignSelf: "center",
    height: 60,
    justifyContent: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  line: {
    width: 30,
    height: 1,
    backgroundColor: "#fff",
  },
  textstyle: {
    fontSize: 14,
    color: "#fff",
  },
  footer: {
    backgroundColor: "#28282B",
    width: LIST_ITEM_WIDTH,
    alignSelf: "center",
    height: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    marginBottom: 50,
  },
});
