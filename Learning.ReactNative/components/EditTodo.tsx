import React, { useState } from 'react'
import { Image, Text, View, TouchableOpacity, TextInput } from 'react-native'
import ITodo from './todo.model'
import style from '../style'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation, useRoute } from '@react-navigation/native'

export default function EditTodo()
{
  const navigation = useNavigation()
  const route = useRoute()
  const todo : ITodo = route.params as ITodo

  const [title, setTitle] = useState<string>(todo.title)
  const [description, setDescription] = useState<string>(todo.description || 'Ajouter une description')
  const [subTask, setSubTask] = useState<string>('Ajouter une sous-tâche')
  const [subTasks, setSubTasks] = useState<string[]>(todo.subTasks)

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

    <View style={[style.container, { marginTop : 30}]}>
      <View style={style.editTodoContainer}>
          <Image source={require('../images/edit.png')} style={style.editTodoTitleIcon}/>
          <Text style={style.editLabel}>Titre</Text>
          <TextInput
              style={style.editTodoText}
              onChangeText={setTitle}
              value={title}/>
      </View>

      <View style={style.editTodoContainer}>
          <Image source={require('../images/edit.png')} style={style.editTodoTitleIcon}/>
          <Text style={style.editLabel}>Description</Text>
          <TextInput
              style={style.editTodoText}
              onChangeText={setDescription}
              value={description}/>
      </View>

      <Text style={style.completedTitle}>Les étapes</Text>

      {subTasks.map(_ =>
        <View style={style.editTodoContainer}>
            <Image source={require('../images/edit.png')} style={style.editTodoTitleIcon}/>
            <TextInput
                style={style.editSubTaskText}
                value={_}/>
        </View>)
      }

      <View style={style.editTodoContainer}>
          <Image source={require('../images/blue-plus.png')} style={style.editTodoTitleIcon}/>
          <TextInput
              style={style.editSubTaskText}
              onChangeText={setSubTask}
              value={subTask}/>
      </View>
    </View>

  </LinearGradient>
}