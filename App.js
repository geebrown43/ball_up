import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableHighlight} from 'react-native';

export default class App extends React.Component {
  constructor(){
    super()
        this.state = {
          location: [],
          place: '',
          data: [],
        }   
  }

  gymData = () => {
    console.log(this.state.location)
  }

  handleSubmit = () => {
    const apiKey = 'AIzaSyBt6dWk9Pa4H1VAbC1iZ0ZmVBFnd_qz7_Q'
    let place = this.state.place
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${apiKey}`)
      .then(res => res.json()
        .then(data => this.setState({
          location: data.results[0].geometry.location
        })))

        this.gymData(this.state.location)
  }

  handleSearch= (event) => {
    this.setState({place: event.nativeEvent.text})
    }


  render() {

    console.log(this.state.location)
    return (
      <View style={styles.container}>
        <Text>Ball Up</Text>
          
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} onChange={this.handleSearch.bind(this)} value={this.state.place} placeholder='City, State'></TextInput>
        <TouchableOpacity
            style={styles.button}
            onPress={this.handleSubmit.bind(this)}
          underlayColor="white"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#6F65AE',
    height: 50,
    width: 200,
    marginTop: 10,
    marginLeft: 5,
    borderRadius: 4,
    justifyContent: 'center',
    marginBottom: 10
  },
});
