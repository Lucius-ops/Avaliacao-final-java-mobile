import { createContext, ReactNode, useContext, useState } from "react";

export type ItemCarrinho = {
    nome: string,
    preco: number,
    quantidade: number
}

type CarrinhoContextType = {
    itens: ItemCarrinho[];
    adicionar: (nome: string, preco: number) => void;
    alterarQuantidade: (nome: string, delta: number) => void;
    remover: (nome: string) => void;
    limpar: () => void;
    subtotal: () => number;
    totalItens: () => number;
}

const CarrinhoContext = createContext({} as CarrinhoContextType);

export function CarrinhoProvider(props: { children: ReactNode }) {
    const [itens, setItens] = useState<ItemCarrinho[]>([]);

    function adicionar(nome: string, preco: number) {
        const existe = itens.find((i) => i.nome === nome);
        if (existe) {
            setItens(itens.map((i) => i.nome === nome ? { ...i, quantidade: i.quantidade + 1 } : i));
        } else {
            setItens([...itens, { nome, preco, quantidade: 1 }]);
        }
    }

    function alterarQuantidade(nome: string, delta: number) {
        setItens(
            itens
                .map((i) => i.nome === nome ? { ...i, quantidade: i.quantidade + delta } : i)
                .filter((i) => i.quantidade > 0)
        );
    }

    function remover(nome: string) {
        setItens(itens.filter((i) => i.nome !== nome));
    }

    function limpar() {
        setItens([]);
    }

    function subtotal() {
        return itens.reduce((soma, i) => soma + i.preco * i.quantidade, 0);
    }

    function totalItens() {
        return itens.reduce((soma, i) => soma + i.quantidade, 0);
    }

    return (
        <CarrinhoContext.Provider value={{ itens, adicionar, alterarQuantidade, remover, limpar, subtotal, totalItens }}>
            {props.children}
        </CarrinhoContext.Provider>
    );
}

export function useCarrinho() {
    return useContext(CarrinhoContext);
}
