import { View, Image, FlatList } from 'react-native';

import logoIMG from '../../assets/logo-nlw-esports.png';
import { GameCard } from '../../components/GameCard';
import { Heading } from '../../components/heading';
import { styles } from './styles';
import { GAMES } from '../../utils/games';

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={logoIMG} style={styles.logo} />
      <Heading title="Encontre o seu duo!" subtitle="Selecione o game que deseja jogar..."></Heading>
      <FlatList data={GAMES} keyExtractor={item => item.id} renderItem={({item}) =>
       <GameCard data={item} />         
    }  horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentList}/>

    </View>
  );
}