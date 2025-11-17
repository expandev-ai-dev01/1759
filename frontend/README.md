# Catálogo de Carros

Listagem de carros, onde ao clicar no card consigo ver detalhes e preencher um formulário de contato.

## Tecnologias

- React 18.3.1
- TypeScript 5.6.3
- Vite 5.4.11
- React Router DOM 6.26.2
- TanStack Query 5.59.20
- Tailwind CSS 4.1.17
- Axios 1.7.7
- Zustand 5.0.1
- React Hook Form 7.53.2
- Zod 4.1.11

## Estrutura do Projeto

```
src/
├── assets/          # Recursos estáticos (estilos, imagens)
├── core/            # Componentes e utilitários compartilhados
│   ├── components/  # Componentes genéricos reutilizáveis
│   ├── lib/         # Configurações de bibliotecas
│   ├── types/       # Tipos TypeScript globais
│   └── utils/       # Funções utilitárias
├── domain/          # Domínios de negócio
├── layouts/         # Layouts da aplicação
├── pages/           # Páginas da aplicação
├── router/          # Configuração de rotas
├── App.tsx          # Componente raiz
└── main.tsx         # Ponto de entrada
```

## Configuração

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Edite o arquivo `.env` com as configurações do backend:
```
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000
```

## Desenvolvimento

Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

## Build

Crie a versão de produção:
```bash
npm run build
```

Pré-visualize a build de produção:
```bash
npm run preview
```

## Funcionalidades

- **Listagem de carros**: Exibição de todos os veículos disponíveis no catálogo
- **Visualização de detalhes**: Informações detalhadas sobre cada veículo
- **Formulário de contato**: Manifestação de interesse e contato com a empresa

## Arquitetura

### Integração com Backend

O frontend se comunica com o backend através de dois clientes HTTP:

- **publicClient**: Para endpoints públicos (`/api/v1/external`)
- **authenticatedClient**: Para endpoints autenticados (`/api/v1/internal`)

### Gerenciamento de Estado

- **TanStack Query**: Cache e sincronização de dados do servidor
- **Zustand**: Estado global da aplicação (quando necessário)
- **React Hook Form + Zod**: Gerenciamento e validação de formulários

### Roteamento

- **React Router DOM**: Navegação client-side
- **Lazy Loading**: Carregamento sob demanda de páginas

## Padrões de Código

- **TypeScript**: Tipagem estática em todo o código
- **Tailwind CSS**: Estilização utilitária
- **Componentes funcionais**: Uso de hooks do React
- **Separação de responsabilidades**: Estrutura modular por domínio