# Projeto Polischain

## Escopo para o Hackathon

Em muitas situações obras saem mais caras por diversos motivos: falhas de planejamento, falhas de execução, falhas de comunicação e fraude. Se fosse possível que o responsável por prestar conta dos recursos empregados no empreendimento pudesse rastrear cada centavo gasto, certamente seria possível melhorar os processos na área da construção civil enxugando custos. Além disso, uma aplicação descentralizada para investimento, execução e manutenção de residências deve eliminar intermediários. Com isso, há uma expectativa de maiores retornos para quem investe, facilita-se o acesso a crédito a quem mais precisa, aumenta-se a concorrência entre as construtoras e cria-se uma rede de reputação entre os usuários da DAPP.
O foco para o EOSRio Hackathon é entregar uma aplicação que dê a possbilidade de rastrear os gastos em empreendimentos da construção civil através de uma stable coin (1 para 1 com o Real Brasileiro) que servirá como meio de pagamento.

## Do que se trata o projeto, como um todo?

O projeto tem o intuito de se tornar uma DAO para crowndfunding na construção civil de casas populares com foco em filantropia e autrismo. Isso tudo com a possibilidade de criar um ecossistema sustentável atrelado ao mercado da construção civil de casas populares no mundo.

## Problema central:

Milhares de famílias sem habitação e sem condições de pagar aluguel/comprar casas, no planeta.

## Problemas específicos com campanhas crowdfunding (doações)

- Transparência e rastreabilidade: a doação ficará registrada de maneira indelével e inalterável. Até certo ponto, deve ser possível acompanhar como estão sendo aplicados os gastos. Desafio: validar os gastos nos endpoints (fraude).
- Censura e boicote: em países de guerra ou lobistas podem tentar se apropriar ou derrubar a arrecadação. Assim, a descentralização auxiliaria na resistência. Desafio: conversão do token em uma moeda fiat para custear os projetos (pode rolar tributação & censura).
- Confiança e reputação: podem haver scams, golpes ou simplesmente incompetência por parte de quem constrói. Com a persistência da blockchain, pode-se dar mais crédito à reputação por não ser um banco de dados facilmente corruptível. Desafio: avaliar (curadoria, eleições?) construtores, executores & beneficiário das doações para evitar scams.
- Baixo engajamento: pessoas desconhecem a causa, não têm condições de contribuir, ou simplesmente não têm interesse. Incentivo através de tokens, clube de fidelidades, ou alguma outra forma, utilizando a blockchain (ledger). Desafio: criar um sistema de incentivo para que as pessoas votem & viralizem as campanhas.

## Nossa solução

Crowdfunding utilizando uma stable coin sob a rede EOSIO como incentivo econômico. Utilizar a blockchain EOSIO para criar uma rede de reputação e votos. Se apoiar em uma base de dados descentralizada & distribuída para acompanhar o fluxo financeiro da rede. Aproveitar o caráter de governança descentralizada dos smart contracts EOSIO para garantir resistência a censura, boicotes e fraudes.

## Contas (atores da DAO): Doadores, construtores, beneficiado.

Doadores escolhem um projeto (construtores + beneficiado) e compram a stable coin para aquele único projeto (seria algo como uma stable coin, porém infungível com outros projetos).

- Construtures: 
		Recebem a doação em reais caso cumpram com o projeto;
		Em caso de entrega com sucesso, ganham reputação para projetos futuros;
- Beneficiário:
    Pagam “prestações” simbólicas que serão utilizadas para ir queimando os tokens de quem doou (ideia inicial);
    Ou... Poderiam pagar uma espécie de “aluguel” vitalício que seria repassado a quem doou aquele imóvel;
    Ganham reputação por pagar a mensalidade em dia;
- Doadores:
    Recebem seu cash de volta, em prestações diluídas (ou eternamente, em caso de aluguel).
    Ganham reputação por contribuir: poder de voto para escolher beneficiários/construtoras (curadoria)

## Considerações para o desenvolvimento da DAPP

A) As construções deveriam pertencer à DAO, e não ao “beneficiário”.

B) Pode-se pensar em outras formas de incentivo para os doadores, como um clube de fidelidade que dê desconto junto aos construtoras, afinal, as construtoras estariam “ganhando uma nova fatia de mercado”.

C) Talvez as “prestações” possam ser, na verdade, um aluguel vitalício, no qual o morador e beneficiário irá pagar para sempre. 

D) Cobrar um aluguel “simbólico” do beneficiário seria um desincentivo para ele continuar vivendo na casa com o único intuito de fazê-lo “crescer” e ir para um local melhor. 

E) Caso o beneficiário não tenha condição alguma de arcar com a moradia, deveria ser possível deixa-lo morando no local por, pelo menos, 1 ano (por ex.), para só então começar a cobrar o aluguel. Se após 1 ano o beneficiário não conseguir pagar, deve ceder a oportunidade de morar na casa para outro.

F) Caso o beneficiário perca sua reputação a ponto de não pagar aluguel por X meses, ele deverá passar o benefício para outro.

G) O aluguel também é um incentivo para os doadores. Na verdade, quem contribuiu com a construção da nova casa seria “proprietário”, e teria direito a receber uma porcentagem do aluguel simbólico.

H) Para que um doador receba porcentagem sobre os alugueis da casa, deveria haver um mínimo para doação, em porcentagem sobre o custo do imóvel atribuído pela construtora. 

