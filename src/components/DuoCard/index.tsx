import { TouchableOpacity, View,Text } from 'react-native';
import { GameController } from 'phosphor-react-native';

import { styles } from './styles';
import { THEME } from '../../theme';

import { DuoInfo } from '../DuoInfo';


export interface DuoCardProps {
  id: string,
  name: string,
  weekDays: string[],
  useVoiceChanel: boolean,
  yearsPlaying: number,
  hourStart: string,
  hourEnd: string
}

interface Props {
  data: DuoCardProps,
  onConnect:() => void
}
export function DuoCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>

      <DuoInfo label='Nome' value={data.name} />

      <DuoInfo label='Tempo de jogo' value={`${data.yearsPlaying} anos`} />

      <DuoInfo label='Disponibilidade' value={`${data.weekDays.length} dias  \u2022  ${data.hourStart} - ${data.hourEnd}`} />
      
      <DuoInfo label='Chamada de áudio?' value={data.useVoiceChanel ? "Sim" : "Não"}
        colorValue={data.useVoiceChanel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT} />
      
      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController size={20} color={THEME.COLORS.TEXT}/>
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
      
    </View>
  );
}