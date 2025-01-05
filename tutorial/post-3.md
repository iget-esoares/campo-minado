# Campo Minado HTML/JS - Criando o tabuleiro - Parte 3

No [post anterior](https://www.tabnews.com.br/eliaseas/campo-minado-html-js-parte-2) nós criamos o HTML/CSS para replicar visualmente
o jogo, porém ainda não há qualquer funcionalidade que não seja visual no nosso jogo:

<img src="https://i.ibb.co/ZXBzRqz/Captura-de-tela-de-2025-01-05-10-34-27.png" alt="Captura-de-tela-de-2025-01-05-10-34-27" border="0">

Neste post, nós iremos criar a retaguarda do jogo, focando em 3 pontos:

* Estrutura de dados para armazenar o estado do jogo
* Popular o tabuleiro com minas
* Popular o tabuleiro com dicas

## Estrutura de dados

Nosso jogo possui algumas informações que precisam compor o seu estado:

* Configurações: linhas, colunas e quantidade de minas
* Estado do jogo: se o jogo está *parado*, se *iniciou*, se *perdeu* ou se *venceu*
* O cronometro da partida
* A quantidade de bandeiras colocadas
* O tabuleiro em sí.

Portanto, criaremos a seguinte constante `state`:

```
const state = {
    settings: {
        rows: 5,
        columns: 5,
        mines: 5
    },
    status: 'stopped',
    timer: 0,
    flagsCount: 0,
    board: []
};
```

Utilizaremos um tabuleiro pequeno (5x5) neste post para facilitar a visualização de cada etapa. 

Note que o tabuleiro (`board`) está vazio. Nosso próximo passo é criar as células do tabuleiro, ainda vazias.

## Criando as celulas do tabuleiro

Criaremos as células percorrendo todas as linhas e colunas do nosso tabuleiro,
dentro dos limites definidos por `state.settings.rows` e `state.settings.columns`,
e inserindo dentro delas um objeto contendo o seu valor e o seu estado.

O estado de uma célula pode ser:

* `HIDDEN`: quando estiver intacta
* `REVEALED`: quando estiver revelada
* `FLAG`: quando estiver marcada com bandeira
* `QUESTION`: quando estiver marcada com uma interrogação
* `EXPLODED`: quando estiver revelada contendo uma bomba, ou seja, explodiu!

Criaremos portanto uma constante para criar uma espécie de enum para os possíveis status da nossa célula.

```
const CELL_STATUS = {
    HIDDEN: 0,
    REVEALED: 1,
    FLAG: 2,
    QUESTION: 3,
    EXPLODED: 4
};

const createBoard = () => {
    const board = [];
    for (let y = 0; y < state.settings.rows; y++) {
        const row = [];
        for (let x = 0; x < state.settings.columns; x++) {
            row.push({
                value: 0,
                state: CELL_STATUS.HIDDEN
            })
        }
        board.push(row);
    }
    state.board = board;
}
```

Se nosso tabuleiro fosse exibido após chamar `createBoard()`, ele estaria assim:

```
00000
00000
00000
00000
00000
```

## Criando as minas

Como visto acima, nosso tabuleiro ainda não contém bombas. Nesta etapa, iremos sortear ´n´ posições `(x,y)` para inserir
bombas. Observe que devemos garantir que:

* A posição sorteada ainda não contém uma bomba
* Não haverá uma mina no local onde o jogador fez sua primeira jogada

Para isso, nossa função `placeMines` receberá como parametro a posição `(x,y)` do primeiro clique do jogador.
Isso significa que nosso tabuleiro só poderá ser preenchido após a primeira iteração do usuário.

Nossa função ficará assim:

```
const placeMines = (initialX, initialY) => {
    for (let placedMinesCount = 0; placedMinesCount <= state.settings.mines;) {
        const x = Math.floor(Math.random() * (state.settings.columns));
        const y = Math.floor(Math.random() * (state.settings.rows));

        if (
            (initialX !== x && initialY !== y) &&
            (state.board[x][y].value !== '*')
        ) {
            state.board[y][x].value = '*';
            placedMinesCount++;
        }
    }
}
```

Se nosso tabuleiro fosse exibido após chamar `placeMines(0,0)`, ele estaria parecido com:

```
00000
00000
*0000
***00
*0000
```

## Inserindo os números (dicas)

Agora, precisamos percorrer novamente todo o tabuleiro, pois os campos que não possuem minas, devem possuir como
valor um número indicando quantas minas existem nos campos adjacentes.

Nós vamos quebrar esta etapa em duas funções. A primeira função vai nos retornar um array de posições `(x,y)` dos
campos adjacentes:

```
const getSurroundingCells = (x, y) => {
    const surroundingCells = [];
    for (let offsetY = -1; offsetY <= 1; offsetY++) {
        for (let offsetX = -1; offsetX <= 1; offsetX++) {
            surroundingCellX = x + offsetX;
            surroundingCellY = y + offsetY;

            if (
                (surroundingCellX === x && surroundingCellY === y) ||
                (surroundingCellX < 0 || surroundingCellX >= state.settings.rows) ||
                (surroundingCellY < 0 || surroundingCellY >= state.settings.columns)
            ) {
                continue;
            }

            surroundingCells.push({
                x: surroundingCellX,
                y: surroundingCellY
            })
        }
    }

    return surroundingCells;
}
```

Com isso, nossa tarefa de calcular o valor das dicas se torna mais fácil. Além disso, essa operação de buscar celulas adjacentes
será utilizada futuramente, e já temos a função pronta.

Nossa função `placeHints` ficará assim:

```
const placeHints = () => {
    for (let x = 0; x < state.settings.rows; x++) {
        for (let y = 0; y < state.settings.columns; y++) {
            if (state.board[x][y].value === '*') {
                continue;
            }

            let surroundingMines = 0;

            getSurroundingCells(x, y).forEach(({x: surroundingX, y: surroundingY}) => {
                if (state.board[surroundingX][surroundingY].value === '*') {
                    surroundingMines++;
                }
            })

            state.board[x][y].value = surroundingMines;
        }
    }
}
```

Agora, após chamar `placeHints()` nosso tabuleiro está assim:

```
00000
11000
*4210
***10
*4210
```

## Código completo

O código completo deste post pode ser visto [aqui](https://github.com/iget-esoares/campo-minado/blob/fe337e3babb5cc67d42bd7c07b642a10e45e1a3b/minesweeper.js) no GitHub deste projeto.
Note que no código completo há uma função utilitária `printBoard()` que imprime
os valores do tabuleiro da forma que visualizamos nesse post.

Note também que o javascript deste post ainda não está ligado ao HTML que criamos no post anterior.
Para executa-lo, precisamos do NodeJS (estou utilizando o Node JS v20, porém o código é compatível com a maioria das versões):

    node minesweeper.js

# Próximos passos

Neste ponto, nós temos uma parte importante do jogo que é sua estrutura de dados,
podendo partir então para as ações do jogo, funções que irão
alterar o tabuleiro e o status do jogo.

Cena para o próximo capítulo.