import React from "react";
import { List, ListItem } from "react-native-elements";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import { MapView } from "expo";
import Data from './Data'

export default class SecondPage extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
        data: Data
    }
  }

  render() {
    console.log(this.props)
    return (
      <View>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={{
              latitude: this.props.data.lat,
              longitude: this.props.data.lng,
              latitudeDelta: 0.16,
              longitudeDelta: 0.04
            }}>
            {this.state.data.map(a => <MapView.Marker key={a.id} coordinate={{latitude: a.latitude, longitude: a.longitude}}>
              <MapView.Callout>
                <Text>{a.name}</Text>
                <Text>{a.address}</Text>
              </MapView.Callout>
              
              </MapView.Marker>)}
            </MapView>
        </View>

        <View style={{ top: 340 }}>
          <ScrollView>
            <List containerStyle={{ marginBottom: 20 }}>
              {this.state.data.map((item, i) => (
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
    alignItems: "center",
    bottom:350,
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
