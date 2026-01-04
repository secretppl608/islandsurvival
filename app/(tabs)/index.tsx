import { Image } from 'expo-image';
import { Platform, Pressable, StyleSheet,Text,View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import React,{ useEffect } from 'react';
import {Audio} from 'expo-av';

export default function HomeScreen() {
  async function deal(){
    const {sound} = await Audio.Sound.createAsync(require('@/assets/sounds/button_click.mp3'));
    sound.playAsync();
  }
  useEffect(()=>{
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    changeScreenOrientation();
  },[]);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/web_free_beach.jpg')}
          style={styles.background}
        />
      }>

      <View>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">纯净海岛求生</ThemedText>
        </ThemedView>
        <Pressable onPress={deal}>
          <Text style={styles.new}>建立新存档</Text>
        </Pressable>
        <Pressable onPress={deal}>
          <Text style={styles.new}>玩旧存档</Text>
        </Pressable>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">准备享受海岛求生吧，勇敢无畏的船长</ThemedText>
          <ThemedText type='default'>游戏大纲：你是一位无畏且经验丰富的船长，这天你出海的时候，海上袭来惊天巨浪，于是，你被巨浪拍晕了，等你醒来时，就已经发现自己在竹筏上，不要问我竹筏怎么来的，或许是上天赐予的呢？</ThemedText>
          <ThemedText type='defaultSemiBold'>游戏玩法：可以在竹筏上，也可以自由寻找小岛求生，游戏最终目标：在好望角这种人迹罕至的地方，成功撑过漫长的时光，等到去往南极的观光船到来顺道把你就走/无限模式，不断求生，直至你把游戏卸载</ThemedText>
        </ThemedView>
        <ThemedText>
          这些都是expo默认带上的，还没来得及删掉--
            Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
            Press{' '}
            <ThemedText type="defaultSemiBold">
              {Platform.select({
                ios: 'cmd + d',
                android: 'cmd + m',
                web: 'F12',
              })}
            </ThemedText>{' '}
            to open developer tools.
          </ThemedText>
        <ThemedView style={styles.stepContainer}>
          <Link href="/modal">
            <Link.Trigger>
              <ThemedText type="subtitle">Step 2: Explore</ThemedText>
            </Link.Trigger>
            <Link.Preview />
            <Link.Menu>
              <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
              <Link.MenuAction
                title="Share"
                icon="square.and.arrow.up"
                onPress={() => alert('Share pressed')}
              />
              <Link.Menu title="More" icon="ellipsis">
                <Link.MenuAction
                  title="Delete"
                  icon="trash"
                  destructive
                  onPress={() => alert('Delete pressed')}
                />
              </Link.Menu>
            </Link.Menu>
          </Link>
          <ThemedText>
            {`Tap the Explore tab to learn more about what's included in this starter app.`}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
          <ThemedText>
            {`When you're ready, run `}
            <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
            <ThemedText type="defaultSemiBold">app-example</ThemedText>.
          </ThemedText>
        </ThemedView>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  background: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  new: {
    backgroundColor: '#4e5fga',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    width: 100,
    marginLeft: 250,
    textAlign: 'center'
  }
});
