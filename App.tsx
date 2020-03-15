import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bg: "#faaaf5",
      name: "Hello World!"
    };
  }

  async fetchWeatherData() {
    const res = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=sunnyvale&appid=4e18a7bd71bb6257607ec44ce1dfe75c`
    );

    const tempInKelvin = res.data.main.temp;
    const feelsLikeKelvin = res.data.main.feels_like;

    const tempInF = Math.round(((tempInKelvin - 273.15) * 9) / 5 + 32);
    const feelsLikeF = Math.round(((feelsLikeKelvin - 273.15) * 9) / 5 + 32);

    this.setState({
      name: res.data.name,
      temp: tempInF,
      feelsLike: feelsLikeF,
      main: res.data.weather[0].main,
      description: res.data.weather[0].description,
      animation: null
    });
  }

  componentDidMount() {
    this.fetchWeatherData();
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.state.bg }]}>
        <Text>{this.state.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
