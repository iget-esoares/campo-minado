<img src="https://i.ibb.co/rpYwZBB/expert.png" alt="expert" border="0">

Apenas por diversão resolvi recriar o jogo Campo Minado em HTML/JS, e decidi compartilhar aqui no TabNews o progresso detalhando ao maximo as etapas.

Neste primeiro post, irei escrever os requisitos de interface e comportamento, para que posteriormente possamos iniciar a programação em si.

Agradeço contribuições caso eu tenha listado requisitos erroneamente ou esquecido algum requisito importante.

Penso em após a conclusão, acrescentar mais funcionalidades colocando o jogo em um site e criando um ranking por exemplo.

O que acham? Topam acompanhar e participar deste projeto?

# Definição de requisitos

## Interface

* A interface deve ser identica ao jogo original, contendo os seguintes elementos:
  a. Cabeçalho com dois mostradores digitais de três digitos (a esquerda e a direita) e um botão com um emoji no centro
  b. Um tabuleiro de tamanho configurável (9x9 com 10 minas, 16x16 com 40 minas ou 30x16 com 99 minas)
  c. Cada célula do tabuleiro pode pode ocultar uma mina, um número ou pode estar vazia

## Comportamento

* Ao pressionar (mouse down) uma celula, ela irá "abaixar" indicando a celula que está em foco durante aquela ação
* Ao soltar o botão esquerdo do mouse (click) a celula será revelada.
* Se a celula revelada contiver uma mina, ela explode e o jogo acaba
* Se a celula revelada não contiver uma mina, será exibido um número indicando a quantidade de bombas ao redor daquela celula (de 1 a 8)
* Se a celula revelada não tiver minas ao redor, o jogo irá automaticamente revelar as celulas vizinhas recursivamente
* Ao pressionar uma celula com o botão direito, o status da celula será alternado entre "bandeira", "?" ou "não marcado"
* Ao pressionar uma celula com os dois botões do mouse, todas as celulas adjacentes serão "abaixadas" para ajudar o jogador a visualizar as celulas adjacentes de uma celula
* Celulas marcadas como bandeira não podem ser reveladas ao clicar com o botão esquerdo
* O mostrador digital da esquerda indica quantas bombas ainda não foram marcadas com a bandeira.
* O mostrador da direita mostra o tempo corrido desde que a primeira celula do tabuleiro foi revelada
* O emoji do botão central pode ser:
  a. Uma carinha feliz por padrão
  b. Uma carinha de surpresa enquanto a celula é pressionada (mouse down)
  c. Uma carinha morta se uma mina for explodida
  d. Uma carinha de oculos escuro se o jogador ganhar a partida
* Clicar no botão central reinicia o jogo