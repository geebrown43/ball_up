import React from "react";
import { List, ListItem } from "react-native-elements";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import { MapView } from "expo";

export default class SecondPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={{
              latitude: 39.742043,
              longitude: -104.991531,
              latitudeDelta: 0.0912,
              longitudeDelta: 0.04
            }}
          />
        </View>

        <View style={{ top: 340 }}>
          <ScrollView>
            <List containerStyle={{ marginBottom: 20 }}>
              {this.props.data.map((item, i) => (
                <ListItem
                  roundAvatar
                  avatar={{ uri: item.image }}
                  key={i}
                  title={item.name}
                  subtitle={item.address}
                />
              ))}
            </List>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
