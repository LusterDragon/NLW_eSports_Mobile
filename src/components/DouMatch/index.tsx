import React, { useState } from 'react';
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native';
import * as Clipboard from 'expo-clipboard';

import { styles } from './styles';
import { THEME } from '../../theme';

import { Heading } from '../heading';

interface Props extends ModalProps {
    discord: string
    onClose: () => void
}

export function DouMatch({ discord, onClose, ...rest }: Props) {
    const [iscopying, setIsCopying] = useState(false);
    async function handleCopyDiscordUserToClipboard() {
        setIsCopying(true);
        await Clipboard.setStringAsync(discord);
        Alert.alert('Discord copiado!', 'Usuário do discord copiado para área de transferência.');
        setIsCopying(false);
    }

    return (
        <Modal animationType='fade' {...rest} transparent statusBarTranslucent >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                        < MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500} />
                    </TouchableOpacity>
                    <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />
                    <Heading title="Let's Play!" subtitle="Agora é só começar a jogar!" style={{ alignItems: 'center', marginTop: 24 }} />
                    <Text style={styles.label}>Adiocione no discord</Text>
                    <TouchableOpacity style={styles.discordButton} onPress={handleCopyDiscordUserToClipboard}
                        disabled={iscopying}>
                        <Text style={styles.discord}>
                            {iscopying ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}