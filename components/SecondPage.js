import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { MapView, Location, Permissions } from "expo";
import Mapping from './Mapping';



export default class SecondPage extends React.Component {
  constructor() {
    super();
    this.state = {
      mapV: null,
      location: null,
      userMarker: null,
      errorMessage: null,
     
    }
  }

  watchID: ?number = null

  async componentDidMount() {
    let key = 'AIzaSyBZgK1pc-lLKJkhkTRRLs8Rr-4xPLb0dpY'
    let place = this.props.place
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place}&key=${key}`)
    const json = await response.json()
    this.setState({ mapV: json.results[0].geometry.location })

    //Calls function to get user location
    this._getLocationAsync();
    //Watchs for user change in position
    this.watchID = navigator.geolocation.watchPosition((position) => {
      let lat = parseFloat(position.coords.latitude)
      let lng = parseFloat(position.coords.longitude)
      let userChange = {
        latitude: lat,
        longitude: lng,
      }
      this.setState({ userMarker: userChange })
    })
  }
  //Clears watchID
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }
  //Gets user location after submit
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      })
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ userMarker: location.coords })
  }

  _handleSearch = (e) => {
    this.setState({place: e.nativeEvent.text})
  }

  
  render() {
    return (
      <View>
        {this.state.mapV !== null ? <Mapping mapV={this.state.mapV} userMarker={this.state.userMarker} handleText={this._handleSearch}> </Mapping> : <View style={styles.position}><Text style={styles.loading}>Map Loading</Text></View>}
        
      </View>

    );
  }
}



const styles = StyleSheet.create({
  loading: {
    textAlign: 'center',
    fontFamily: 'pacifico',
    color: 'red',
    fontSize: 28
  },
  position:{
    marginTop: '50%'
  }
})