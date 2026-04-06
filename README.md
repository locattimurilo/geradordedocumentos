<!-- ================================ -->
<!-- 📄 GERADOR DE DOCUMENTOS        -->
<!-- ================================ -->

<h1 align="center">📄 Gerador de Documentos Administrativos</h1>

<p align="center">
  Automatize DFD, ETP e Termo de Referência de forma rápida, padronizada e conforme a Lei 14.133/2021.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-orange?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-blue?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-yellow?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/docxtemplater-4B8BBE?style=for-the-badge">
  <img src="https://img.shields.io/badge/PizZip-333333?style=for-the-badge">
</p>

<p align="center">
  <a href="https://locattimurilo.github.io/geradordedocumentos/">
    <img src="https://img.shields.io/badge/🚀 Acessar Ferramenta-0A66C2?style=for-the-badge">
  </a>
</p>

---

## 🧠 A origem do problema

Com a nova legislação 14133/21, acompanhei de perto um problema silencioso e cotidiano: servidores refazendo os mesmos documentos do zero, repetidamente.

DFD, ETP, Termo de Referência — estrutura sempre igual, campos diferentes, e margem enorme para erro humano. Horas gastas em formatação, numeração e adequação legal que poderiam ser usadas em atividades mais estratégicas.

A pergunta foi simples: **dá pra resolver isso com código?**

A resposta virou este projeto.

---

## 📌 Sobre o projeto

O **Gerador de Documentos Administrativos** é uma ferramenta web gratuita que automatiza a criação de documentos essenciais no processo de contratação pública:

- 📄 Documento de Formalização da Demanda (DFD)
- 📊 Estudo Técnico Preliminar (ETP)
- 📑 Termo de Referência (TR)

Com foco em **eficiência, padronização e conformidade legal**, a ferramenta reduz erros manuais e economiza tempo dos servidores públicos.

---

## ⚙️ Como funciona

1. Escolha o tipo de documento (DFD, ETP ou TR)
2. Preencha os campos do formulário
3. Clique em **Gerar**
4. Baixe o arquivo `.docx` pronto para uso

---

## ✅ Benefícios

- ⚡ **Agilidade:** geração em segundos
- 📏 **Padronização:** layout consistente
- ⚖️ **Conformidade:** alinhado à Lei 14.133/2021
- 🔒 **Privacidade:** tudo roda no navegador (sem armazenamento de dados)
- 🧩 **Flexibilidade:** suporte a templates personalizados `.docx`

---

## 🛠️ Stack

A ferramenta roda **100% no navegador** — sem servidor, sem backend, sem dado trafegando para lugar nenhum.

- **HTML5 + CSS3 + JavaScript** — interface e lógica do formulário
- **[docxtemplater](https://docxtemplater.com/)** — geração de `.docx` a partir de templates
- **[PizZip](https://github.com/open-xml-templating/pizzip)** — manipulação dos arquivos
- **[FileSaver.js](https://github.com/eligrey/FileSaver.js/)** — download direto no navegador

---

## 🚀 Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/locattimurilo/geradordedocumentos.git

# Entre na pasta
cd geradordedocumentos

# Abra com um servidor local simples
python -m http.server 8000
```

Acesse `http://localhost:8000` no navegador.

> Ou acesse direto: [locattimurilo.github.io/geradordedocumentos](https://locattimurilo.github.io/geradordedocumentos/)

---

## 🔐 Privacidade

Nenhum dado é armazenado ou compartilhado.
A aplicação funciona **100% no navegador do usuário**.

---

## 👨‍💻 Autor

**Murilo Locatti**
🎓 Estudante de Big Data · FATEC São Carlos
Licença: GNU 🦬
<p>
  <a href="https://www.linkedin.com/in/murilo-locatti-cavalho-36b03a140/">
    <img src="https://img.shields.io/badge/LinkedIn-006192?style=for-the-badge&logo=linkedin&logoColor=white">
  </a>
  <a href="https://github.com/locattimurilo">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white">
  </a>
</p>

---

<p align="center">
  ⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
</p>
