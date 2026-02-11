import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { styles } from "@/styles/login.style";
import { colors } from "@/styles/colors";
import { Link, router } from "expo-router";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function registerScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirm, setConfirm] = useState("");
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!email || !password || !confirm) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }
    if(password !== confirm){
        Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
        return;
    }
    if (password.length < 6){
        Alert.alert("Erreur", "Le mot de passe doit contenir au moins 6 caractères");
        return;
    }
    setIsLoading(true);
    try {
      await register(email, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert(
        "Erreur",
        error.message || "Une erreur est survenue lors de la connexion",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Inscription </Text>
        <Text style={styles.subtitle}>
          Créez un compte pour commencer
        </Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor={colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmer le mot de passe"
            placeholderTextColor={colors.textSecondary}
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
          />
          <TouchableOpacity
          
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.lightAccent}></ActivityIndicator>
            ) : (
              <Text style={styles.buttonText}>S'inscrire</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Déjà un compte ?</Text>
          <Link href={"/(auth)/login"} asChild>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Se connecter</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
