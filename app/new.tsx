import { useEffect } from "react";
import { Audio } from "expo-av";
import { Text,TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import '@/global.css';


export default function New() {
  const enum choose{
    A = "剧情模式",
    B = "无限模式"
  }
  useEffect(() => {
    async function a() {
      const { sound } = await Audio.Sound.createAsync(
        require("@/assets/sounds/button_click.mp3")
      );
      await sound.playAsync();
    }
    a();
  }, []);
  let i = useSafeAreaInsets();
  return (
    <View className="w-full flex-col items-center">
    <Text style={{
        paddingTop: i.top,
        paddingLeft: i.left,
    }}
    className="color-slate-600 ">建立新存档</Text>
      {/*
       *  难度选择：简易、中档、现实
       *  模式选择： 剧情模式、无限模式
       * ID+名字，ID为（名称&创建日期）=> 哈希
       */}
    </View>
  )
}
