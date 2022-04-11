import React                            from 'react';
import { View, SafeAreaView }           from 'react-native';
import { createStackNavigator }         from '@react-navigation/stack';
import { RecoilRoot }                   from 'recoil';
import { NavigationContainer }          from '@react-navigation/native';
import { StatusBar }                    from 'expo-status-bar';

/* Router */
import DataList from './App/Router/DataList';
import DataView from './App/Router/DataView';

export default function App() {

  const Stack = createStackNavigator();

  return (
        <SafeAreaView style={{flex:1}}>
          <StatusBar style="auto" />
          <RecoilRoot>
              <React.Suspense fallback={<View/>}>
                  <NavigationContainer>
                      <Stack.Navigator screenOptions={{ headerShown: false }}>
                          <Stack.Screen name="DataList" component={DataList} />
                          <Stack.Screen name="DataView" component={DataView} />
                      </Stack.Navigator>
                  </NavigationContainer>
              </React.Suspense>
          </RecoilRoot>
        </SafeAreaView>
  );
}
