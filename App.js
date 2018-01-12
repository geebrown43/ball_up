import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { Font } from "expo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Fumi } from "react-native-textinput-effects";
import { Button } from "react-native-elements";
import SecondPage from "./components/SecondPage";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location: [],
      place: "",
      fontLoaded: false,
      searching: false,
      secondPage: false,
      data:[]
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      pacifico: require("./assets/fonts/Pacifico-Regular.ttf")
    });
    this.setState({ fontLoaded: true, searching: true });
  }

  gymData = () => {
    console.log(this.state.location);
  };

  handleSubmit = () => {
    let place = this.state.place
    const key = 'AIzaSyBZgK1pc-lLKJkhkTRRLs8Rr-4xPLb0dpY'
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place}&key=${key}`)
    .then(res => res.json()
    .then(data => this.setState({data:data.results[0].geometry.location})))
    this.setState({ fontLoaded: false, searching: false, secondPage: true });
  };

  handleSearch = event => {
    //console.log(event.nativeEvent.text)
    this.setState({ place: event.nativeEvent.text });
  };

  render() {
    
    return (
      <View style={styles.container}>
        <View>
          {this.state.fontLoaded ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 100,
                marginBottom: 40
              }}
            >
              <Text
                style={{ fontSize: 85, fontFamily: "pacifico", color: "red" }}
              >
                ballUp
              </Text>
            </View>
          ) : null}

          {this.state.searching ? (
            <View>
              <View
                style={{ marginLeft: 40, marginRight: 40, marginBottom: 10 }}
              >
                <Fumi
                  label={"City, State"}
                  iconClass={FontAwesomeIcon}
                  iconName={"dribbble"}
                  iconColor={"#f95a25"}
                  iconSize={30}
                  onChange={this.handleSearch.bind(this)}
                  style={{ height: 70 }}
                />
              </View>
              <View style={{ marginLeft: 70, marginRight: 70, marginTop: 30 }}>
                <Button
                  raised
                  title="Search"
                  backgroundColor="red"
                  onPress={this.handleSubmit.bind(this)}
                />
              </View>
            </View>
          ) : null}

          {this.state.secondPage ? <SecondPage data ={this.state.data}/> : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(254, 248, 223)",
    marginTop: 20
  },
  text: {
    fontFamily: "Damion-Regular",
    fontSize: 30
  },
  button: {
    backgroundColor: "#6F65AE",
    height: 50,
    width: 200,
    marginTop: 10,
    marginLeft: 5,
    borderRadius: 4,
    justifyContent: "center",
    marginBottom: 10
  }
});
