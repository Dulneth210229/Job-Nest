import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { g } from "../../assets/styles/global";

export default function Home() {
  const { me, logout } = useAuth();
  const role = me?.role;

  return (
    <View style={g.screen}>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>
        Welcome {me?.profile?.fullName || me?.email}
      </Text>
      <View style={{ height: 12 }} />
      <Link href="/profile" style={g.chip}>
        Edit Profile
      </Link>

      <View style={{ height: 16 }} />
      <Text style={{ fontWeight: "700" }}>Jobs</Text>
      <Link href="/jobs/index" style={g.chip}>
        Browse Jobs
      </Link>
      {role === "JOB_POSTER" || role === "ADMIN" ? (
        <>
          <Link href="/organization/mine" style={g.chip}>
            My Organization
          </Link>
          <Link href="/organization/create" style={g.chip}>
            Create/Update Organization
          </Link>
          <Link href="/jobs/create" style={g.chip}>
            Post a Job (Stripe)
          </Link>
        </>
      ) : null}
      {role === "JOB_POSTER" || role === "ADMIN" ? (
        <Text style={{ marginTop: 10 }}>
          Open a job → View Applicants list inside job
        </Text>
      ) : null}

      <View style={{ height: 16 }} />
      <Text style={{ fontWeight: "700" }}>Applications</Text>
      <Link href="/applications/mine" style={g.chip}>
        My Applications
      </Link>

      <View style={{ height: 16 }} />
      <Text style={{ fontWeight: "700" }}>Chat</Text>
      <Link href="/chat/index" style={g.chip}>
        Conversations
      </Link>

      <View style={{ height: 16 }} />
      <Text style={{ fontWeight: "700" }}>Badges</Text>
      <Link href="/badges/catalog" style={g.chip}>
        Browse Badges
      </Link>
      <Link href="/badges/assess" style={g.chip}>
        Take Assessment
      </Link>

      <View style={{ height: 32 }} />
      <TouchableOpacity
        onPress={logout}
        style={[g.btn, { backgroundColor: "#ef4444" }]}
      >
        <Text style={g.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
