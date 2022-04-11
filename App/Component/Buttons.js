import {  Text, View, TouchableWithoutFeedback } from 'react-native';


export function ButtonSingle(props) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={{width: "90%", height:55, borderRadius:6, justifyContent:"center",alignItems:"center", backgroundColor:"#282626",...props.style}}>
                <Text style={{color:"#ffffff", fontSize:16,...props.textStyle}}>{props.text}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

