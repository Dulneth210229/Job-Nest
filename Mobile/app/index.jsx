import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "red" }}>Hello</Text>

      <Link href="auth/signup">Signup Page</Link>
      <Link href="auth"> Login Page</Link>
    </View>
  );
}
