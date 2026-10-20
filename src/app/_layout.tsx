import { CarrinhoProvider } from "@/context/CarrinhoContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <CarrinhoProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Menu" }} />
        <Stack.Screen name="telaProdutos" options={{ title: "Produtos" }} />
        <Stack.Screen name="telaPromocoes" options={{ title: "Promoções" }} />
        <Stack.Screen name="telaCarrinho" options={{ title: "Carrinho" }} />
        <Stack.Screen name="telaFinalizar" options={{ title: "Finalizar compra" }} />
      </Stack>
    </CarrinhoProvider>
  );
}
