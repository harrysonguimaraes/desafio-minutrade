# desafio-minutrade-livraria

Projeto criado para o desafio Minutrade, que consiste num site para uma livraria.

[Acesse o site da Livraria (hospedado no wedeploy)](https://desafio-minutrade.wedeploy.io)

### Tecnologias utilizadas
* Grunt - automação das tarefas
* Less - pré-processador de CSS
* JADE/Pug - template engine de HTML

### Configurando o ambiente de desenvolvimento

Será necessário ter o [node.js](https://nodejs.org/en/download/) instalado em sua máquina para as tarefas de compilar [Pug](https://pugjs.org/api/getting-started.html), [less](http://lesscss.org/), etc. Todas as tarefas são feitas pelo [Grunt](https://gruntjs.com/). Caso ainda não tenha o node.js instalado em sua máquina, [siga esse tutorial](https://nodejs.org/en/download/package-manager/). 

Após ter o node.js instalado e configurado em sua máquina, clone esse projeto com o comando:
```bash
git clone https://github.com/harrysonguimaraes/desafio-minutrade.git
```
Feito isso, pelo terminal, navegue até a pasta frontend/. Nessa pasta execute os comandos `npm install` e `grunt`.

O comando `npm install` irá ler todas as dependências do arquivo package.json e fará o donwload dessas dependências na pasta frontend/node_modules/. Esses são os módulos usados pelo Grunt para a automação das tarefas citadas acima.

O comando `grunt` irá ler o arquivo de configurações presentes no arquivo Gruntfile.js. Nesse arquivo de configurações temos as instruções de automações das tarefas. Aqui configuramos as tarefas para compilar o LESS para css, o Pug para html, fará uma inspeção no código JS escrito, lendo a configuração no arquivo .jshintrc, e jogará todos os arquivos compilados na pasta dist/ . O grunt fica executando em background aguardando mudanças nos arquivos para fazer a compilação de forma automática. Assim, não é necessário recompilar nenhum arquivo após uma alteração.

O grunt foi configurado com tasks diferentes para ambiente de desenvolvimento e ambiente de produção. Assim, em produção, o HTML, JS e CSS por exemplo são minificados para trafegar menos dados nas requests.

Feito esse processo, em outro terminal, navegue até a pasta dist e starte um servidor http na raiz do projeto. Indicamos o uso do [http-server](https://www.npmjs.com/package/http-server):
```bash
http-server . -a localhost -p 8081 -c-1
```

Feito isso, o site estará pronto para visualização na url: `localhost:8081`.

### Deploy no serviço wedeploy

Após receber o acesso/permissão no serviço wedeploy, basta executar o comando:
```
grunt deploy
```
e o grunt executará todo o build do projeto, minificando os assets e implantando a nova versão no [Wedeploy](https://wedeploy.com/).

### Info técnica

A arquitetura de CSS foi criada pensando em componentes. Assim, existem componentes prontos para botões, cards, alertas, validação de formulários.

Apesar de não termos usado, a arquitetura do site está pronta para ser acoplada a um backend, inclusive com um componente pronto para tratar requisições, com adição de loading automático entre as requests e responses e tratamento autómático para exibição de mensagem de erro em caso de falha numa requisição.

### Info sobre o site da livraria

Ao acessar uma página não existente, o usuário é direcionado para uma página com uma mensagem para visitar os mais vendidos e os lançamentos, procurando aumentar o engajamento e retenção do usuário no site.


### TODO
- [ ] Melhorar gerenciamento de libs e diminuir dependência de tantos frameworks e libs.
- [ ] Criar o backend da aplicação. Atualmente, os livros adicionados ao carrinho estão sendo "persistidos" apenas no localStorage do próprio browser.
- [ ] Incluir otimizações de SEO (Search engine optimization), JSON-LD.
- [ ] Acrescentar otimizações de performance, removendo bootstrap que foi adicionado para rápida prototipação.
- [ ] Otimizar para navegação mobile
