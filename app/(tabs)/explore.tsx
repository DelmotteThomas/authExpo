import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "@/styles/explore.style";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";
import { colors } from "@/styles/colors";

export default function TabTwoScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons
              name="person"
              size={48}
              color={colors.primary}
            />
          </View>
          <View style={styles.editBadge}>
            <Ionicons name="camera-outline" size={18} color={colors.surface} />
          </View>
        </TouchableOpacity>

        <Text style={styles.email}>{user?.email}</Text>
      </View>
      <View style={styles.section}>
        <TouchableOpacity style={styles.buttonLogout}>
          <Ionicons name="log-out-outline" size={24} color="black" />
          <Text style={styles.logOutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
