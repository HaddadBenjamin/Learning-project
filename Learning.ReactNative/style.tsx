import { StyleSheet } from 'react-native';

const style = StyleSheet.create(
{
    background: { flex: 1},
    
    container : { margin : 5, marginTop : 100 },

    toggle :
    {
      width : 18,
      height : 18,
      borderWidth : 1,
      borderColor : '#346fef',
      backgroundColor : 'white',
      borderRadius : 100,
      cursor: 'pointer'
    },

    toggled : { backgroundColor : '#346fef' },

    toggleContent : { width : 10, height : 10, margin : 'auto', marginTop : 2.2 },

    bookmark : { height : 18, width : 18, cursor: 'pointer' },
    
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

});

export default style