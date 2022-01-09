import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import CustomListItem from '../components/CustomListItem';
import AppbarIcons from '../components/AppbarIcons';
import { auth, db } from '../../firebase';
import UserAvatar from '../components/UserAvatar';

const HomeScreen = ({ navigation }) => {

    const[chats, setChats] = useState([]);

    const logout = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        });
    }

    const addChat = () => {
        navigation.navigate('AddChat')
    }

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ));

        return unsubscribe;
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title:'Traveho Chat',
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#9b74b3',
            },
            headerTitleStyle: {
                color: 'white'
            },
           headerLeft: () => (
                <UserAvatar logout={logout} />
           ),
           headerRight: () => (
                <AppbarIcons addChat={addChat} />
            )
        });
    }, []);

    //method for entering the specific chat room:
    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id,
            chatName
        });
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
              {chats.map(({id, data: { chatName }}) => (
              <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
            ))}
            </ScrollView>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }

});

export default HomeScreen;