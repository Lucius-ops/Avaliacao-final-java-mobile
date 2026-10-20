import { Image, Pressable, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

type PromocaoProps = {
    produto: string;
    tipo: string;
    precoPromocional: number;
    foto: ImageSourcePropType;
    onAdicionar: () => void;
}

export default function Promocao(props: PromocaoProps) {
    return (
        <View style={styles.container}>
            <Image source={props.foto} style={styles.foto} />
            <View style={styles.info}>
                <Text style={styles.nome}>{props.produto}</Text>
                <Text style={styles.tipo}>{props.tipo}</Text>
                <Text style={styles.preco}>R$ {props.precoPromocional.toFixed(2).replace('.', ',')}</Text>
                <Pressable style={styles.botao} onPress={props.onAdicionar}>
                    <Text style={styles.texto_botao}>Adicionar ao carrinho</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        borderStyle: 'solid'
    },
    foto: {
        width: 100,
        height: 100,
        borderRadius: 5
    },
    info: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center'
    },
    nome: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    tipo: {
        fontSize: 16
    },
    botao: {
        backgroundColor: '#1e6fd9',
        padding: 8,
        borderRadius: 6,
        marginTop: 6
    },
    texto_botao: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center'
    },
    preco: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'green'
    }
})
