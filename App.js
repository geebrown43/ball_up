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
      place: "",
      fontLoaded: false,
      searching: false,
      secondPage: false,
      data: []
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      pacifico: require("./assets/fonts/Pacifico-Regular.ttf")
    });
    this.setState({ fontLoaded: true, searching: true });

  }



  handleSubmit = () => {
    this.setState({ fontLoaded: false, searching: false, secondPage: true });
  };

  handleSearch = event => {
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
                marginTop: 80,
                marginBottom: 60
              }}
            >
              <Text
                style={{ fontSize: 85, fontFamily: "pacifico", color: "red", marginBottom: 10 }}
              >
                ballUp
              </Text>
              <Text style={{fontSize: 20, marginTop: 10}}>~Where Ballers meet~</Text>
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

          {this.state.secondPage ? <SecondPage place={this.state.place} /> : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: "rgb(254, 248, 223)",
    justifyContent: 'space-between'
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
