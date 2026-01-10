import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { TouchableOpacity, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "@/global.css";
import { File, Paths } from "expo-file-system/next";
import * as Crypto from 'expo-crypto';

export default function New() {
    const [$point, set$Point] = useState(0);
    const [key, setKey] = useState(0);
    //类似于C语言的指针，例如int s = 3;int *p = &s;我也记不清了
    //#region a
    const choose = {
        A: [
            "简单",
            "鲨鱼？你想多了我的朋友，简单模式下，您可以日光浴、钓鱼、或者修葺小房子，但也仅此而已",
        ],
        B: [
            "中档",
            "oh，我的朋友，你可算来对地方了，如果你没有足够的经验但想要些难度，那此模式可太适合你了",
        ],
        C: [
            "现实",
            "是时候该迎来真正的挑战了！来吧，勇敢面对那些大家伙，探寻这座海岛的全部秘密，你肯定行的",
        ],
    };
    //#endregion
    useEffect(() => {
        setKey((prev) => prev + 1);
    }, []);
    useEffect(() => {
        async function a() {
            const { sound } = await Audio.Sound.createAsync(
                require("@/assets/sounds/button_click.mp3")
            );
            await sound.playAsync();
        }
        a();
    }, [key]);
    const [input, setInput] = useState("");
    let i = useSafeAreaInsets();
    return (
        <View className="w-full flex-col items-center">
            <Text
                style={{
                    paddingTop: i.top,
                    paddingLeft: i.left,
                }}
                className="color-slate-600 "
            >
                建立新存档
            </Text>
            <TextInput
                onChangeText={(e) => {
                    setInput(e);
                }}
                placeholder="请给您的存档取一个名称"
                className="border-2 mb-4 mt-4 w-3/4"
            ></TextInput>

            <View className="flex-row">
                {Object.values(choose).map((text, index) => {
                    return (
                        <TouchableOpacity
                            id={index.toString()}
                            key={index}
                            onPress={(e) => {
                                set$Point(parseInt(index.toString(), 10));
                                setKey((prev) => prev + 1);
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: $point === index ? "gray" : "white",
                                    borderColor: "black",
                                    borderWidth: 2,
                                    padding: 10,
                                    marginRight: 5,
                                }}
                            >
                                <Text>{text[0]}</Text>
                                <Text>{text[1]}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <TouchableOpacity
                onPress={async () => {
                    setKey(prev => prev+1);
                    const f = new File(Paths.document, "world.txt");
                    let saves = [];
                    if (f.exists) {
                        const content = await f.text();
                        saves = JSON.parse(content);
                    }
                    (saves as any[]).push({ name: input, level: $point, id: saves.length + 1,hash:await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA1,`${input}-${Date.now()}`) });
                    f.write(JSON.stringify(saves));
                }}
            >
                <View style={{
                                    backgroundColor: "gray",
                                    borderColor: "black",
                                    borderWidth: 2,
                                    padding: 10,
                                    marginRight: 5,
                                }}>
                    <Text>创建新存档</Text>
                </View>
            </TouchableOpacity>
            {/*
             *  难度选择：简易、中档、现实
             *  模式选择： 剧情模式、无限模式
             * ID+名字，ID为（名称&创建日期）=> 哈希
             */}
        </View>
    );
}
