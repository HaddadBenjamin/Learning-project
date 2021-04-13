import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';

const style = StyleSheet.create(
{
    background: { flex: 1,},
    
    container : {flex : 1, margin : 5, marginTop : 100 },

    todoLeftContainer :  {flex : 1, flexDirection : 'row' },

    toggle :
    {
      width : 18,
      height : 18,
      borderWidth : 1,
      borderColor : '#346fef',
      backgroundColor : 'white',
      borderRadius : 100,
    },

    toggled : { backgroundColor : '#346fef' },

    toggleContent : { flex : 1, justifyContent: 'center', alignItems: 'center' },

    toggledImage : { width : 10, height : 10, marginTop : 2.5 },

    bookmark : { height : 18, width : 18, },
    
    mainTitle :
    {
      fontSize : 33,
      fontWeight : 'bold',
      color : '#fff',
      marginLeft : 10
    },

    completedTitle :
    {
      color : '#fff',
      fontSize : 15,
      
      margin : 5,
      marginLeft : 10
    },

    todoBackground :
    {
      borderRadius : 5,

      height : 55,
      width : '100%',

      marginBottom : 1.5,

      backgroundColor : 'rgb(240,240,240)',
    },

    todoContainer :
    {
      padding : 10,

      height : 55,
      width : '100%',

      display : 'flex',
      flexDirection : 'row',
      justifyContent : 'space-between',
      alignItems : 'center',
    },

    todoTitle : { marginLeft : 12.5 },

    addTodoMainContainer :
    {
      width: Dimensions.get('window').width,
      height: 110,

      backgroundColor : '#240b36',

      position: 'absolute',
      left : -5,
      bottom: -5, // -5
    },

    addTodoContainer : 
    {
      margin : 5,
      marginTop : 10,
      marginLeft : 10,
      padding : 10,

      backgroundColor : 'rgba(256,256,256,0.2)',
     
      width : Dimensions.get('window').width - 20,
      height : 50,

      display : 'flex',
      flexDirection : 'row',
      alignItems : 'center',

 
      borderRadius : 5,
    },

    addTodoIcon : { height : 16, width : 16, marginLeft : 5 },
    addTodoText : { marginLeft : 10, color : '#fff', width : Dimensions.get('window').width - 20,  }
});

export default style