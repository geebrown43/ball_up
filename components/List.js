import React from 'react'
import {ScrollView, View} from 'react-native'
import { List, ListItem } from "react-native-elements";

const List = () => (
    <View style={{ top: 340 }}>
          <ScrollView>
            <List containerStyle={{ marginBottom: 20 }}>
              {this.state.data.map((item, i) => (
                <ListItem
                  roundAvatar
                  avatar={{ uri: item.image }}
                  key={i}
                  title={item.name}
                  subtitle={item.address}
                />
              ))}
            </List>
          </ScrollView>
        </View>
)


module.exports = List