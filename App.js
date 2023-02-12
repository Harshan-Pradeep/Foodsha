
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';
import Splash from './splash/Splash';
import CreateListing from './screens/CreateListing';
import React, {useState, useEffect} from 'react';
import {firebase} from './config';
import CommonListing from './screens/CommonListing';
import DonationListings from './screens/DonationListings';
import RequestListings from './screens/RequestListings';
import DiscountListings from './screens/DiscountListings';



import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';




const App=()=> {
  const Stack=createNativeStackNavigator();



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
      <Stack.Screen options={{headerShown:false}} name="CommonListing" component={CommonListing} />
      <Stack.Screen options={{headerShown:false}} name="DonationListings" component={DonationListings} />
      <Stack.Screen options={{headerShown:false}} name="RequestListings" component={RequestListings} />
      <Stack.Screen options={{headerShown:false}} name="DiscountListings" component={DiscountListings} />
      <Stack.Screen options={{headerShown:false}} name="CreateListing" component={CreateListing} />
    </Stack.Navigator>
    
  ); 
}

export default()=>{
  return(
    <NavigationContainer >
      <App />
    </NavigationContainer>
  )
}




