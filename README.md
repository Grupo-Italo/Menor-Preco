# Menor Preço - Nota Paraná

Aplicação web para consulta e comparação de preços de produtos utilizando a API pública do programa Nota Paraná do Estado do Paraná.

## 📋 Sobre o Projeto

Este projeto permite aos usuários pesquisar produtos por código GTIN (código de barras) e localidade, exibindo uma lista comparativa de preços praticados por diferentes estabelecimentos comerciais. A aplicação também fornece métricas estatísticas sobre os preços encontrados.

## ✨ Funcionalidades

- 🔍 **Busca de Produtos**: Pesquisa por GTIN e localidade
- 📊 **Métricas em Tempo Real**: 
  - Status do serviço
  - Informações da última consulta
  - Média e moda de preços
  - Menor e maior preço encontrados
- 📋 **Listagem Detalhada**: Tabela com informações de:
  - Nome do estabelecimento
  - Preço do produto
  - Endereço completo
  - Cidade/UF
- 🎨 **Interface Moderna**: Design responsivo com Material-UI

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool e dev server
- **Material-UI (MUI)** - Componentes de interface
- **TanStack Query** - Gerenciamento de estado e cache de dados
- **MUI DataGrid** - Tabela de dados avançada
- **Emotion** - Estilização CSS-in-JS

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/Grupo-Italo/Menor-Preco.git

# Entre no diretório
cd menor-preco

# Instale as dependências
npm install

# Execute o projeto em modo de desenvolvimento
npm run dev
```

## 🛠️ Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Cria build de produção
npm run preview  # Preview do build de produção
npm run lint     # Executa o linter
```

## 🌐 API Utilizada

O projeto consome a API pública do Nota Paraná:
```
https://menorpreco.notaparana.pr.gov.br/api/v1/produtos
```

Parâmetros:
- `local`: Código de localidade
- `gtin`: Código GTIN do produto

## 📂 Estrutura do Projeto

```
src/
├── components/
│   ├── Header.jsx      # Cabeçalho da aplicação
│   ├── Search.jsx      # Formulário de busca
│   ├── Metrics.jsx     # Cards de métricas
│   └── Listing.jsx     # Tabela de resultados
├── pages/
│   └── SearchPrices.jsx # Página principal
├── data/
│   └── baselocais.js   # Base de localidades
└── main.jsx            # Ponto de entrada da aplicação
```

## 👥 Contribuidores

- Patrick Souza

## 📄 Licença

Este projeto é restrito aos integrantes do Grupo Ítalo

---

**Desenvolvido por Patrick Souza - Grupo Ítalo**