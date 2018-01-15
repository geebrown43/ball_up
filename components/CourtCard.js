import React from 'react'
import {ScrollView, Text, Button, View} from 'react-native'
import Modal from 'react-native-modal'




export default class Card extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        //console.log(this.props)
        return (
            <View>
                <Modal isVisible={this.props.isVisible}>
                    <View style={{height: 500, justifyContent: 'center'}}>
                    <ScrollView style={{backgroundColor: 'white', borderRadius: 15}}>
                    <Text>Name</Text>
                    <Button title='close' onPress={this.props._showModal}>Close</Button>
                    </ScrollView>
                    </View>
                    
                </Modal>
            </View>
        )
    }
}