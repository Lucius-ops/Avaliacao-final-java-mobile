import { Pressable, StyleSheet, Text, View } from "react-native";

type ProdutoProps = {
    nome: string;
    preco: number;
    unidade: string;
    onAdicionar: () => void;
}

export default function Produto(props: ProdutoProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.nome}>{props.nome}</Text>
            <Text style={styles.texto}>Preço: R$ {props.preco.toFixed(2).replace('.', ',')}</Text>
            <Text style={styles.texto}>Unidade: {props.unidade}</Text>

            <Pressable style={styles.botao} onPress={props.onAdicionar}>
                <Text style={styles.texto_botao}>Adicionar ao carrinho</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        borderStyle: 'solid'
    },
    nome: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    texto: {
        fontSize: 18
    },
    botao: {
        backgroundColor: '#1e6fd9',
        padding: 10,
        borderRadius: 6,
        marginTop: 8
    },
    texto_botao: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    }
})
