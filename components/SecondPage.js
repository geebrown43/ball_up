import React from 'react'
import {List, ListItem} from 'react-native-elements'
import {Text, ScrollView} from 'react-native'
import MapView from 'react-native-maps'



export default class SecondPage extends React.Component{
    constructor(props){
        super(props)

    }

    render(){
        return (
            <ScrollView>
                       
                <List containerStyle={{marginBottom: 20}}>
                    { this.props.data.map((item, i) => (
                    <ListItem roundAvatar avatar={{uri:item.icon}}  key={i} title={item.name} subtitle={item.vicinity}/> )) }
                </List>
            </ScrollView>

                
        )
    }
}                                


