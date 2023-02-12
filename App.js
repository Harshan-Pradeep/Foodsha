
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';
import Forget from './screens/Forget';
import AppRouter from './router/router';
import Card from './screens/Card';
import Splash from './splash/Splash';
import CreateListing from './screens/CreateListing';
import React, {useState, useEffect} from 'react';
import {firebase} from './config';
import CommonListing from './screens/CommonListing';
import DonationListings from './screens/DonationListings';



const Stack = createNativeStackNavigator();

const App=()=> {
  const [initializing, setInitializing]=useState(true);
  const [user, setUser]=useState();

  //Handle user state
  function onAuthStateChanged(user){
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(()=>{
    const subscriber=firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  },[]);

  if(initializing) return null;

  if(!user){
    return(
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown:false}} name="Register" component={Register} />
      </Stack.Navigator>
    );
  }
  return(
    <Stack.Navigator>
      <Stack.Screen options={{headerShown:false}} name="DonationListing" component={DonationListing} />
      
    </Stack.Navigator>
  ); 
}

export default()=>{
  return(
    <NavigationContainer>
      <DonationListings />
    </NavigationContainer>
  )
}




