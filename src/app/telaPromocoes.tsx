import Promocao from "@/components/Promocao"
import { useCarrinho } from "@/context/CarrinhoContext"
import { router } from "expo-router"
import { Alert, FlatList, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native"

type PromocaoType = {
    produto: string,
    tipo: string,
    precoPromocional: number,
    foto: ImageSourcePropType
}

export default function TelaPromocoes() {
    const carrinho = useCarrinho();

    const listaPromocoes: PromocaoType[] = [
        { produto: 'Leite Integral', tipo: 'Leve 6 pague 5', precoPromocional: 24.95, foto: require('../../assets/produtos/leite.png') },
        { produto: 'Queijo Minas Frescal', tipo: 'Acima de 2 kg pague menos', precoPromocional: 29.90, foto: require('../../assets/produtos/queijo.png') },
        { produto: 'Iogurte Natural', tipo: 'Pagando no cartão da loja', precoPromocional: 5.49, foto: require('../../assets/produtos/iogurte.png') },
        { produto: 'Manteiga com Sal', tipo: 'Leve 3 pague 2', precoPromocional: 25.80, foto: require('../../assets/produtos/manteiga.png') },
        { produto: 'Requeijão Cremoso', tipo: 'Acima de 4 unidades pague menos', precoPromocional: 7.90, foto: require('../../assets/produtos/requeijao.png') },
        { produto: 'Mussarela Fatiada', tipo: 'Pagando no cartão da loja', precoPromocional: 34.90, foto: require('../../assets/produtos/mussarela.png') },
        { produto: 'Doce de Leite', tipo: 'Leve 4 pague 3', precoPromocional: 26.70, foto: require('../../assets/produtos/doce.png') }
    ];

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => { router.back() }}>
                <Text style={styles.voltar}>Voltar para o menu</Text>
            </Pressable>

            <Text style={styles.titulo}>Promoções</Text>

            <Pressable onPress={() => { router.navigate('/telaCarrinho') }}>
                <Text style={styles.voltar}>Ver carrinho ({carrinho.totalItens()})</Text>
            </Pressable>

            <FlatList
                data={listaPromocoes}
                renderItem={(item) => {
                    return (
                        <Promocao
                            produto={item.item.produto}
                            tipo={item.item.tipo}
                            precoPromocional={item.item.precoPromocional}
                            foto={item.item.foto}
                            onAdicionar={() => {
                                const nome = item.item.produto + ' (' + item.item.tipo + ')';
                                carrinho.adicionar(nome, item.item.precoPromocional);
                                Alert.alert('Carrinho', nome + ' adicionado ao carrinho');
                            }} />
                    )
                }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    voltar: {
        fontSize: 18,
        color: '#1e6fd9',
        margin: 10
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        marginLeft: 10
    }
})
