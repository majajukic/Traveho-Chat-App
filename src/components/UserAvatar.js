import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { auth } from '../../firebase';

const UserAvatar = ({ logout }) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.5} onPress={logout} >
               <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20
     }
});

export default UserAvatar;