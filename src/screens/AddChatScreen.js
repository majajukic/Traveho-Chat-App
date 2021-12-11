import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { db } from '../../firebase';

const AddChatScreen = ({ navigation }) => {

    const[input, setInput] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a new chat',
            headerBackTitle: 'Chats',
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#9b74b3',
            },
            headerTitleStyle: {
                color: 'white'
            },
        })
    }, []);

    const createChat = async () => {
        await db.collection('chats').add({
            chatName: input
        }).then(() => {
            navigation.goBack();
        }).catch(error => alert(error));
    }

    return (
        <View style={styles.container}>
            <Input 
            style={styles.input}
            placeholder='Enter chat name' 
            value={input} 
            onChangeText={(text) => setInput(text)}
             />
             <Button disabled={!input} style={styles.button} onPress={createChat} title='Create chat' />
             <Image source={ require('../../assets/addChatPhoto.jpg') } style={styles.addChatImage} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 30,
        height: "100%",
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center'
    },
    button: {
        width: 200,
       // marginLeft: 80,
        marginTop: 30
    },
    input: {
        marginTop: 10
    },
    addChatImage: {
        width: 180,
        height: 200,
        marginTop: 50,
        //marginLeft: 80
    }
});

export default AddChatScreen;