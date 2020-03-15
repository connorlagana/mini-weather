import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bg: "#faaaf5",
      name: "",
      image: ""
    };
  }

  async fetchWeatherData() {
    const res = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=honolulu&appid=4e18a7bd71bb6257607ec44ce1dfe75c`
    );

    const tempInKelvin = res.data.main.temp;
    const feelsLikeKelvin = res.data.main.feels_like;

    const tempInF = Math.round(((tempInKelvin - 273.15) * 9) / 5 + 32);
    const feelsLikeF = Math.round(((feelsLikeKelvin - 273.15) * 9) / 5 + 32);

    await this.setState({
      name: res.data.name,
      temp: tempInF,
      feelsLike: feelsLikeF,
      main: res.data.weather[0].main,
      description: res.data.weather[0].description,
      animation: null
    });

    this.fetchPhotos();
    this.changeBG(this.state.temp);
  }

  changeBG(temperature: Int) {
    if (temperature > 60) {
      this.setState({
        bg: "#f55"
      });
    }
  }

  async fetchPhotos() {
    const res = await axios.get(
      `https://pixabay.com/api/?key=11861758-a42c6665d59b8095c1461c9af&q=${this.state.name}}&image_type=photo`
    );

    this.setState({
      image: res.data.hits[0].largeImageURL
    });
  }

  componentDidMount() {
    this.fetchWeatherData();
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.state.bg }]}>
        <Image
          style={styles.image}
          source={{
            uri: `${this.state.image}`
          }}
        />
        <Text>{this.state.name}</Text>
        <Text>{this.state.temp}</Text>
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
  },
  image: {
    width: "100%",
    height: 200
  }
});

export default App;
