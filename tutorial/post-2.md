# Campo Minado HTML/JS - Parte 2

Dando continuidade à [parte 1](https://www.tabnews.com.br/eliaseas/campo-minado-html-js-parte-1), iremos neste post criar a interface do nosso jogo,
buscando tornar o mais fiel à original o possível.

## HTML

A estrutura HTML do jogo é relativamente simples:

```
<div class="game window">
        <header>
            <span class="display"><span class="off">888</span>123</span>
            <button class="reset-game">
                :-)
            </button>
            <span class="display"><span class="off">888</span>123</span>
        </header>
        <main>
            <div class="row">
                <div></div>
                <div class="one"></div>
                <div class="two"></div>
                <div class="three"></div>
                <div class="four"></div>
                <div class="five"></div>
                <div class="six"></div>
                <div class="seven"></div>
                <div class="eight"></div>
            </div>
            <div class="row">
                <div class="mine"></div>
                <div class="mine-pressed"></div>
                <div class="question"></div>
                <div class="flag"></div>
                <div class="empty"></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </main>
    </div>
```

## CSS

O CSS é basico porém um pouco extenso, por este motivo vou apenas colocar o link para o arquivo no repositório.

Eu consegui extrair do executável original os sprites que renderizavam o botão da carinha e as posições do tabuleiro,
então nestes itens, é utilizado um background com background position diferente para cada variação.

https://github.com/iget-esoares/campo-minado/blob/main/minesweeper.css

# Próximos passos

Criada a interface, o próximo passo é criar a parte do JavaScript que dará a funcionalidade ao jogo.

No proximo post, iremos criar a estrutura do javascript para representar e renderizar o tabuleiro, além
de criar a função que irá "Gerar" um novo jogo e alimentar o tabuleiro.