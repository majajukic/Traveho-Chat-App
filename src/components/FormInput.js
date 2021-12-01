import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';

//to dynamically calculate width and height of components corresponding to screen sizes:
const { width, height } = Dimensions.get('screen');

const FormInput = ({ labelName, ...rest }) => {

    return (
        <TextInput 
            label={labelName}
            style={styles.input}
            numberOfLines={1}
            {...rest}
        />
    );
}

//Styles for this component
const styles = StyleSheet.create({
    input: {
        marginTop: 10,
        marginBottom: 10,
        width: width / 1.5,
        height: height / 15
    }
});

export default FormInput;