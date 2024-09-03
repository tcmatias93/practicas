import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./src/components/Main";
import SingIn from "./src/components/login/SingIn";
import Layout from "./src/components/Layout";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          options={{ title: "Repositories", headerShown: false }}
        >
          {(props) => (
            <Layout navigation={props.navigation}>
              <Main {...props} />
            </Layout>
          )}
        </Stack.Screen>
        <Stack.Screen name="SingIn" options={{ title: "Sing In" }}>
          {(props) => (
            <Layout navigation={props.navigation}>
              <SingIn {...props} />
            </Layout>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
