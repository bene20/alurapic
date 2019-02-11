#ATENÇÃO:
#Como a versão do node usada neste curso era bem antiga, algumas ações foram necessárias para poder rodar a api:
#   1) Instalar o gerenciador de versões no node (https://www.npmjs.com/package/n) via comando "sudo npm install -g n"
#   2) Usar o 'n' para instalar e passar a usar a versão 8.12.0 do node na máquina local via comando "sudo n 8.12.0"
#      2.1) No meu caso, deu erro de certificado por conta do ambiente de TRT10. Utilizei o comando "sudo update-ca-certificates --fresh" antes do comando acima para resolver isso
#      2.2) É possível que o npm quebre após alterar a versão do node. Se isso acontecer, corrija o problema com o comando "curl -0 -L https://npmjs.com/install.sh | sudo sh"
#      2.3) Eu também tive um problema no TRT10 para executar o npm install na api por conta do certificado. Use isso antes do npm install se for o seu caso: "export NODE_TLS_REJECT_UNAUTHORIZED=0"

#!/bin/bash
. ~/scripts/biblioteca_funcoes.sh # Include da minha biblioteca de funções

workspace=$(dirname $0)

#Redefinindo as dimensões deste terminal
setTerminalWidth 175
setTerminalHeight 45

cd $workspace

clear

#Montando arquivo de configuração do screen
tempFile=$(geraArquivoTemporario "screencfgAngular") #Criando o arquivo de configuração do screen
>$tempFile

#NG SERVE
echo "screen -t NG_SERVE ng serve" >> $tempFile #Crio uma nova sessão na seção 'NG_SERVE e carrego o serviço do angular'
echo "zombie k" >> $tempFile #Indico que esta seção deve ser preservada quando finalizar
echo "split" >> $tempFile #Divido a seção atual horizontalmente
echo "split -v" >> $tempFile #Divido a seção atual verticalmente

#API BACKEND
echo "focus" >> $tempFile    #Movo o foco para a próxima seção (API)
echo "screen -t API bash -c \"cd api && npm start\"" >> $tempFile #Crio uma nova sessão na seção 'API e instancio a API do backend'
echo "zombie k" >> $tempFile #Indico que esta seção deve ser preservada quando finalizar

#TERMINAL
echo "focus" >> $tempFile    #Movo o foco para a próxima seção (TERMINAL)
echo "screen -t TERMINAL bash" >> $tempFile #Crio uma nova sessão na seção 'TERMINAL'

screen -S meuscreenAngular -c $tempFile
