import { ThemeProvider } from "@/components/theme-provider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs as WebTabs } from "expo-router/tabs";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform, useWindowDimensions } from "react-native";

export default function Layout() {
  return (
    <ThemeProvider>
      <TabsLayout />
    </ThemeProvider>
  );
}

function TabsLayout() {
  if (process.env.EXPO_OS === "web") {
    return <WebTabsLayout />;
  } else {
    return <NativeTabsLayout />;
  }
}

function WebTabsLayout() {
  const { width } = useWindowDimensions();
  const isMd = width >= 768;
  const isLg = width >= 1024;

  return (
    <WebTabs
      screenOptions={{
        headerShown: false,
        ...(isMd
          ? {
              tabBarPosition: "left",
              tabBarVariant: "material",
              tabBarLabelPosition: isLg ? undefined : "below-icon",
            }
          : {
              tabBarPosition: "bottom",
            }),
      }}
    >
      <WebTabs.Screen
        name="index"
        options={{
          title: "Chat",
          tabBarIcon: (props) => <MaterialIcons {...props} name="chat" />,
        }}
      />
      <WebTabs.Screen
        name="info"
        options={{
          title: "Info",
          tabBarIcon: (props) => <MaterialIcons {...props} name="info" />,
        }}
      />
    </WebTabs>
  );
}

function NativeTabsLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Chat</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "bubble.left.and.bubble.right", selected: "bubble.left.and.bubble.right.fill" } },
            default: {
              src: <NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="chat" />,
            },
          })}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="info">
        <NativeTabs.Trigger.Label>Info</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: "cursorarrow.rays" },
            default: {
              src: <NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="info" />,
            },
          })}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
