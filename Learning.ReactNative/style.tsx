import { StyleSheet } from 'react-native';

const style = StyleSheet.create(
{
    background: { flex: 1, backgroundColor: 'rgb(83,111,219)' },
    
    container : { margin : 5, marginTop : 100 },
    
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

    todoCheckbox : { margin : 15 },

    todoBookmark : { height : 18, width : 18}
});

export default style