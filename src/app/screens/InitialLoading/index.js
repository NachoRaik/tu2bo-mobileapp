import React from "react";
import { SafeAreaView, Text, ActivityIndicator } from "react-native";

import styles from "./styles";

function InitialLoading() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TU2BO</Text>
      <ActivityIndicator size="large" color={COLORS.white} />
    </SafeAreaView>
  );
}

export default InitialLoading;
