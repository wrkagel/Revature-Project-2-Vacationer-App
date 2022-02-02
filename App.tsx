import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, StatusBar } from 'react-native';
import EventsPage from './components/events-page';
import ProblemsPage from './components/problems-page';

export default function App() {

  const Tab = createBottomTabNavigator();


  return (<>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Events' component={EventsPage}/>
        <Tab.Screen name='Report a Problem' component={ProblemsPage}/>
      </Tab.Navigator>    
    </NavigationContainer>

    <StatusBar/>
  </>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dedede',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
