import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Title, IconButton } from 'react-native-paper';
import { Button, Text } from 'react-native-elements'
import FormInput from '../components/FormInput';
import { auth } from '../../firebase';

const SignupScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    //register function
    const register = () => {
      if(!name.trim() || !email.trim() || !password.trim()){
        Alert.alert('Name, email and password are required!');
      } else {
        auth.createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL: imageUrl || 'https://connectingcouples.us/wp-content/uploads/2019/07/avatar-placeholder.png'
        });
      })
      .catch(error => alert(error.message));
      }
  }

    return (
        <View style={styles.container}>
            <Title style={styles.titleText}>Register to Traveho Chat.</Title>
            <FormInput 
              placeholder='Name'
              type='text'
              value={name}
              autoCapitalize='none'
              onChangeText={userName => setName(userName)}
            />
            <FormInput 
                placeholder='Email'
                type='email'
                value={email}
                autoCapitalize='none'
                onChangeText={userEmail => setEmail(userEmail)}
            />
            <FormInput 
                placeholder='Password'
                type="password"
                value={password}
                secureTextEntry
                onChangeText={userPassword => setPassword(userPassword)}
            />
            <FormInput 
              placeholder='Profile picture URL (optional)'
              type="text"
              value={imageUrl}
              onChangeText={userImage => setImageUrl(userImage)}
             />
            <Button 
                title='Register'
                containerStyle={styles.button}
                onPress={register}
                raised
            />
            <IconButton
                icon='keyboard-backspace'
                size={30}
                style={styles.navButton}
                color='#8d61a8'
                onPress={() => navigation.goBack()}
            />
            <Text h5 style={styles.iconText}>Back to Login</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
    },
    titleText: {
      fontSize: 24,
      marginBottom: 30,
      color: '#8d61a8'
    },
    loginButtonLabel: {
      fontSize: 22
    },
    navButtonText: {
      fontSize: 18
    },
    navButton: {
      marginTop: 10
    },
    button: {
      width: 200,
      marginTop: 10,
      marginBottom: 10
    },
    iconText: {
      color: '#8d61a8',
      marginTop: -15,
      fontWeight: 'bold'
    }
  });

export default SignupScreen;