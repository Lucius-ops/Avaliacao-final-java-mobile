import Produto from "@/components/Produto"
import { useCarrinho } from "@/context/CarrinhoContext"
import { router } from "expo-router"
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native"

type ProdutoType = {
    nome: string,
    preco: number,
    unidade: string
}

export default function TelaProdutos() {
    const carrinho = useCarrinho();

    const listaProdutos: ProdutoType[] = [
        { nome: 'Leite Integral', preco: 4.99, unidade: 'Litro' },
        { nome: 'Queijo Minas Frescal', preco: 32.90, unidade: 'Kg' },
        { nome: 'Iogurte Natural', preco: 6.49, unidade: 'Pote 170g' },
        { nome: 'Manteiga com Sal', preco: 12.90, unidade: 'Pote 200g' },
        { nome: 'Requeijão Cremoso', preco: 9.90, unidade: 'Copo 200g' },
        { nome: 'Creme de Leite', preco: 3.79, unidade: 'Caixa 200g' },
        { nome: 'Ricota Fresca', preco: 24.50, unidade: 'Kg' },
        { nome: 'Doce de Leite', preco: 8.90, unidade: 'Pote 400g' },
        { nome: 'Coalhada Seca', preco: 7.20, unidade: 'Pote 250g' },
        { nome: 'Mussarela Fatiada', preco: 38.00, unidade: 'Kg' },
        { nome: 'Leite Desnatado', preco: 5.29, unidade: 'Litro' }
    ];

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => { router.back() }}>
                <Text style={styles.voltar}>Voltar para o menu</Text>
            </Pressable>

            <Text style={styles.titulo}>Produtos</Text>

            <Pressable onPress={() => { router.navigate('/telaCarrinho') }}>
                <Text style={styles.voltar}>Ver carrinho ({carrinho.totalItens()})</Text>
            </Pressable>

            <FlatList
                data={listaProdutos}
                renderItem={(item) => {
                    return (
                        <Produto
                            nome={item.item.nome}
                            preco={item.item.preco}
                            unidade={item.item.unidade}
                            onAdicionar={() => {
                                carrinho.adicionar(item.item.nome, item.item.preco);
                                Alert.alert('Carrinho', item.item.nome + ' adicionado ao carrinho');
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
