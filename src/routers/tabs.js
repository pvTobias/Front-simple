import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import Home from "../screens/home";
import NewSubject from "../screens/newsubjet";

const TabsScreens = ({ navigation }) => {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {
      key: "Home",
      title: "Inicio",
      icon: "heart", // Aquí puedes configurar el icono según tus necesidades
      color: "red", // Color del icono
    },
    {
      key: "NewSubject",
      title: "Nueva Materia",
      icon: "book", // Icono para la nueva materia
      color: "blue", // Color del icono
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Home: Home,
    NewSubject: NewSubject,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default TabsScreens;
