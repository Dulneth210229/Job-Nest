import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from "react-native";
import { useLocalSearchParams, Link, useRouter } from "expo-router";
import { useAuth } from "../../../context/AuthContext";
import { g } from "../../../assets/styles/global";

export default function Conversations() {
  const { axiosAuth } = useAuth();
  const [list, setList] = useState([]);
  const [otherUserId, setOtherUserId] = useState("");
  const router = useRouter();

  const params = useLocalSearchParams();
  const withParam = Array.isArray(params.with) ? params.with[0] : params.with;

  const load = async () => {
    const { data } = await axiosAuth.get(`/chat/conversations`);
    setList(data.data || []);
  };
  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (withParam) startConversation(withParam);
  }, [withParam]);

  const startConversation = async (userId) => {
    try {
      const { data } = await axiosAuth.post(`/chat/conversations`, {
        otherUserId: userId,
      });
      router.push(`/chat/${data.data._id}`);
    } catch (e) {
      Alert.alert("Error", e?.response?.data?.message || String(e));
    }
  };

  return (
    <View style={g.screen}>
      <View style={g.rowBetween}>
        <TextInput
          placeholder="User ID to chat"
          style={[g.input, { flex: 1, marginRight: 8 }]}
          value={otherUserId}
          onChangeText={setOtherUserId}
        />
        <TouchableOpacity
          onPress={() => startConversation(otherUserId)}
          style={g.btn}
        >
          <Text style={g.btnText}>Start</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={list}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => (
          <Link
            href={{ pathname: "/chat/[id]", params: { id: item._id } }} // safer than string concat
            asChild
            style={{
              padding: 12,
              borderWidth: 1,
              borderColor: "#eee",
              borderRadius: 12,
              marginVertical: 6,
            }}
          >
            <Text style={{ fontWeight: "700" }}>
              {item.participants
                ?.map((p) => p?.profile?.fullName || p?.email)
                .join(", ")}
            </Text>
          </Link>
        )}
      />
    </View>
  );
}
