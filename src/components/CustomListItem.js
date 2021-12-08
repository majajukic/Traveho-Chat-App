import React from 'react';
import { StyleSheet } from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';

const CustomListItem = ({id, chatName, enterChat}) => {
    return (
        <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
            <Avatar
            rounded
            source={{
                uri: "https://www.pngitem.com/pimgs/m/421-4212266_transparent-default-avatar-png-default-avatar-images-png.png"
            }} 
          />
          <ListItem.Content>
                <ListItem.Title style={styles.title}>{chatName}</ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">This is a test subtitle</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 600
    }
});

export default CustomListItem;