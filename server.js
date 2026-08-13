const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
let transportadoras = [ 
    { id: 1, nome: "SmartEnvios", cidade: "São Paulo", ativo: true },
    { id: 2, nome: "Correios", cidade: "Brasília", ativo: true },
    { id: 3, nome: "Total Express", cidade: "Curitiba", ativo: false }
];

app.get('/transportadoras', (req, res) => {
  res.json(transportadoras);
});
app.get('/transportadoras/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const transportadora = transportadoras.find(t => t.id === id);

  if (!transportadora) {
    return res.status(404).json({ erro: "Transportadora não encontrada" });
  }

  res.json(transportadora);
});
app.post('/transportadoras', (req, res) => {
  const { nome, cidade, ativo } = req.body;

  if (!nome || !cidade) {
    return res.status(400).json({ erro: "Nome e cidade são obrigatórios" });
  }

  const novaTransportadora = {
    id: transportadoras.length + 1,
    nome,
    cidade,
    ativo: ativo !== undefined ? ativo : true
  };

  transportadoras.push(novaTransportadora);
  res.status(201).json(novaTransportadora);
});
app.put('/transportadoras/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const transportadora = transportadoras.find(t => t.id === id);

  if (!transportadora) {
    return res.status(404).json({ erro: "Transportadora não encontrada" });
  }

  const { nome, cidade, ativo } = req.body;
  if (nome) transportadora.nome = nome;
  if (cidade) transportadora.cidade = cidade;
  if (ativo !== undefined) transportadora.ativo = ativo;

  res.json(transportadora);
});
app.delete('/transportadoras/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = transportadoras.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: "Transportadora não encontrada" });
  }

  transportadoras.splice(index, 1);
  res.status(204).send();
});
app.listen(PORT, () => {

  console.log(`Servidor rodando em http://localhost:${PORT}`);
});