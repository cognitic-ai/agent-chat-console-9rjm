import { useState } from "react";
import { View, ScrollView, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import * as AC from "@bacons/apple-colors";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

export default function ChatRoute() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Mac Mini agent. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Mock agent response (we'll replace this with real API later)
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `I received: "${newMessage.text}". This is a mock response from your Mac Mini agent!`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{
        flex: 1,
        backgroundColor: AC.systemBackground
      }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ flex: 1, padding: 16 }}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={{
                marginBottom: 12,
                alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
              }}
            >
              <View
                style={{
                  backgroundColor: message.isUser ? AC.systemBlue : AC.secondarySystemBackground,
                  padding: 12,
                  borderRadius: 18,
                  borderCurve: 'continuous',
                }}
              >
                <Text
                  selectable
                  style={{
                    color: message.isUser ? 'white' : AC.label,
                    fontSize: 16,
                    lineHeight: 20,
                  }}
                >
                  {message.text}
                </Text>
              </View>
              <Text
                style={{
                  color: AC.secondaryLabel,
                  fontSize: 12,
                  marginTop: 4,
                  textAlign: message.isUser ? 'right' : 'left',
                }}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={{
          flexDirection: 'row',
          padding: 16,
          paddingTop: 12,
          backgroundColor: AC.systemBackground,
          borderTopWidth: 1,
          borderTopColor: AC.separator,
          gap: 12,
        }}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor={AC.placeholderText}
            style={{
              flex: 1,
              backgroundColor: AC.secondarySystemBackground,
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 20,
              borderCurve: 'continuous',
              color: AC.label,
              fontSize: 16,
            }}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
            multiline
            maxLength={500}
          />
          <Pressable
            onPress={sendMessage}
            disabled={!inputText.trim()}
            style={({ pressed }) => ({
              backgroundColor: inputText.trim() ? AC.systemBlue : AC.quaternaryLabel,
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 20,
              borderCurve: 'continuous',
              opacity: pressed ? 0.7 : 1,
              justifyContent: 'center',
              alignItems: 'center',
            })}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '600',
              }}
            >
              Send
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
