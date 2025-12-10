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

## 🌐 API Utilizada

O projeto consome a API pública do Nota Paraná:
```
https://menorpreco.notaparana.pr.gov.br/api/v1/produtos
```

Parâmetros:
- `local`: Código de localidade
- `gtin`: Código GTIN do produto


## 👥 Contribuidores

- Patrick Souza

## 📄 Licença

Este projeto é restrito aos integrantes do Grupo Ítalo

---

**Desenvolvido por Patrick Souza - Grupo Ítalo**
