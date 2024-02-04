<h1 align="center"> Tércio Delivery </h1>


<p align="center">Trabalho solicitado pelo professor Tércio de Morais, da disciplina de Sistemas Distribuídos..</p>
<p align="center">Implementar um sistema CRUD (implemente duas ações) usando web services - REST</p>

<p align="center"> 
  <a href="https://angular.io/">
        <img src="https://img.shields.io/badge/Made%20with-Angular-1f425f.svg" alt="site Angular">,
  </a>
  <a href="https://www.php.net/">
        <img src="https://img.shields.io/badge/Made%20with-Php-1f425f.svg" alt="site Php">,
  </a>
</p>


<h4 align="center"> 
	🚧  Trabalho finalizado  🚧
</h4>


### Especificações da atividade
- Trabalho em dupla (no máximo)
- Pontuação: 2,0
- Implementar tanto cliente (chamada do serviço) quanto servidor
- extra: como um cliente non-browser chamaria um web service?
 #
### Features

- [x] Depositar valor
- [x] Retirar valor
- [x] Criar lanche
- [x] Remover lanche
- [x] Listar lanches
- [x] Fazer pedido
- [x] Ver pedido
- [x] Listar pedidos
- [x] Limpar pedidos
- [x] Debugar requisições
 #
### Demonstrações
<h1 align="center">
  <img alt="demonstração" title="#NextLevelWeek" src="/demo-img/example1.png" />
</h1>
<hr>
<h1 align="center">
  <img alt="demonstração" title="#NextLevelWeek" src="/demo-img/example2.png" />
</h1>

#### Acesse:
- [Inicial](https://terciodelivery.robertogram.com.br/) 
- [Admin](https://terciodelivery.robertogram.com.br/admin) 
 #
### Pré-requisitos

#### Instalação e Configuração da Pilha LAMP do Back-end com XAMPP

Este guia fornece instruções detalhadas para a instalação e configuração da pilha LAMP (Linux, Apache, MySQL, PHP) usando o XAMPP. O XAMPP é uma solução fácil e rápida para configurar um ambiente de desenvolvimento local que inclui **Apache**, **MariaDB**, **PHP** e **phpMyAdmin**.


- **Sistema Operacional:** Linux (o XAMPP também está disponível para Windows e macOS, mas este guia foca na instalação no Linux).
- **Permissões:** Você deve ter permissões de superusuário para instalar e configurar software no sistema.

#### Instalação do XAMPP

1. **Download do XAMPP:**
   - Acesse [o site oficial do XAMPP](https://www.apachefriends.org/download.html) e faça o download da versão mais recente para Linux.

2. **Torne o arquivo executável com o comando abaixo:**
   - Navegue até o diretório onde o arquivo foi baixado e execute o seguinte comando no terminal:
     ```bash
     chmod +x xampp-installer.run
     ```
3. **Execute o arquivo .run:**
   - Inicie a instalação do XAMPP, com o seguinte comando, toque o nome do arquivo se necessario:
      ```bash
     sudo ./xampp-installer.run
     ```

4. **Iniciar o XAMPP:**
   - Execute o seguinte comando para iniciar o XAMPP:
     ```bash
     sudo /opt/lampp/lampp start
     ```

5. **Verificar a Instalação:**
   - Abra um navegador e acesse `http://localhost` para garantir que o **Apache** e **PHP** tenha sido instalado corretamente.
   - Abra um navegador e acesse `http://localhost/phpmyadmin` para garantir que o **MariaDB** e **phpMyAdmin** tenha sido instalado corretamente.

6. **Importar o banco de dados**
   - Abra um navegador e acesse `http://localhost/phpmyadmin`
   - Crie um banco de dados com o nome `tercio_delivery`
   - Navegue até a guia `importar`
   - Faça o upload do arquivo  `server/database/tercio_delivery.sql`

7. **configurando o back-end**
   - Mova os arquivos da pasta `/server` para `opt/lampp/htdocs/api/`
   - Se necessário, configure o banco de dados na biblioteca do Medoo na linha 28 do arquivo index.php

8. **Reiniciar o Apache:**
   - Após fazer as alterações, reinicie o Apache para aplicar as configurações:
     ```bash
     sudo /opt/lampp/lampp restart
     ```

#

#### Instalação e Configuração do Front-end com tecnologias usadas.

Este guia fornece instruções detalhadas para a instalação e configuração do Front-end usando (Angular, Node.js, Bootstrap). O Node.js é uma solução fácil e rápida para instalar todas as dependências necessárias para rodar o ambiente de desenvolvimento.

#### Instalação do Node.js

1. **Download do Node.js:**
   - Acesse [o site oficial do Node.js](https://nodejs.org/en) e faça o download da versão 18 LTS ou superior.

2. **Instale o Node.js:**
   - Após a instalação, verifique com o seguinte comando no terminal:
   ```bash
     node -v
     ```

#### Instalação do Angular

1. **Instalação:**
   - Acesse [o site oficial do Angular na tela de instalação](https://angular.io/guide/setup-local), ou execute o seguinte comando no terminal.
    ```bash
     npm install -g @angular/cli@16.0.0
     ```
   - Perceba que usamos a tag '-g', isso indica que estamos instalando o Angular globalmente, em toda a máquina.
   - Perceba que instalamos a versão 16.0.0, pois o projeto foi desenvolvido nesta versão.


3. **Instalando dependências.**
   - Após clonar este repositório, entre na pasta com o seguinte comando:
   ```bash
     cd cliente/
   ```
   - Agora, execute o seguinte comando:
   ```bash
     npm install
   ```
   - Com isso, todas as dependências serão baixadas.


5. **Execução, modo desenvolvimento:**
   - Para executar em modo de desenvolvimento, execute o seguinte comando:
   ```bash
     ng server
   ```


6. **Build, modo produção:**
   - Para fazer o Build em modo produção, execute o seguinte comando:
   ```bash
     ng build --aot --configuration=production
   ```

#

### 🛠 Tecnologia

A seguinte ferramenta foi usada na construção do projeto:

- [Angular 16.0.0](https://angular.io/)
- [PHP 8.2.15](https://www.php.net/)
- [Banco de dados - MariaDB](https://mariadb.org/)
### 
- [Composer](https://getcomposer.org/)
- [Medoo](https://medoo.in/)

 #
### Autores
#### Luckas Ferreira
<a href="https://instagram.com/luckas_.ferreira" target="_blank"><img src="https://img.shields.io/badge/-Instagram-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white" target="_blank"></a><a href = "mailto:lucas.ferreira2@arapiraca.ufal.br"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a><a href="https://www.linkedin.com/in/luckas-ferreira-49a7a219b/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>  
  

#### Roberto
<a href="https://instagram.com/jrobertogram" target="_blank"><img src="https://img.shields.io/badge/-Instagram-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white" target="_blank"></a><a href = "mailto:jose.silva9@arapiraca.ufal.br"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a><a href="https://www.linkedin.com/in/robertogram/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
