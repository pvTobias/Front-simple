import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login";
import Signup from "../screens/signup";
import tabs from "./tabs";
import Home from "../screens/home"; // Asegúrate de importar Home

const Stack = createNativeStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Login}
        name="Login"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Signup}
        name="crearCuenta"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={tabs}
        name="tabs"
        options={{ headerShown: false }} // Opcionalmente puedes ocultar el header aquí
      />
      <Stack.Screen
        component={Home}
        name="Home" // Asegúrate de que el nombre sea "Home"
      />
    </Stack.Navigator>
  );
};

export default StackScreen;
