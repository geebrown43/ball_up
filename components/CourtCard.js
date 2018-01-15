import React from 'react'
import {View, Text, Button} from 'react-native'
import Modal from 'react-native-modal'




export default class Card extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        console.log(this.props)
        return (
            <View >
                <Modal isVisible={this.props.isVisible}>
                    <View style={{flex: 1, height: '100%', backgroundColor: 'white'}}>
                    <Text>Name</Text>
                    <Button title='close' onPress={this.props._showModal}>Close</Button>
                    </View>
                </Modal>
            </View>
        )
    }
}