import React, { useLayoutEffect, useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, StatusBar, View, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { db, auth } from '../../firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerTitleAlign: 'left',
            headerTintColor: 'white',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#9b74b3',
            },
            headerTitle: () => (
                <View style={styles.container}>
                    <Avatar rounded source={ require('../../assets/chatroomLogo.jpg') }/>
                    <Text style={styles.chatTitle}>{route.params.chatName}</Text>
                </View>
            )
        });
    }, [navigation])

    //method for sending a message in a chat:
    const sendMessage = () => {
        Keyboard.dismiss();

        //to know in which chat we are in, we use the routeparams.id
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        });

        setInput('');
    }

    //getting the data of a specific chat from db ready to be displayed on screen:
    useEffect(() => {
        const unsubscribe = db.collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => setMessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
        ))
        
        return unsubscribe;
    }, [route]);

    return (
        <SafeAreaView style={styles.safeArea}>
        <StatusBar style='light' />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={90}
                style={styles.keyboardView}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                    <ScrollView contentContainerStyle={{ paddingTop :15}}>
                        {messages.map(({id, data}) => (
                            data.email === auth.currentUser.email ? (
                                <View key={id} style={styles.sender}>
                                    <Avatar 
                                     source={{ uri: data.photoURL }} 
                                     rounded 
                                     //FOR WEB
                                     containerStyle={{
                                         position: 'absolute',
                                         bottom: -15,
                                         right: -5
                                     }}
                                     size={30} 
                                     position='absolute' 
                                     bottom={-15} 
                                     right={-5} />
                                    <Text style={styles.senderText}>{data.message}</Text>
                                </View>
                            ) : (
                                <View key={id} style={styles.reciever}>
                                    <Avatar
                                     source={{ uri: data.photoURL }} 
                                     rounded 
                                     //FOR WEB
                                     containerStyle={{
                                         position: 'absolute',
                                         bottom: -15,
                                         left: -5
                                     }}
                                     size={30} 
                                     position='absolute' 
                                     bottom={-15} 
                                     left={-5}
                                     />
                                    <Text style={styles.recieverText}>{data.message}</Text>
                                    <Text style={styles.recieverName}>{data.displayName}</Text>
                                </View>
                            )
                        ))}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput 
                        style={styles.textInput}
                        placeholder="Type out your message here..." 
                        value={input} 
                        onChangeText={text => setInput(text)}
                        />
                    <TouchableOpacity disabled={!input} activeOpacity={0.5} onPress={sendMessage}>
                        <Ionicons name='send' size={22} color='#9b74b3' />
                    </TouchableOpacity>
                    </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'white'
    },
    chatTitle: {
        marginLeft: 10,
        fontWeight: '600',
        color: 'white'
    },
    keyboardView: {
        flex: 1
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: '#ececec',
        padding: 12,
        color: 'grey',
        borderRadius: 30
    },
    senderText: {
        color: 'white',
        fontWeight: '500',
        marginBottom: 15
    },
    recieverText: {
        color: 'black',
        fontWeight: '500',
        marginBottom: 15
    },
    recieverName: {
        left: 10,
        paddingRight: 10,
        fontSize: 12,
        color: 'black',
        fontStyle: 'italic'
    },
    reciever: {
        padding: 15,
        backgroundColor: '#ececec',
        alignSelf: 'flex-start',
        borderRadius: 20,
        marginLeft: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative'
    },
    sender: {
        padding: 15,
        backgroundColor: '#9b74b3',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative'
    }
});

export default ChatScreen;