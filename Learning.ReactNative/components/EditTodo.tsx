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

  const goBackAndUpdateTodo = () =>
  {
    navigation.goBack()
  }

  const addSubTask = () => { setSubTasks([...subTasks, subTask]); setSubTask('Ajouter une sous-tâche') }
  
  const removeSubTask = (index : number) =>
  { 
    const array = [...subTasks]
    
    array.splice(index - 1, 1)

    setSubTasks(array)
  }

  return <LinearGradient
            colors={['#420285', '#346fef']}
            start={[0.0, 1.0]}
            end={[1.0, 1.0]}
            style={style.background}>
    <TouchableOpacity style={style.goBackContainer} onPress={goBackAndUpdateTodo}>
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

      {subTasks.map((_ : string, index : number) =>
        <View style={style.editTodoContainer}>
            <Image source={require('../images/edit.png')} style={style.editTodoTitleIcon}/>
            <TextInput
                style={style.editSubTaskText}
                value={_}/>

          <TouchableOpacity style={style.removeTaskIcon} onPress={() => removeSubTask(index)}>
              <Image source={require('../images/close.png')} style={style.removeTaskIcon}/>
          </TouchableOpacity>
        </View>)
      }

      <View style={style.editTodoContainer}>
        <TouchableOpacity style={style.editTodoTitleIconContainer} onPress={addSubTask}>
          <Image source={require('../images/blue-plus.png')} style={style.editTodoTitleIcon}/>
          </TouchableOpacity>
        <TextInput
            style={style.editSubTaskText}
            onChangeText={setSubTask}
            value={subTask}/>
      </View>
    </View>

  </LinearGradient>
}