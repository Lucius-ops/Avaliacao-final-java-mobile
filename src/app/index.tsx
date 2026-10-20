import { useCarrinho } from "@/context/CarrinhoContext";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const carrinho = useCarrinho();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Laticínios Vale Verde</Text>
      <Text style={styles.subtitulo}>Distribuidora de laticínios</Text>

      <Pressable
        style={styles.botao}
        onPress={() => { router.navigate('/telaProdutos') }}>
        <Text style={styles.texto_botao}>Produtos</Text>
      </Pressable>

      <Pressable
        style={styles.botao}
        onPress={() => { router.navigate('/telaPromocoes') }}>
        <Text style={styles.texto_botao}>Promoções</Text>
      </Pressable>

      <Pressable
        style={styles.botao}
        onPress={() => { router.navigate('/telaCarrinho') }}>
        <Text style={styles.texto_botao}>Carrinho ({carrinho.totalItens()})</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitulo: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40
  },
  botao: {
    backgroundColor: '#1e6fd9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16
  },
  texto_botao: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  }
});
