import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import { db } from '../../firebase';


const CustomListItem = ({id, chatName, enterChat}) => {

    const [chatMessages, setChatMessages] = useState([]);

    //helps us retrieve the last written message in a chat:
    useEffect(() => {
        const unsubscribe = db
        .collection('chats')
        .doc(id).collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => (
            setChatMessages(snapshot.docs.map(doc => doc.data()))
        ))

        return unsubscribe;

    }, []);

    return (
        <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
            <Avatar
            rounded
            source={{ uri: chatMessages[0]?.photoURL || require('../../assets/chatroomLogo.jpg') }} 
          />
          <ListItem.Content>
                <ListItem.Title style={styles.title}>{chatName}</ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" style={styles.subtitle}>{ chatMessages.length === 0 ? 'Be first to write!' : chatMessages?.[0]?.displayName + ' : ' + chatMessages?.[0]?.message }</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "600"
    },
    subtitle: {
        fontStyle: 'italic'
    }
});

export default CustomListItem;