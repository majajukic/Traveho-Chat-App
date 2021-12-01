import React from 'react';
import { StyleSheet, Dimensions, text } from 'react-native';
import { Button } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

//rest signilizes other props being passed that don't necessarly change.
const FormButton = ({ title, modeVlue, ...rest }) => {

    //paper has three modes for buttons, better to pass the current as a prop.
    return (
       <Button 
            mode={modeVlue}
            {...rest}
            style={styles.button}
            contentStyle={styles.buttonContainer}>
            {title} </Button>
    );
}

const styles = StyleSheet.create({
    button: {
      marginTop: 10
    },
    buttonContainer: {
      width: width / 2,
      height: height / 15
    }
  });

export default FormButton;