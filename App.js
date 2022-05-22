import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import lampada1 from './assets/icones/lampada-1.png'
import lampada2 from './assets/icones/lampada-2.png'
import dio from './assets/icones/logo.png'
import dioWhite from './assets/icones/logo-1.png'
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake'

const App = () =>{

  const [toggle, setToggle] = useState(false)
  const handleChangeToggle = () => setToggle(old => !old)

  useEffect(()=> {
    Torch.switchState(toggle)
    console.log(`Mudou o estado ${toggle}`)
  },[toggle])

  useEffect(() =>{
    /**
     * QUANDO CHACOALHAR O CELULAR
     */
    const subscription = RNShake.addListener(() =>{
      setToggle(old => !old)
    })
    //DESMONTA O COMPONENTE
    return () => subscription.remove()
  },[])
  
  return(
    <View style={ toggle ? style.containerLight : style.container } >
      <TouchableOpacity onPress={ handleChangeToggle } >
        { toggle ? 
          <Image style={style.lampadaStyle} source={lampada1} /> : 
          <Image style={style.lampadaStyle} source={lampada2} />
        }

        { toggle ? 
          <Image style={style.dioStyle} source={dio} /> : 
          <Image style={style.dioStyle} source={dioWhite} />
        }

        { toggle ? 
          <Text style={style.textDoc} >Aqui vem o texto!</Text> : 
          <Text style={style.textDocWhite} >Ola mundo!</Text>
        }
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center'
  },
  containerLight:{
    flex:1,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center'
  },
  textDoc:{
    color:'black',
    fontSize:24,
    marginTop:15,
    textAlign:'center'
  },
  textDocWhite:{
    color:'white',
    fontSize:24,
    marginTop:15,
    textAlign:'center'
  },
  lampadaStyle:{
    resizeMode:'contain',
    alignSelf:'center',
    width:150,
    height:150
  },
  dioStyle:{
    resizeMode:'contain',
    alignSelf:'center',
    width:220,
    height:220
  }
})

export default App