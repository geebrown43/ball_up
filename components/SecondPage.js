import React from "react";
import { List, ListItem } from "react-native-elements";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import { MapView } from "expo";
import Data from "./Data";
import CustomMap from'./MapStyle'

export default class SecondPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Data,
      
    };
  }

  render() {
    console.log(this.props);
    return (
      <View style={{position: 'relative', height: '100%'}}>
        <MapView
          style={{top: 0, bottom: 0, right: 0, left: 0, position: 'absolute'}}
          zoomEnabled ={true}
          customMapStyle={CustomMap}
          region={{
            latitude: this.props.data.lat,
            longitude: this.props.data.lng,
            latitudeDelta: 0.16,
            longitudeDelta: 0.04
          }}
        >
          {this.state.data.map(a => (
            <MapView.Marker
              key={a.id}
              coordinate={{ latitude: a.latitude, longitude: a.longitude }}
            >
              <MapView.Callout>
                <Text>{a.name}</Text>
                <Text>{a.address}</Text>
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
      </View>
    );
  }
}


