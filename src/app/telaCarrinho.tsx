import { useCarrinho } from "@/context/CarrinhoContext"
import { router } from "expo-router"
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native"

export default function TelaCarrinho() {
    const carrinho = useCarrinho();

    function finalizar() {
        if (carrinho.itens.length === 0) {
            Alert.alert('Carrinho vazio', 'Adicione produtos antes de finalizar a compra');
            return;
        }
        router.navigate('/telaFinalizar');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Meu carrinho</Text>

            {
                carrinho.itens.length === 0
                &&
                <Text style={styles.vazio}>Seu carrinho está vazio.</Text>
            }

            <FlatList
                data={carrinho.itens}
                renderItem={(item) => {
                    return (
                        <View style={styles.item}>
                            <Text style={styles.nome}>{item.item.nome}</Text>
                            <Text style={styles.texto}>
                                R$ {item.item.preco.toFixed(2).replace('.', ',')} x {item.item.quantidade}
                                {' = R$ ' + (item.item.preco * item.item.quantidade).toFixed(2).replace('.', ',')}
                            </Text>
                            <View style={styles.linha}>
                                <Pressable style={styles.botao_qtd} onPress={() => { carrinho.alterarQuantidade(item.item.nome, -1) }}>
                                    <Text style={styles.texto_botao}>-</Text>
                                </Pressable>
                                <Text style={styles.qtd}>{item.item.quantidade}</Text>
                                <Pressable style={styles.botao_qtd} onPress={() => { carrinho.alterarQuantidade(item.item.nome, 1) }}>
                                    <Text style={styles.texto_botao}>+</Text>
                                </Pressable>
                                <Pressable onPress={() => { carrinho.remover(item.item.nome) }}>
                                    <Text style={styles.remover}>Remover</Text>
                                </Pressable>
                            </View>
                        </View>
                    )
                }} />

            <Text style={styles.total}>Subtotal: R$ {carrinho.subtotal().toFixed(2).replace('.', ',')}</Text>

            <Pressable style={styles.botao} onPress={() => { router.navigate('/telaProdutos') }}>
                <Text style={styles.texto_botao}>Continuar comprando</Text>
            </Pressable>
            <Pressable style={[styles.botao, styles.verde]} onPress={finalizar}>
                <Text style={styles.texto_botao}>Finalizar compra</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    titulo: { fontSize: 28, fontWeight: 'bold' },
    vazio: { fontSize: 18, marginTop: 20 },
    item: { marginVertical: 6, padding: 10, borderWidth: 1, borderColor: 'black', borderRadius: 5 },
    nome: { fontSize: 20, fontWeight: 'bold' },
    texto: { fontSize: 16 },
    linha: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    botao_qtd: { backgroundColor: '#1e6fd9', width: 36, height: 36, borderRadius: 6, justifyContent: 'center' },
    qtd: { fontSize: 20, marginHorizontal: 14 },
    remover: { color: 'red', fontSize: 16, marginLeft: 20 },
    total: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
    botao: { backgroundColor: '#1e6fd9', padding: 14, borderRadius: 8, marginBottom: 10 },
    verde: { backgroundColor: 'green' },
    texto_botao: { color: 'white', fontSize: 18, textAlign: 'center' }
})
