
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
import Card from './screens/Card';
import UserProfile from './screens/UserProfile';
import UserListings from './screens/UserLisitngs';

import AsyncStorage from '@react-native-async-storage/async-storage';


import GetStarted from './screens/OnBoadingUi/GetStarted';



const App=()=> {
  const Stack=createNativeStackNavigator();


  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [initializing, setInitializing]=useState(true);
  const [user, setUser]=useState();

  // useEffect(()=>{
  //   AsyncStorage.getItem('alreadyLaunched').then(value=>{
  //     if(value==null){
  //       AsyncStorage.setItem('alreadyLaunched','true');
  //     }else{
  //       setIsFirstLaunch(false);
  //     }
  //   })
  // },[]);

  // if(isFirstLaunch==null){
  //   return null;
  // }else if (isFirstLaunch==true){
  //   return(
  //     < Stack.Navigator >
  //       <Stack.Screen options={{headerShown:false}} name="GetStarted" component={GetStarted} />
  //       <Stack.Screen options={{headerShown:false}} name="Login" component={Login} />
  //     </Stack.Navigator>
  //   );}else{
  //     <Login/>
  //   }
  


  //Handle user state
  function onAuthStateChanged(user){
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(()=>{
    //check whether app is previously launched or not
    AsyncStorage.getItem('alreadyLaunched').then(value=>{
      if(value==null){
        AsyncStorage.setItem('alreadyLaunched','true');
      }else{
        setIsFirstLaunch(false);
      }
    })

    const subscriber=firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  },[]);

  if(initializing) return null;


  //get started screen with login
  if(isFirstLaunch==null){
    return null;
  }else if (isFirstLaunch==true){
    return(
      < Stack.Navigator >
        <Stack.Screen options={{headerShown:false}} name="GetStarted" component={GetStarted} />
        <Stack.Screen options={{headerShown:false}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown:false}} name="Register" component={Register} />
      </Stack.Navigator>
    );}else{
      <Login/>
    }

  if(!user){
    return(
      < Stack.Navigator >
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
      <Stack.Screen options={{headerShown:true}} name="CreateListing" component={CreateListing} />
      <Stack.Screen options={{headerShown:false}} name="Card" component={Card} />
      <Stack.Screen options={{headerShown:false}} name="UserProfile" component={UserProfile} />
      <Stack.Screen options={{headerShown:false}} name="UserListings" component={UserListings} />


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




