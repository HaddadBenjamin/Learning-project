import React, { useState} from 'react';
import { View, TextInput, Image, TouchableWithoutFeedback } from 'react-native';
import style from '../style'

export default function AddTodo()
{
    const [text, setText] = useState<string>("Ajouter une tâche");

    const onPress = () => { setText('') } // avant il faudra également dispatcher l'évenet de add
    
    return <View style={style.addTodoMainContainer}>
    <View style={style.addTodoContainer}>
        <TouchableWithoutFeedback style={style.toggle} onPress={onPress}>
            <Image source={require('../images/plus.png')} style={style.addTodoIcon}/>
        </TouchableWithoutFeedback>
        
        <TextInput
            style={style.addTodoText}
            onChangeText={setText}
            value={text}/>
    </View>
  </View>
}