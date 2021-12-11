import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image} from 'react-native';
import { Title } from 'react-native-paper';
import { Button } from 'react-native-elements';
import FormInput from '../components/FormInput';
import { auth } from '../../firebase';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        console.log(authUser)
        if(authUser) {
          navigation.replace('Home');
        }
      });
      
      return unsubscribe;
    }, []);

    //login functionallity:
    const login = () => {
      auth.signInWithEmailAndPassword(email, password).catch(error => alert(error));
    }
    
    return (
        <View style={styles.container}>
          <Image source={ require('../../assets/loginImage.jpg') } style={styles.loginImage} />
            <Title style={styles.titleText}>Welcome to Traveho Chat!</Title>
            <FormInput 
                placeholder='Email'
                type='email'
                value={email}
                autoCapitalize='none'
                onChangeText={userEmail => setEmail(userEmail)}
            />
            <FormInput 
                placeholder='Password'
                type='password'
                value={password}
                secureTextEntry
                onChangeText={userPassword => setPassword(userPassword)}
            />
            <Button 
                title='Login'
                containerStyle={styles.button}
                raised
                onPress={login}
            />
            <Button 
                title='New user? Join here.'
                containerStyle={styles.button}
                raised
                type='outline'
                onPress={() => navigation.navigate('Signup')}
            />
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
      marginBottom: 25,
      color: '#8d61a8'
    },
    loginButtonLabel: {
      fontSize: 16,
    },
    navButtonText: {
      fontSize: 16
    },
    loginImage: {
      width: 170,
      height: 170,
      marginBottom: 20
    },
    button: {
      width: 200,
      marginTop: 10,
      marginBottom: 10
    }
  });

  export default LoginScreen;