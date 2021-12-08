import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, SimpleLineIcons} from '@expo/vector-icons';


const AppbarIcons = ({ addChat }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.5}>
                <AntDesign name='camerao' size={22} color='white' />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={addChat}>
                <SimpleLineIcons name='pencil' size={22} color='white' />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 70,
        marginRight: 20
    }
});

export default AppbarIcons;