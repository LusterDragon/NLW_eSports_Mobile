import { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';


import { styles } from './styles';
import { THEME } from '../../theme';
import logoIMG from '../../assets/logo-nlw-esports.png';

import { Background } from '../../components/background';
import { gameParams } from '../../@types/navigation';
import { Heading } from '../../components/heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DouMatch } from '../../components/DouMatch';





export function Game() {
    const route = useRoute();
    const navigation = useNavigation();
    const [duos, setDuo] = useState<DuoCardProps[]>([]);
    const [discordDuoSelected, setDiscordDuoSelected] = useState('');

    function handleGoBack() {
        navigation.goBack();
    }

    async function getDiscordUser(adsId: string) {
        await fetch(`http://192.168.1.106:3333/ads/${adsId}/discord`).then(response =>
            response.json()).then(data => setDiscordDuoSelected(data.discord));
    }

    const game = route.params as gameParams;

     useEffect(() => {
        fetch(`http://192.168.1.106:3333/games/${game.id}/ads`).then(response => response.json()).then(data => setDuo(data))
    }, []);



    return (
        <Background>
            <SafeAreaView style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo name='chevron-thin-left' color={THEME.COLORS.CAPTION_300} size={20} />
                    </TouchableOpacity>
                    <Image source={logoIMG} style={styles.logo} />
                    <View style={styles.right} />
                </View>

                <Image source={{ uri: game.bannerURL }} style={styles.cover} resizeMode='cover' />
                <Heading title={game.title} subtitle='conecte-se e comece a jogar!' />

                <FlatList
                    data={duos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
                    )}
                    horizontal
                    contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
                    style={styles.containerList}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>Ainda não há anúncios publicados para esse jogo.</Text>
                    )}
                />

                <DouMatch visible={discordDuoSelected.length > 0} discord={discordDuoSelected} onClose={() => setDiscordDuoSelected('')} />
            </SafeAreaView>
        </Background>
    );
}