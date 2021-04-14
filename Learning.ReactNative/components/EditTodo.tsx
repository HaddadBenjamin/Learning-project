import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import ITodo from './todo.model'
import style from '../style'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native';

interface Props { todo : ITodo }
export default function EditTodo(todo : Props)
{
  const navigation = useNavigation()
 
  const goBack = () => { navigation.goBack() }

  return <LinearGradient
            colors={['#420285', '#346fef']}
            start={[0.0, 1.0]}
            end={[1.0, 1.0]}
            style={style.background}>
    <TouchableOpacity style={style.goBackContainer} onPress={goBack}>
      <Image source={require('../images/left-arrow.png')} style={style.goBackImage}/>
      <Text style={style.goBackText}>Liste de tâches</Text>
    </TouchableOpacity>
  </LinearGradient>
}