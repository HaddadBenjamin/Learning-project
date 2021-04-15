import React from 'react';
import { StatusBar, View } from 'react-native';
import style from './style'
import TodoList from './components/TodoList'
import EditTodo from './components/EditTodo'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import store from './store'

export default function App()
{
  const Stack = createStackNavigator();

  return <Provider store={store}>
   <View style={style.background}>
      <StatusBar hidden />
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Liste de tâches" component={TodoList} options={{headerShown: false}} />
        <Stack.Screen name="Éditer une tâche" component={EditTodo} options={{headerShown: false}} />
      </Stack.Navigator>
      </NavigationContainer>
    </View>
  </Provider>
}