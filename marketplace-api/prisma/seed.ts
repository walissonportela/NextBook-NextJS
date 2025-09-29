// seed.ts

import { PrismaClient, Role } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

const bookData = [
  {
    "name": "A Biblioteca da Meia-Noite",
    "description": "Aos 35 anos, Nora Seed é uma mulher cheia de talentos e poucas conquistas. Arrependida das escolhas que fez no passado, ela vive se perguntando o que poderia ter acontecido caso tivesse vivido de maneira diferente. Após ser demitida e seu gato ser atropelado, Nora vê pouco sentido em sua existência e decide colocar um ponto final em tudo. Porém, quando se vê na Biblioteca da Meia-Noite, Nora ganha uma oportunidade única de viver todas as vidas que poderia ter vivido. Neste lugar entre a vida e a morte, e graças à ajuda de uma velha amiga, Nora pode, finalmente, se mudar para a Austrália, reatar relacionamentos antigos – ou começar outros –, ser uma estrela do rock, uma glaciologista, uma nadadora olímpica... enfim, as opções são infinitas. Mas será que alguma dessas outras vidas é realmente melhor do que a que ela já tem? Em A Biblioteca da Meia-Noite, Nora Seed se vê exatamente na situação pela qual todos gostaríamos de poder passar: voltar no tempo e desfazer algo de que nos arrependemos. Diante dessa possibilidade, Nora faz um mergulho interior viajando pelos livros da Biblioteca da Meia-Noite até entender o que é verdadeiramente importante na vida e o que faz, de fato, com que ela valha a pena ser vivida.",
    "price": "38.90",
    "imageUrl": "1759086177741-a_biblioteca_da_meia_noite.jpg"
  },
  {
    "name": "Ilíada",
    "description": "Livro fundador da literatura ocidental que narra a tragédia de Aquiles e a Guerra de Troia em uma nova tradução do helenista português Frederico Lourenço. Primeiro livro da literatura ocidental, a Ilíada parece se tratar, pelo título, apenas de um breve incidente ocorrido no cerco dos gregos à cidade troiana de Ílion, a crônica de aproximadamente cinquenta dias de uma guerra que durou dez anos. No entanto, graças à maestria de seu autor, essa janela no tempo se abre para paisagens vastíssimas, repletas de personagens e eventos que ficariam marcados para sempre no imaginário ocidental. É nesse épico homérico que surgem figuras como Páris, Helena, Heitor, Ulisses, Aquiles e Agamêmnon, e em seus versos somos transportados diretamente para a intimidade dos deuses, com suas relações familiares complexas e às vezes cômicas. Mas, acima de tudo, a Ilíada é a narrativa da tragédia de Aquiles. Irritado com Agamêmnon, líder da coalizão grega, por seus mandos na guerra, o célebre semideus se retira da batalha, e os troianos passam a impor grandes derrotas aos gregos. Inconformado com a reviravolta, seu escudeiro Pátroclo volta ao combate e acaba morto por Heitor. Cegado pelo ódio, Aquiles retorna à carga sedento por vingança, apesar de todas as previsões sinistras dos oráculos. Esta edição em versos da Ilíada, com tradução do helenista português Frederico Lourenço, é acompanhada de textos introdutórios, uma lista das principais personagens e alianças bélicas e mapas que ajudam o leitor a compreender a complexa geografia homérica.",
    "price": "54.44",
    "imageUrl": "1759085628975-iliada.jpg"
  },
  {
    "name": "A Arte da Guerra",
    "description": "O que faz de um tratado militar, escrito por volta de 500 a.C., manter-se atual a ponto de ser publicado praticamente no mundo todo até os dias de hoje? Você verá que, em A arte da guerra, as estratégias transmitidas pelo general chinês Sun Tzu carregam um profundo conhecimento da natureza humana. Elas transcendem os limites dos campos de batalha e alcançam o contexto das pequenas ou grandes lutas cotidianas, sejam em ambientes competitivos – como os do mundo corporativo – sejam nos desafios internos, em que temos de encarar nossas próprias dificuldades. Se você não conhece a si mesmo nem o inimigo, sucumbirá a todas as batalhas. Sun Tzu.",
    "price": "45.35",
    "imageUrl": "1759086092618-arte_da_guerra.jpg"
  },
  {
    "name": "Hamlet",
    "description": "Neste clássico da literatura mundial, um jovem príncipe se reúne com o fantasma de seu pai, que alega que seu próprio irmão, agora casado com sua viúva, o assassinou. O príncipe cria um plano para testar a veracidade de tal acusação, forjando uma brutal loucura para traçar sua vingança. Mas sua aparente insanidade logo começa a causar estragos - para culpados e inocentes. Esta é a sinopse da tragédia de Shakespeare, agora em nova e fluente tradução de Lawrence Flores Pereira, que também oferece uma alentada introdução à obra. A edição traz ainda um clássico ensaio do poeta T.S. Eliot sobre o texto shakespeariano. Hamlet é um dos momentos mais altos da criação artística, um retrato - eletrizante e sempre contemporâneo - da complexa vida emocional de um ser humano.",
    "price": "41.31",
    "imageUrl": "1759086125086-hamlet.jpg"
  },
  {
    "name": "Harry Potter e o Prisioneiro de Azkaban",
    "description": "Depois de Harry Potter e a Pedra Filosofal e Harry Potter e a Câmara Secreta, Harry Potter e o prisioneiro de Azkaban, o terceiro volume da série do bruxo mais adorado do mundo, ganha edição ilustrada pela Rocco. Com projeto gráfico sofisticado - capa dura, sobrecapa e miolo em papel cuchê - o livro traz o texto integral de J.K. Rowling acompanhado dos incríveis desenhos do premiado ilustrador britânico Jim Kay, escolhido para recriar em imagens os sete livros da série. Novamente, Kay apresenta um mundo encantado e repleto de detalhes a cada página, agora para acompanhar o terceiro ano de Harry Potter na Escola de Magia de Hogwarts.",
    "price": "231.90",
    "imageUrl": "1759040200598-prisioneiro_de_azakaban.jpg"
  },
  {
    "name": "Os segredos da mente milionária",
    "description": "Se as suas finanças andam na corda bamba, talvez esteja na hora de você refletir sobre o que T. Harv Eker chama de \"o seu modelo de dinheiro\" – um conjunto de crenças que cada um de nós alimenta desde a infância e que molda o nosso destino financeiro, quase sempre nos levando para uma situação difícil.",
    "price": "34.56",
    "imageUrl": "1759040759829-segredos_da_mente_milionaria.jpg"
  },
  {
    "name": "Odisseia",
    "description": "Os mais de doze mil versos do grande épico de Homero em uma tradução premiada do helenista português Frederico Lourenço. Introdução de Bernard Knox, um dos maiores especialistas americanos em estudos clássicos. A narrativa do regresso de Ulisses a sua terra natal é uma obra de importância sem paralelos na tradição literária ocidental. Sua influência atravessa os séculos e se espalha por todas as formas de arte, dos primórdios do teatro e da ópera até a produção cinematográfica recente.",
    "price": "55.93",
    "imageUrl": "1759041160373-odisseia.jpg"
  },
  {
    "name": "O Pequeno Príncipe",
    "description": "Nesta história atemporal, conheça o piloto estagnado no deserto e um pequeno príncipe que cuida da amada rosa que vive em seu planeta. Siga o menininho enquanto ele embarca em uma estranha e extraordinária jornada por diversos outros planetas até encontrar a Terra, onde finalmente conhece a verdadeira natureza do amor e da amizade.",
    "price": "16.32",
    "imageUrl": "1759081307308-pequeno_principe.jpg"
  },
  {
    "name": "A casa de Hades",
    "description": "Ela e o que restou da tripulação do Argo II sabem o que precisa ser feito, mas todos os caminhos parecem levar ao fracasso de sua missão. Entretanto, eles precisam se decidir e agir rápido, pois o tempo está passando. A sanguinária Mãe Terra escolheu o dia primeiro de agosto para o seu despertar. No Tártaro, Annabeth e Percy passam por grandes dificuldades. Famintos, com sede e feridos, mal conseguem andar pelo território sombrio e venenoso repleto de inimigos que espreitam na escuridão. Não há como descobrir onde ficam as Portas da morte. E mesmo que soubessem sua localização, uma legião formada pelos monstros mais poderosos e fiéis a Gaia estará lá para guardá-las. Nesse momento, Annabeth e Percy não estão em condições de enfrentá-los em um combate.",
    "price": "48.90",
    "imageUrl": "1759081435889-casa_de_hades.jpg"
  },
  {
    "name": "JavaScript: O Guia Definitivo",
    "description": "Referência completa para programadores, JavaScript: O guia definitivo fornece uma ampla descrição da linguagem JavaScript básica e das APIs JavaScript do lado do cliente definidas pelos navegadores Web. Em sua 6ª edição, cuidadosamente reescrita para estar de acordo com as melhores práticas de desenvolvimento Web atuais, abrange ECMAScript 5 e HTML5 e traz novos capítulos que documentam jQuery e JavaScript do lado do servidor. Recomendado para programadores experientes que desejam aprender a linguagem de programação da Web e para programadores JavaScript que desejam ampliar seus conhecimentos e dominar a linguagem, este é o guia do programador e manual de referência de JavaScript completo e definitivo.",
    "price": "247.20",
    "imageUrl": "1759080654334-javascript_guia.jpg"
  },
  {
    "name": "Uzumaki",
    "description": "Kurôzu-cho, uma pequena cidade envolta em neblina na costa do Japão, é amaldiçoada. De acordo com Shuichi Saito, o namorado retraído da adolescente Kirie Goshima, sua cidade é assombrada não por uma pessoa ou ser, mas por um padrão: uzumaki, a espiral, a forma secreta e hipnótica do mundo. Ela se manifesta em tudo, desde conchas e redemoinhos na água até as marcas espirais nos corpos das pessoas, as obsessões insanas do pai de Shuichi e a voz da cóclea em nosso ouvido interno. À medida que a loucura se espalha, os habitantes de Kurôzu-cho são puxados cada vez mais para dentro de um redemoinho do qual não há retorno!",
    "price": "149.39",
    "imageUrl": "1759080785257-uzumaki.jpg"
  },
  {
    "name": "Python para Análise de Dados",
    "description": "Adquira o manual definitivo para manipulação, processamento, limpeza e extração de informações de conjuntos de dados em Python. Atualizada para Python 3.10 e pandas 1.4, a terceira edição deste guia dinâmico vem com estudos de casos práticos que mostram como resolver um amplo conjunto de problemas de análise de dados de maneira eficaz. Durante o processo, você conhecerá as últimas versões do pandas, NumPy e Jupyter. Escrito por Wes McKinney, o criador do projeto pandas, este livro é uma introdução prática e moderna às ferramentas de ciência de dados em Python. Ele é ideal para analistas iniciantes em Python e para programadores Python iniciantes em ciência de dados e computação científica.",
    "price": "115.60",
    "imageUrl": "1759081084846-python_guia.jpg"
  },
  {
    "name": "A Divina Comédia",
    "description": "Texto fundador da língua italiana, súmula da cosmovisão de toda uma época, monumento poético de rigor e beleza, obra magna da literatura universal. É fato que a \"Comédia\" merece esses e muitos outros adjetivos de louvor, incluindo o \"divina\" que Boccaccio lhe deu já no século XIV. Mas também é certo que, como bom clássico, este livro reserva a cada novo leitor a prazerosa surpresa de renascer revigorado, como vem fazendo de geração em geração há quase setecentos anos. A longa jornada dantesca através do Inferno, Purgatório e Paraíso é aqui oferecida na íntegra - com seus mais de 14 mil decassílabos divididos em cem cantos e três partes - na rigorosa tradução de Italo Eugenio Mauro, vencedora do Prêmio Jabuti e celebrada por sua fidelidade à métrica e à rima originais. A edição traz ainda, como prefácio, um inspirado ensaio de Otto Maria Carpeaux.",
    "price": "98.70",
    "imageUrl": "1759081892509-divina_comedia.jpg"
  },
  {
    "name": "A Ciência de Interestelar",
    "description": "Interestelar, o aclamado filme de Cristopher Nolan, nos conduz a uma viagem fantástica até as mais distantes fronteiras do universo - e bem além do nosso universo, rumo à quinta dimensão, ou o “bulk”, como os físicos o denominam. O enredo, assim como os efeitos visuais, é embasado em ciência de verdade, graças ao envolvimento do físico Kip Thorne, autor deste livro. Kip Thorne se envolveu desde a concepção da história até as gravações do filme. De buracos negros, buracos de minhoca, distorção espacial e distorção do tempo até singularidades, gravidade quântica, anomalias gravitacionais, a quinta dimensão, o tesserato de Christopher Nolan e muito, muito mais, Kip Thorne explica de maneira vívida a ciência do filme, além do papel dela na história e nos efeitos visuais. A Ciência de Interestelar mostra que a ciência de verdade pode ser tão estranha quanto a ficção científica.",
    "price": "140.12",
    "imageUrl": "1759082095575-ciencia_de_interestelar.jpg"
  },
  {
    "name": "Sherlock Holmes",
    "description": "Os últimos casos do detetive mais amado da literatura policial. O livro reúne os doze últimos casos solucionados pelo mestre de Baker Street publicados entre 1921 e 1927 pela Strand Magazine: O cliente ilustre * O rosto lívido * A pedra Mazarin * As Três Empenas * O vampiro de Sussex * Os três Garrideb * A ponte Thor * O homem que andava de quatro * A juba de leão * A inquilina de rosto coberto * O velho solar de Shoscombe * Mr. Josias Amberley.",
    "price": "51.35",
    "imageUrl": "1759084694146-sherlock_holmes.jpg"
  },
  {
    "name": "Assassinato no Expresso Oriente",
    "description": "É perto da meia-noite quando a neve acumulada sobre os trilhos interrompe a jornada do Expresso Oriente, o mais famoso e luxuoso trem de passageiros do mundo, que liga a Ásia à Europa. A bordo, milionários, aristocratas, empregados – e um assassino. Porém, no mesmo vagão encontra-se ninguém menos que Hercule Poirot. Caberá ao meticuloso detetive investigar todos os passageiros e descobrir a identidade do ousado criminoso. Christie propõe um fascinante enredo nos moldes do clássico subgênero do \"locked room\" (\"mistério do quarto fechado\"), em que o crime ocorre num local isolado, e a suspeita recai sobre todos os presentes. Publicado em 1934, o romance foi levado com estrondoso sucesso ao cinema pelo diretor Sidney Lumet em 1974, com Albert Finney, Lauren Bacall, Sean Connery, Jacqueline Bisset e Ingrid Bergman no elenco – até hoje uma das mais aclamadas adaptações jamais feitas de um clássico da literatura de mistério.",
    "price": "30.03",
    "imageUrl": "1759084772824-expresso_do_oriente.jpg"
  },
  {
    "name": "Laravel: Up & Running",
    "description": "O que diferencia o Laravel de outros frameworks web PHP? Velocidade e simplicidade, para começar. Este framework de desenvolvimento rápido de aplicações e seu ecossistema de ferramentas permitem que você crie novos sites e aplicações rapidamente com código limpo e legível. Totalmente atualizado para incluir o Laravel 10, a terceira edição deste guia prático oferece a introdução definitiva a um dos frameworks web mais populares da atualidade. Matt Stauffer, um dos principais professores e desenvolvedores da comunidade Laravel, oferece uma visão geral de alto nível e exemplos concretos para ajudar desenvolvedores web PHP experientes a começar a usar este framework imediatamente. Esta edição atualizada abrange as ferramentas de autenticação e front-end totalmente novas, além de outras ferramentas originais introduzidas desde a segunda edição.",
    "price": "236.84",
    "imageUrl": "1759084899811-laravel.jpg"
  },
  {
    "name": "Tomie",
    "description": "Tomie Kawakami é uma femme fatale com longos cabelos negros e uma pinta logo abaixo do olho esquerdo. Ela consegue seduzir praticamente qualquer homem e levá-lo ao assassinato, mesmo que a vítima frequentemente seja a própria Tomie. Enquanto um amante busca mantê-la para si, outro fica aterrorizado pela súcubo imortal. Mas logo percebem que, não importa quantas vezes a matem, o mundo nunca estará livre de Tomie.",
    "price": "145.47",
    "imageUrl": "1759084983303-tomie.jpg"
  },
  {
    "name": "Akira",
    "description": "Após atropelar uma criança de aparência estranha, Tetsuo Shima (o melhor amigo de Kaneda), começa a sentir algumas reações anormais. Isso acaba chamando a atenção do governo que está projetando diversas experiências secretas e acabam sequestrando Tetsuo. Nesta aventura cheia de ficção, Kaneda entra em cena para salvar o amigo, enquanto uma terrível e monstruosa entidade ameaça despertar.",
    "price": "60.38",
    "imageUrl": "1759085114301-akira.jpg"
  },
  {
    "name": "O Médico e o Monstro",
    "description": "Poucos clássicos da literatura são tão conhecidos e adorados como O médico e o monstro. Escrito quando o autor tinha trinta e cinco anos de idade, em 1885, o romance foi um sucesso imediato de público e inseriu Robert Louis Stevenson no grupo seleto dos grandes escritores da literatura universal. Ao narrar as experiências de um médico que, numa “noite maldita”, tomou uma poção fumegante de coloração avermelhada e descobriu “a dualidade absoluta e primordial do homem”, o autor escocês criou uma história de suspense e horror, em que o perigo iminente não está do lado de fora, mas do lado de dentro, na parte obscura da alma. Esta edição, além de uma introdução de Robert Mighall, Ph.D. em ficção gótica e ciência médico-legal vitoriana na Universidade de Wales, conta com um prefácio do escritor Luiz Alfredo Garcia-Roza, que define o romance como “um dos mais perfeitos e provavelmente o mais famoso romance de mistério da literatura de língua inglesa”.",
    "price": "37.58",
    "imageUrl": "1759085371475-medico_e_o_monstro.jpg"
  },
];

async function main() {
  console.log('Iniciando o seeding...');

  const hashedPassword = await hash('123456', 10);
  
  // ADMIN 
  const adminUser = await prisma.user.upsert({
    where: { email: 'walissonadmin@gmail.com' },
    update: {},
    create: {
      name: 'Walisson Admin',
      email: 'walissonadmin@gmail.com',
      password: hashedPassword,
      phone: '1234567890',
      cpf: '1234567890',
      role: Role.ADMIN,
    },
  });

  console.log(`✅ Usuário Admin criado/encontrado com ID: ${adminUser.id} e senha '123456'.`);

  // USER 
  const userWalisson = await prisma.user.upsert({
    where: { email: 'walisson@gmail.com' },
    update: {},
    create: {
      name: 'Walisson User',
      email: 'walissonuser@gmail.com',
      password: hashedPassword, 
      phone: '1112223334', 
      cpf: '99988877766',
      role: Role.USER, 
    },
  });
  
  console.log(`✅ Usuário Padrão 'Walisson User' criado/encontrado com ID: ${userWalisson.id} e senha '123456'.`);
  // ----------------------------------------

  // Adiciona Livros 
  const productsCount = await prisma.product.count();

  if (productsCount === 0) {
    console.log(`Inserindo ${bookData.length} livros no banco de dados...`);
    
    const products = await prisma.product.createMany({
      data: bookData.map(book => ({
        ...book,
        price: parseFloat(book.price.toString()), 
      })),
    });

    console.log(`✅ Criados ${products.count} livros com sucesso!`);
  } else {
    console.log(`⚠️ A tabela de Produtos já contém ${productsCount} itens. Pulando a criação de livros.`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('\nSeed finalizado com sucesso.')
  })
  .catch(async (e) => {
    console.error('ERRO DURANTE O SEED:', e)
    await prisma.$disconnect()
    process.exit(1)
  })