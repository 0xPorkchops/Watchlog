// import { Stack } from 'expo-router/stack'

// export default function Layout() {
//   return <Stack />
// } 
// commenting this out so i can hide the header for the demo lol 
import { Stack } from 'expo-router';
import React from 'react';

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}