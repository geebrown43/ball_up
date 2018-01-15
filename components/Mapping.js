import React from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'
import { MapView } from "expo";
import Data from "./Data";
import CustomMap from './MapStyle'
import Search from 'react-native-search-box'
import Card from './CourtCard'
export default class Mapping extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: Data,
      mapV: {
        lat: this.props.mapV.lat,
        lng: this.props.mapV.lng
      },
      place: null,
      isVisible: false
    }
  }

  _locationSubmit = () => {
    let key = 'AIzaSyBZgK1pc-lLKJkhkTRRLs8Rr-4xPLb0dpY'
    let place = this.state.place
    console.log(place)
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place}&key=${key}`)
    .then(res => res.json()
  .then(data => this.setState({mapV: data.results[0].geometry.location})))
  }

  _locationChange = (e) => {
    this.setState({place: e})
  }
  _showModal = () => {
    this.setState({isVisible: !this.state.isVisible})
  }

  render() {
    return (
      <View style={{ height: '100%', backgroundColor: 'transparent' }}>
        <View style={styles.search}>
          <Find textChange={this._locationChange} submitting={this._locationSubmit}/>
      </View>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          customMapStyle={CustomMap}
          region={{
            latitude: this.state.mapV.lat,
            longitude: this.state.mapV.lng,
            latitudeDelta: 0.15,
            longitudeDelta: 0.04
          }}
        >
          {this.props.userMarker !== null ? <MapView.Marker coordinate={this.props.userMarker}>
            <View style={styles.marker}>
              <View style={styles.radius}>
              </View>
            </View>
          </MapView.Marker> : null}

          {this.state.data.map(a => (
            <MapView.Marker
              key={a.id}
              coordinate={{ latitude: a.latitude, longitude: a.longitude }}
            >
              <MapView.Callout onPress={this._showModal}>
                <Text>{a.name}</Text>
                <Text>{a.address}</Text>
                  <Text style={{ color: 'blue', textDecorationLine: 'underline', textAlign: 'center' }}>Schedule Game</Text>
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
        <Card isVisible={this.state.isVisible} _showModal={this._showModal}/>
      </View>
    )
  }
}

const Find = ({textChange, submitting}) => (
  <Search placeholder='Search' onChangeText={e => textChange(e)} backgroundColor='rgb(238, 118, 79)' onSearch={submitting} blurOnSubmit={true} inputBorderRadius={10} inputHeight={30}/>
)


const styles = StyleSheet.create({
  marker: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  radius: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
  search: {
    marginTop: 20,
    backgroundColor: 'transparent'
  }
})