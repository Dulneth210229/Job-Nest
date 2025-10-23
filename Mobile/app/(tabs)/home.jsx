import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import COLORS from "../../constants/colors";

export default function Home() {
  const { me, logout } = useAuth();
  const role = me?.role;

  return (
    <ScrollView style={{ backgroundColor: COLORS.background }}>
      <View>
        {/* Header */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.cardBackground,
              padding: 20,
              justifyContent: "center",
              borderRadius: 10,
              shadowColor: COLORS.black,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
              borderWidth: 1,
              borderColor: COLORS.border,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 14,
                color: COLORS.textPrimary,
                fontWeight: "500",
              }}
            >
              Active Jobs
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 14,
                color: COLORS.textPrimary,
                fontWeight: "500",
              }}
            >
              4
            </Text>
          </View>
          <View>
            <Text>Urgent Hiring</Text>
            <Text>10</Text>
          </View>
          <View>
            <Text>Online</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
