import { StyleSheet, Text, View, Button,SafeAreaView, Image } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';

const Skip=({...props})=>(
  <Text {...props} style={{marginLeft:20, color:'blue'}}>Skip</Text>
);

const Next=({...props})=>(
  <Text {...props} style={{marginRight:20, color:'blue'}}>Next</Text>
);

const Done=({...props})=>(
  <Text {...props} style={{marginRight:20, color:'blue'}}>Done</Text>
);
  


const GetStarted = () => {
  const navigation=useNavigation();
  return (
    <Onboarding
    SkipButtonComponent={Skip}
    DoneButtonComponent={Done}
    NextButtonComponent={Next}
    onSkip={()=>navigation.replace('Login')}
    onDone={()=>navigation.navigate('Login')}
    
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image source={require('./s1.png')} />,
            title: 'FoodSha',
            subtitle: 'Food Sharing Application',
            
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('./s2.png')} />,
            title: 'Onboarding 2',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
        ]}
/>
  )
}

export default GetStarted

const styles = StyleSheet.create({
    mainfont:{
        //padding:10,
        position: 'absolute',
        width: 348,
        height: 77,
        FontFace: 'Poppins',
        // fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 64,
        lineHeight: 96,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: 'black'
    },

    subFont:{
        position: 'absolute',
        width: 349,
        height: 208,
        FontFace: 'Poppins',
        //fontStyle: 'normal',
        //fontWeight: 700,
        fontSize: 36,
        //lineHeight: 54,
        color:'rgba(0, 0, 0, 0.64)',
    },
    btnStart:{
        padding:10,
    },
    btnSkip:{},    
})