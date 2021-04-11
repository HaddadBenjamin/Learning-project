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
      marginLeft : 15
    },

    todoContainer :
    {
      borderRadius : 5,
      
      height : 55,
      width : '100%',

      marginBottom : 1.5,
      backgroundColor : 'rgb(240,240,240)',
      
      display : 'flex',
      justifyContent : 'center',
      alignItems : 'center',
    }
});

export default style