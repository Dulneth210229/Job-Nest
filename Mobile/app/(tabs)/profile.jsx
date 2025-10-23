import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { Link } from "expo-router";

import { useAuth } from "../../context/AuthContext";
import { API } from "../../constants/config";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export default function profile() {
  const { me, logout } = useAuth();
  const role = me?.role;
  const userId = me?._id;

  const [greeting, setGreeting] = useState("");
  const [badges, setBadges] = useState([]);

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
  });

  useEffect(() => {
    if (!userId) return; // 🛑 Stop if userId not yet loaded
    const fetchBadges = async () => {
      try {
        const { data } = await axios.get(`${API}/badges/user/${userId}`);
        setBadges(data.data || []);
      } catch (error) {
        console.error("Error fetching badges:", error);
      }
    };
    fetchBadges();
  }, [userId]);
  return (
    <ScrollView>
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
              Member since {me?.createdAt.split("-")[0]}
            </Text>
            <Text style={{ marginTop: 5, color: COLORS.black, fontSize: 16 }}>
              Occupation: {me?.profile?.occupation}
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
        <View style={styles.card}>
          <Text
            style={{
              fontSize: 18,
              color: COLORS.textSecondary,
              marginBottom: 15,
            }}
          >
            Skills
          </Text>
          <View
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              gap: 10,
            }}
          >
            {me?.profile?.skills.map((k, index) => {
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: COLORS.primary,
                    padding: 7,
                    borderRadius: 10,
                  }}
                >
                  <Text>{k}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.card}>
          <FlatList
            data={badges}
            keyExtractor={(i) => i._id}
            renderItem={({ item }) => (
              <View
                style={{
                  padding: 12,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#eee",
                  marginVertical: 6,
                }}
              >
                <Text style={{ fontWeight: "700" }}>{item.badge?.title}</Text>
                <Text>
                  Level: {item.level} • Source: {item.source}
                </Text>
                {item.score ? <Text>Score: {item.score}</Text> : null}
                {item.endorsementsCount ? (
                  <Text>Endorsements: {item.endorsementsCount}</Text>
                ) : null}
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
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
    // paddingLeft: 24,
    // paddingRight: 24,
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
