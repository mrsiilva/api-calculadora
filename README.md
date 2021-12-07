
# API Calculadora

## Descrição da Aplicação
<p>Essa é uma aplicação Node.js que faz a soma e subtração de numeros<br>
 romanos. E com implementação do JWT para autenticação de usuários.<br>
 Tornando possível apenas usuarios autenticados terem acesso a essas rotas de calculos.</p>
 
### Pré-Requisitos:
 Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
```
 - [Node.js](https://nodejs.org/en/)
 - E para rodar a api, simule com o [Postman](https://www.postman.com/).
 ```
<hr>

### Começando 🚀
<ul>
<li>Para cadastrar novo usuário, acesse http://localhost:5000/criausuario .<br>
Em formato json adicione um nome, email e senha. Exemplo:

```
{
    "nome": "Lara Santos",
    "email": "lara123@gmail.com",
    "senha": "canetaazul"
}
```
</li>
<br>
<li>Para autenticar usuario e ter acesso as rotas de calculos, acesse: http://localhost:5000/auth</li>
Em formato json digite o email e senha cadastrados.

```
{
    "email": "lara123@gmail.com",
    "senha": "canetaazul"
}
``` 
Será gerado um token, copie ele, acesse a rota de calculo que você quer, <br>
Clique em Authorization, em type escolha Bearer Token como na imagem abaixo e cole o token
<br>
![Screenshot_1](https://user-images.githubusercontent.com/91692834/145082423-f7e2cea4-53da-4b7f-bae4-9969f4166581.png)


<br>
<li>Para fazer calculos de soma utilize a url: http://localhost:5000/calculadora/soma</li>
<li>Para os de subtração utilize: http://localhost:5000/calculadora/subtracao</li>
<li>Passe como parametro em json, o valor1 e o valor2. Exemplo:
</ul>

```
{
    "value1": 30,
    "value2": 10
}

Obs Importante:
Apenas esses números estão disponiveis como resultado:
M:1000
CM:900
D:500
CD:400
C:100
XC:90
L:50
XL:40
X:10
IX:9
V:5
IV:4
I:1
```

<hr>

### Rodando o Back End (servidor) 🎲:
```
# Clone este repositório
$ git clone <https://github.com/tgmarinho/nlw>

# Acesse a pasta do projeto no terminal
$ cd API-De-Calculadora

# Instale as dependências
$ npm install express
$ npm install jsonwebtoken

# Execute a aplicação
$ node index.js

# O servidor iniciará na porta:5000
```
<hr>
<br>




### Autora: Rúbia Silva
