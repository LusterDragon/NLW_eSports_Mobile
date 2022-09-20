import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import { styles } from './styles';
import logoIMG from '../../assets/logo-nlw-esports.png';

import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/heading';
import { Background } from '../../components/background';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>();
  const navigation = useNavigation();

  function handleOpenGame({id,title,bannerURL}:GameCardProps){
    navigation.navigate('game', {id,title,bannerURL});
  }

  useEffect(() => {
    fetch('http://192.168.1.106:3333/games').then(response => response.json()).then(data => setGames(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoIMG} style={styles.logo} />
        <Heading title="Encontre o seu duo!" subtitle="Selecione o game que deseja jogar..."></Heading>
        <FlatList data={games} keyExtractor={item => item.id} renderItem={({ item }) =>
          <GameCard data={item} onPress={()=>handleOpenGame(item)} />
        } horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentList} />

      </SafeAreaView>
    </Background>

  );
}