import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';

//to dynamically calculate width and height of components corresponding to screen sizes:
const { width } = Dimensions.get('screen');

const FormInput = ({ labelName, type, ...rest }) => {

    return (
        <Input
            placeholder={labelName}
            style={styles.input}
            type={type}
            {...rest}
        />
    );
}

//Styles for this component
const styles = StyleSheet.create({
    input: {
        marginBottom: 5,
        width: width / 2,
        height: 20
    }
});

export default FormInput;