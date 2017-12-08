import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableHighlight, ScrollView} from 'react-native';
import {Font} from 'expo'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import {Button} from 'react-native-elements'
import SecondPage from './components/SecondPage'



export default class App extends React.Component {
  constructor(){
    super()
        this.state = {
          location: [],
          place: '',
          data: [],
          fontLoaded: false,
          searching:false,
          secondPage: false
        }   
  }

  async componentDidMount() {
    await Font.loadAsync({
      'pacifico': require('./assets/fonts/Pacifico-Regular.ttf')
    });
    this.setState({fontLoaded: true, searching: true})
  }

  gymData = () => {
    console.log(this.state.location)
  }

  handleSubmit = () => {
    const apiKey = 'AIzaSyBt6dWk9Pa4H1VAbC1iZ0ZmVBFnd_qz7_Q'
    let place = this.state.place
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${apiKey}`)
      .then(res => res.json()
        .then(data => {
          this.setState({
          location: data.results[0].geometry.location
        })
      let lat = this.state.location.lat
      let lng = this.state.location.lng
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=20000&type=gym&keyword=basketball&key=${apiKey}`)
        .then(res => res.json()
      .then(data => this.setState({data:data.results})))
        }))
        this.setState({fontLoaded:false, searching:false, secondPage:true})
  }

  handleSearch= (event) => {
    this.setState({place: event.nativeEvent.text})
    }


  render() {
    console.log(this.state.data)
    return (
      <ScrollView style={styles.container}>
        <View>
        {
          this.state.fontLoaded ? (
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 100, marginBottom: 40}}>
        <Text style={{fontSize:85, fontFamily: 'pacifico', color: 'red'}}>ballUp</Text>       
       </View>) : null
      }

      {
        this.state.searching ? 
        (<View>
          
                                    <View style={{marginLeft: 40, marginRight: 40, marginBottom: 10}}>
                                      <Fumi label={ 'City, State'} iconClass={FontAwesomeIcon} iconName={ 'dribbble'} iconColor={ '#f95a25'} iconSize={30} onChange={this.handleSearch.bind(this)}
                                        style={{height:70}}/>
                                    </View>
                                    <View style={{marginLeft:70, marginRight:70, marginTop: 30}}>
                                      <Button raised title='Search' backgroundColor='red' onPress={this.handleSubmit.bind(this)}/>
                                    </View>
        </View>) : null
      }

                          { 
                            this.state.secondPage ? <SecondPage data={this.state.data}/> : null 
                          }

      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(254, 248, 223)',
    marginTop: 20,
    

    
  },
  text: {
    fontFamily:"Damion-Regular",
    fontSize: 30,
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
