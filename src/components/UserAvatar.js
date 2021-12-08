import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { auth } from '../../firebase';

const UserAvatar = ({ logout }) => {

    return (
        <View style={{
            marginLeft: 20
         }}>
            <TouchableOpacity activeOpacity={0.5} onPress={logout} >
               <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
            </TouchableOpacity>
        </View>
    );
}

export default UserAvatar;