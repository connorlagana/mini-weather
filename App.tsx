import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bg: "#faa"
    };
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.state.bg }]}>
        <Text>I just blame it on the weather</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
