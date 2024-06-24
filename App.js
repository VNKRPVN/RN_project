import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import TabBar from "./src/navigation/tab";
import Login from "./src/screens/Login";
import { AccountContext } from './src/data/accountContext';

// export const AccountContext = createContext({
//   account: null,
//   SetAccount: () => {}
// });

export default function App() {
  const [account, SetAccount] = useState(null);

  return (
    <NavigationContainer>
      <AccountContext.Provider value={{ account, SetAccount }}>
        {account ? <TabBar /> : <Login />}
        <StatusBar />
      </AccountContext.Provider>
    </NavigationContainer>
  );
}
