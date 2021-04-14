import React, { useState } from 'react'
import { Image, Text, View, TouchableOpacity, TextInput } from 'react-native'
import ITodo from './todo.model'
import style from '../style'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { updateTodo } from './todo.action'
import FadeInView from '../shared/FadeInView'

export default function EditTodo()
{
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const todo : ITodo = route.params as ITodo

  const [title, setTitle] = useState<string>(todo.title)
  const [description, setDescription] = useState<string>(todo.description || 'Ajouter une description')
  const [subTask, setSubTask] = useState<string>('Ajouter une sous-tâche')
  const [subTasks, setSubTasks] = useState<string[]>(todo.subTasks)

  const goBackAndUpdateTodo = () =>
  {
    const updatedTodo : ITodo = { ...todo, title : title, description : description, subTasks : subTasks }

    dispatch(updateTodo(updatedTodo))
    navigation.goBack()
  }

  const addSubTask = () => { setSubTasks([...subTasks, subTask]); setSubTask('Ajouter une sous-tâche') }
  
  const removeSubTask = (index : number) =>
  { 
    const array = [...subTasks]
    
    array.splice(index - 1, 1)

    setSubTasks(array)
  }

  const editSubTask = (subTask : string, index : number) =>
  {
    const array = [...subTasks]
    
    array.splice(index, 1, subTask)

    setSubTasks(array)
  }

  const displaySubTask = (_ : string, index : number) =>
  {
    animationDelay += 250

    return <FadeInView delay={animationDelay}>
      <View style={style.editTodoContainer}>
        <Image source={require('../images/edit.png')} style={style.editTodoTitleIcon}/>
          <TextInput
              key={`${todo.id}-subTasks-${index}`}
              style={style.editSubTaskText}
              onChangeText={(editedSubTask) => editSubTask(editedSubTask, index)}
              value={_}/>

        <TouchableOpacity style={style.removeTaskIcon} onPress={() => removeSubTask(index)}>
            <Image source={require('../images/close.png')} style={style.removeTaskIcon}/>
        </TouchableOpacity>
      </View>
    </FadeInView>
  }

  const incrementAnimationDelay = (increment : number) => { animationDelay += increment}

  let animationDelay : number = 0
 
  return <LinearGradient
            colors={['#420285', '#346fef']}
            start={[0.0, 1.0]}
            end={[1.0, 1.0]}
            style={style.background}>
    <FadeInView delay={animationDelay}>
      <TouchableOpacity style={style.goBackContainer} onPress={goBackAndUpdateTodo}>
        <Image source={require('../images/left-arrow.png')} style={style.goBackImage}/>
        <Text style={style.goBackText}>Liste de tâches</Text>
      </TouchableOpacity>
    </FadeInView>

    <View style={[style.container, { marginTop : 30}]}>
      <FadeInView delay={animationDelay + 250}>
        <View style={style.editTodoContainer}>
            <Image source={require('../images/edit.png')} style={style.editTodoTitleIcon}/>
            <Text style={style.editLabel}>Titre</Text>
            <TextInput
                style={style.editTodoText}
                onChangeText={setTitle}
                value={title}/>
        </View>
      </FadeInView>

      <FadeInView delay={animationDelay + 500}>
        <View style={style.editTodoContainer}>
            <Image source={require('../images/edit.png')} style={style.editTodoTitleIcon}/>
            <Text style={style.editLabel}>Description</Text>
            <TextInput
                style={style.editTodoText}
                onChangeText={setDescription}
                value={description}/>
        </View>
      </FadeInView>

      <FadeInView delay={animationDelay + 750}>
        <Text style={style.completedTitle}>Les étapes</Text>
      </FadeInView>

      {incrementAnimationDelay(1600)}
      {subTasks.map(displaySubTask)}

      <FadeInView delay={animationDelay + 250}>
        <View style={style.editTodoContainer}>
          <TouchableOpacity onPress={addSubTask}>
            <Image source={require('../images/blue-plus.png')} style={style.editTodoTitleIcon}/>
            </TouchableOpacity>
          <TextInput
              style={style.editSubTaskText}
              onChangeText={setSubTask}
              value={subTask}/>
        </View>
      </FadeInView>
    </View>

  </LinearGradient>
}