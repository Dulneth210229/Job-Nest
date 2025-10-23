import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { API } from "../../constants/config";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function profile() {
  const { me, logout } = useAuth();
  const role = me?.role;

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const getGreeting = () => {
      const currentHour = new Date().getHours(); // 0 - 23

      if (currentHour < 12) {
        return "Good Morning !";
      } else if (currentHour < 17) {
        return "Good Afternoon !";
      } else if (currentHour < 21) {
        return "Good Evening !";
      } else {
        return "Good Night !";
      }
    };

    setGreeting(getGreeting());

    // Optional: Update greeting every minute if user stays on page
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/profile.jpg")}
            style={{
              width: width * 0.3,
              height: width * 0.3,
              borderRadius: (width * 0.3) / 2, // Makes the image circular
              alignItems: "center",
            }}
            resizeMode="cover"
          />
          <Text style={styles.subtitle}>
            {greeting} {me?.profile?.fullName || me?.email}
          </Text>
          <Text style={styles.subtitle}>
            Member since : {me?.createdAt.split("-")[0]}
          </Text>
        </View>
      </View>
      <View style={styles.card}>
        <View>
          <Text style={{ fontSize: 18, color: COLORS.textSecondary }}>
            Contact Information
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            marginVertical: 10, // space above and below the line
          }}
        />
        <View style={{ marginTop: "10" }}>
          <View style={{ flexDirection: "row", marginBottom: "15" }}>
            <Ionicons
              name="call-outline"
              size={20}
              color={COLORS.primary}
              style={styles.inputIcon}
            />
            <Text style={styles.label}>{me?.profile?.phone}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="mail-outline"
              size={20}
              color={COLORS.primary}
              style={styles.inputIcon}
            />
            <Text style={styles.label}>{me?.email}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

import COLORS from "../../constants/colors";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: COLORS.border,
    // marginTop: -24,
    marginBottom: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.textSecondary,
    textAlign: "center",

    marginTop: 16,
  },
  formContainer: {
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    color: COLORS.textDark,
  },
});
