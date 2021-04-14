import React, { useState} from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import style from '../style'
import { createTodo } from './todo.action';
import FadeInView from '../shared/FadeInView'

interface Props { animationDelay : number }
export default function AddTodo({ animationDelay} : Props)
{
    const [text, setText] = useState<string>("Ajouter une tâche");
    const dispatch = useDispatch()
    const onPress = () => { dispatch(createTodo(text)); setText('Ajouter une tâche') } // avant il faudra également dispatcher l'évenet de add
    
    return <View style={style.addTodoMainContainer}>
        <FadeInView delay={animationDelay}>
            <View style={style.addTodoContainer}>
                <TouchableOpacity onPress={onPress}>
                    <Image source={require('../images/plus.png')} style={style.addTodoIcon}/>
                </TouchableOpacity>
                
                <TextInput
                    style={style.addTodoText}
                    onChangeText={setText}
                    value={text}/>
            </View>
        </FadeInView>
    </View>
}