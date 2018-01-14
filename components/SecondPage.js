import React from "react";
import { List, ListItem } from "react-native-elements";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import { MapView} from "expo";
import Data from "./Data";
import CustomMap from'./MapStyle'
import Centers from './RecCenters'

export default class SecondPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Data,
      court: false,
      mapV: null
    };
  }
  async componentDidMount(){
    let key = 'AIzaSyBZgK1pc-lLKJkhkTRRLs8Rr-4xPLb0dpY'
    let place = this.props.place
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place}&key=${key}`)
    const json = await response.json()
    console.log(json)
    this.setState({mapV: json.results[0].geometry.location})
  }

  render() {
    console.log(this.state.mapV)
    return (
      <View>
        {this.state.mapV !== null ?<View style={{position: 'relative', height: '100%'}}>
        
        <MapView
        provider={MapView.PROVIDER_GOOGLE}
          style={{top: 0, bottom: 0, right: 0, left: 0, position: 'absolute'}}
          zoomEnabled
          scrollEnabled
          rotateEnabled
          loadingEnabled={true }
          minZoomLevel = {0}
          customMapStyle={CustomMap}
          initialRegion={{
            latitude: this.state.mapV.lat,
            longitude: this.state.mapV.lng,
            latitudeDelta: 0.16,
            longitudeDelta: 0.04
          }}
        >
          {this.state.data.map(a => (
            <MapView.Marker
              key={a.id}
              coordinate={{ latitude: a.latitude, longitude: a.longitude }}
            >
              <MapView.Callout >
                <Text>{a.name}</Text>
                <Text>{a.address}</Text>
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
      </View>
      : <Text style={styles.loading}>Map Loading</Text> }
      
      </View>
    );
  }
}


const styles = StyleSheet.create({
  loading: {
   textAlign:'center',
   fontFamily: 'pacifico',
   color: 'red',
    fontSize: 28
  }
})