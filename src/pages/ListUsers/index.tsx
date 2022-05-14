import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, FlatList, Alert, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { Header } from "../../components/Header";
import { ListCard } from "../../components/ListCard";

interface ListUsersProps {
  id: string;
  name: string;
  cpf: string;
  // bancoAgencia: string;
  // conta: string;
  // salario: String;
}

interface ListBancoProps {
  bancoAgencia: string;
  conta: string;
  Salario: String;
}

const dadosBancos = [
  { banco: "001", agencia: "4530", conta: "102030-1", nome: "Banco do Brasil" },
  { banco: "237", agencia: "1230", conta: "403080-2", nome: "Banco Bradesco" },
  { banco: "241", agencia: "0140", conta: "12304-1", nome: "Banco Itau" },
  { banco: "033", agencia: "1450", conta: "011220-1", nome: "Banco Santander" },
];

export function ListUsers() {
  const [users, setUsers] = useState<ListUsersProps[]>([]);
  const [bancos, setBancos] = useState<ListBancoProps[]>([]);
  const [status, setStatus] = useState("");

  function handleDeleteUser(id: string) {
    Alert.alert("Exclusão", "Tem certeza?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          setStatus("E");
          setUsers((users) => users.filter((user) => user.id !== id));
        },
      },
    ]);
  }

  async function loadDataUser() {
    const data = await AsyncStorage.getItem("@si:users");
    if (data) {
      setUsers(JSON.parse(data));
    }
  }

  useEffect(() => {
    loadDataUser();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadDataUser();
    }, [])
  );

  useEffect(() => {
    async function saveUsers() {
      await AsyncStorage.setItem("@si:users", JSON.stringify(users));
    }
    saveUsers();
  }, [users]);

  // useEffect(() => {
  //   async function saveBanco() {
  //     await AsyncStorage.setItem("@si:bancos", JSON.stringify(bancos));
  //   }
  //   saveBanco();
  // }, []);

  return (
    <View style={styles.container}>
      <Header title="Lista de Funcionários" />
      <Text style={styles.text}>Dados do Recebimento</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListCard item={item} onPress={() => handleDeleteUser(item.id)} />
        )}
      />
      <Text style={styles.text}>Banco Pagador</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f0f2f5",
  },
  text: {
    fontSize: 28,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});
