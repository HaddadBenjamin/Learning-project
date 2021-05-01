import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import style from '../style'
import { createTodo } from './todo.action';
import FadeInView from '../shared/FadeInView'

interface Props { animationDelay : number }
export default function AddTodo({ animationDelay} : Props)
{
    const [text, setText] = useState<string>("Ajouter une tâche");
    const [keyboardShow, setKeyboardShow] = useState<boolean>(false)

    useEffect(() =>
    {
        Keyboard.addListener('keyboardWillShow', keyboardWillShow);
        Keyboard.addListener('keyboardWillHide', keyboardWillHide);

        return () =>
        {
            Keyboard.removeListener('keyboardWillShow', keyboardWillShow);
            Keyboard.removeListener('keyboardWillHide', keyboardWillHide);
        }
    }, [])

    const keyboardWillShow = (event : any) => { setKeyboardShow(true) }
    const keyboardWillHide = (event: any) => { setKeyboardShow(false) }

    const dispatch = useDispatch()
   
    const onPress = () => { dispatch(createTodo(text)); setText('Ajouter une tâche') }
   
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
            
            { keyboardShow ?
                <Text style={[style.addTodoText, { marginTop : -325 }]}>{text}</Text> 
                : <View></View>
            }
        </FadeInView>
    </View>
}