import { useCarrinho } from "@/context/CarrinhoContext"
import { router } from "expo-router"
import { useState } from "react"
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native"

type CupomType = {
    codigo: string,
    tipo: 'percentual' | 'valor',
    valor: number
}

export default function TelaFinalizar() {
    const carrinho = useCarrinho();

    const cupons: CupomType[] = [
        { codigo: 'LEITE10', tipo: 'percentual', valor: 10 },
        { codigo: 'QUEIJO20', tipo: 'percentual', valor: 20 },
        { codigo: 'VALE5', tipo: 'valor', valor: 5 }
    ];

    const [campoCupom, setCampoCupom] = useState('');
    const [cupomAplicado, setCupomAplicado] = useState<CupomType | null>(null);

    const subtotal = carrinho.subtotal();

    let desconto = 0;
    if (cupomAplicado) {
        desconto = cupomAplicado.tipo === 'percentual'
            ? subtotal * cupomAplicado.valor / 100
            : Math.min(cupomAplicado.valor, subtotal);
    }
    const total = subtotal - desconto;

    function formatar(valor: number) {
        return 'R$ ' + valor.toFixed(2).replace('.', ',');
    }

    function aplicarCupom() {
        const codigo = campoCupom.trim().toUpperCase();
        const cupom = cupons.find((c) => c.codigo === codigo);
        if (!cupom) {
            setCupomAplicado(null);
            Alert.alert('Cupom inválido', 'O código "' + campoCupom + '" não existe');
            return;
        }
        setCupomAplicado(cupom);
        Alert.alert('Cupom aplicado', 'Desconto ' + cupom.codigo + ' aplicado com sucesso');
    }

    function confirmarCompra() {
        Alert.alert('Compra finalizada', 'Total pago: ' + formatar(total) + '\nObrigado por comprar na Laticínios Vale Verde!');
        carrinho.limpar();
        router.dismissAll();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Resumo da compra</Text>

            {
                carrinho.itens.map((i) => (
                    <Text key={i.nome} style={styles.texto}>
                        {i.quantidade}x {i.nome} - {formatar(i.preco * i.quantidade)}
                    </Text>
                ))
            }

            <Text style={styles.subtitulo}>Cupom de desconto</Text>
            <View style={styles.linha}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o cupom"
                    autoCapitalize="characters"
                    value={campoCupom}
                    onChangeText={(text) => { setCampoCupom(text) }} />
                <Pressable style={styles.botao_aplicar} onPress={aplicarCupom}>
                    <Text style={styles.texto_botao}>Aplicar</Text>
                </Pressable>
            </View>

            <Text style={styles.texto}>Subtotal: {formatar(subtotal)}</Text>
            {
                cupomAplicado
                &&
                <Text style={[styles.texto, styles.verde]}>Desconto ({cupomAplicado.codigo}): - {formatar(desconto)}</Text>
            }
            <Text style={styles.total}>Total: {formatar(total)}</Text>

            <Pressable style={[styles.botao, styles.fundo_verde]} onPress={confirmarCompra}>
                <Text style={styles.texto_botao}>Confirmar compra</Text>
            </Pressable>
            <Pressable style={styles.botao} onPress={() => { router.back() }}>
                <Text style={styles.texto_botao}>Voltar ao carrinho</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    titulo: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
    subtitulo: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 6 },
    texto: { fontSize: 18, marginBottom: 4 },
    verde: { color: 'green' },
    linha: { flexDirection: 'row', marginBottom: 14 },
    input: { flex: 1, borderWidth: 1, borderColor: 'black', borderRadius: 6, padding: 8, fontSize: 18 },
    botao_aplicar: { backgroundColor: '#1e6fd9', paddingHorizontal: 16, borderRadius: 6, marginLeft: 8, justifyContent: 'center' },
    total: { fontSize: 26, fontWeight: 'bold', marginVertical: 14 },
    botao: { backgroundColor: '#1e6fd9', padding: 14, borderRadius: 8, marginBottom: 10 },
    fundo_verde: { backgroundColor: 'green' },
    texto_botao: { color: 'white', fontSize: 18, textAlign: 'center' }
})
