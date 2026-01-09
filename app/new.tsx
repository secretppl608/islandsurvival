import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { TouchableOpacity, Text,TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import '@/global.css';
import Animated,{ useSharedValue } from "react-native-reanimated";


export default function New() {
  //#region a
  const enum choose{
    A = "剧情模式",
    B = "无限模式"
  }
  //#endregion
  useEffect(() => {
    async function a() {
      const { sound } = await Audio.Sound.createAsync(
        require("@/assets/sounds/button_click.mp3")
      );
      await sound.playAsync();
    }
    a();
  }, []);
  const [input,setInput] = useState('');
  let i = useSafeAreaInsets();
  return (
    <View className="w-full flex-col items-center">
    <Text style={{
        paddingTop: i.top,
        paddingLeft: i.left,
    }}
    className="color-slate-600 ">建立新存档</Text>
    <TextInput onChangeText={(e)=>{
      setInput(input => e);
    }} placeholder="请给您的存档取一个名称"></TextInput>

    <View>
      <TouchableOpacity>
        <Animated.View>
          简易
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Animated.View>
          中级
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Animated.View>
          现实
        </Animated.View>
      </TouchableOpacity>
    </View>
      {/*
       *  难度选择：简易、中档、现实
       *  模式选择： 剧情模式、无限模式
       * ID+名字，ID为（名称&创建日期）=> 哈希
       */}
    </View>
  )
}

