import React from 'react'
import { ScrollView, Text, Button, View, Image, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'




export default class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        let data = this.props.data.a
        return (
            <View>
                <Modal isVisible={this.props.isVisible}>
                    <View style={{ height: 500, justifyContent: 'center' }}>
                        <ScrollView style={{ backgroundColor: 'white', borderRadius: 15 }}>
                            <View style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={styles.header}>{data.name}</Text>
                                <Text>{data.address} {data.city}, {data.state}</Text>
                                <Image source={{ uri: data.image }} style={{ height: 300, width: 300, margin: 10 }} />
                            </View>
                            <Button title='close' onPress={this.props._showCard}>Close</Button>
                        </ScrollView>
                    </View>

                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 28,
        textAlign: 'center',
        margin: 5
    }
})