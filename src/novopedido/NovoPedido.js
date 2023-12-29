import { useState } from "react";
import './NovoPedido.css';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

function NovoPedido() {

  const [nomeUsuario, setNomeUsuario] = useState("");
  const [qtdeVeiculos, setQtdeVeiculos] = useState(0);
  const veiculosMax = 999999999999999;

  const [codProduto, setCodeProduto] = useState("");
  const [nomeProduto, setNomeProduto] = useState("");
  const [qtdeProduto, setQtdeProduto] = useState("");
  const [obsProduto, setObsProduto] = useState("");
  const [valorProduto, setValorProduto] = useState("");
  const [produtos, setProdutos] = useState([]);

  let produtoEditar = null

  function cadastrarProduto() {
    if (Number(qtdeProduto) > Number(veiculosMax)) {
      alert("AVISO, lista de produtos muito cheia")
      limparForm();
    }
    else {
      if (produtoEditar) {
        produtoEditar.codigo = codProduto;
        produtoEditar.nome = nomeProduto;
        produtoEditar.qtde = qtdeProduto;
        produtoEditar.valor = valorProduto;
        produtoEditar.obs = obsProduto;
        setProdutos([...produtos]);
      }
      else {
        let produto = {
          codigo: codProduto,
          nome: nomeProduto,
          qtde: qtdeProduto,
          valor: valorProduto,
          obs: obsProduto
        }

        produtos.push(produto);
        setProdutos([...produtos]);
        limparForm();
        setQtdeProduto(qtdeProduto + 1)
      }
    }
  }

  function limparForm() {
    setCodeProduto("");
    setNomeProduto("");
    setQtdeProduto("");
    setValorProduto("");
    setObsProduto("");
  }

  function buscarProduto(codDoProduto) {
    for (let i = 0; i < produtos.length; i++) {
      if (produtos[i].codigo === codDoProduto) {
        return { produto: produtos[i], index: i };
      }
    }
  }

  function editarProduto(codDoProduto) {
    const busca = buscarProduto(codDoProduto);
    setCodeProduto(busca.produto.codigo);
    setNomeProduto(busca.produto.nome);
    setQtdeProduto(busca.produto.qtde);
    setValorProduto(busca.produto.valor);
    setObsProduto(busca.produto.obs);
    produtoEditar = busca.produto;
  }

  function excluirProduto(codDoProduto) {
    const busca = buscarProduto(codDoProduto);
    setQtdeProduto(qtdeProduto - 1);
    produtos.splice(busca.index, 1);
    setProdutos([...produtos]);
  }

  function createData(codigo, nome, qtde, obs, protein) {
    return { codigo, nome, qtde, obs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  ];


  return (
    <><div className="cabecalho">
      <img src="https://jmartinsdigital.com.br/wp-content/uploads/2022/04/jmlogob.png"
        width="100px"
        title="J Martins Veículos"></img>
    </div><div className="main">
        <div className="box-menu">
          <div className="topo-box-menu">
            <span>Olá, você tem {qtdeProduto} veículos cadastrados.</span>
            <h3>Cadastrar um novo veículo</h3>
          </div>
          <div className="inputs-box-menu">
            <input value={codProduto}
              onChange={(e) => { setCodeProduto(e.target.value) }}
              placeholder="Código Interno do Produto"></input>

            <input value={nomeProduto}
              onChange={(e) => { setNomeProduto(e.target.value) }}
              placeholder="Nome do Produto"></input>
          </div>

          <div className="inputs-box-menu2">
            <input value={qtdeProduto}
              onChange={(e) => { setQtdeProduto(e.target.value) }}
              placeholder="Quantidade"></input>

            <input value={valorProduto}
              onChange={(e) => { setValorProduto(e.target.value) }}
              placeholder="Valor"></input>

            <input value={obsProduto}
              onChange={(e) => { setObsProduto(e.target.value) }}
              placeholder="Observação"></input>
          </div>

          <div className="botao-cadastro">
            <button onClick={cadastrarProduto} className="botao-cadastrar">Cadastrar Veículo</button>
          </div>
          <div className="lista-produtos">
          <h4>Produtos Inseridos:</h4>
            <ol>
              {
                produtos.map((produto) => {
                  return <li>
                    {produto.codigo} | {produto.nome} | {produto.qtde} | {produto.valor} | {produto.obs}
                    <button className="botao-editar" onClick={() => { editarProduto(produto.codigo) }}>Editar</button>
                    <button className="botao-excluir" onClick={() => { excluirProduto(produto.codigo) }}>Excluir</button>
                  </li>
                })
              }
            </ol>
            <TableContainer component={Paper} className="ListaProdutos">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>CÓDIGO</TableCell>
                    <TableCell align="right">PRODUTO</TableCell>
                    <TableCell align="right">QUANTIDADE</TableCell>
                    <TableCell align="right">VALOR</TableCell>
                    <TableCell  Cell align="right">OBSERVAÇÃO</TableCell>
                    <TableCell  Cell align="right">AÇÃO</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={produtos.map}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {produtos.map((produto) => {
                          return <>
                            {produto.codigo}
                            </>
                        })}
                      </TableCell>
                      <TableCell align="right">
                        {produtos.map((produto) => {
                            return <>
                              {produto.nome}
                              </>
                          })}
                      </TableCell>
                      <TableCell align="right">
                        {produtos.map((produto) => {
                            return <>
                              {produto.qtde}
                              </>
                          })}
                      </TableCell>
                      <TableCell align="right">
                        {produtos.map((produto) => {
                            return <>
                              {produto.valor}
                              </>
                          })}
                      </TableCell>
                      <TableCell align="right">
                        {produtos.map((produto) => {
                            return <>
                              {produto.obs}
                              </>
                          })}
                      </TableCell>
                      <TableCell align="right">
                        {produtos.map((produto) => {
                            return <>
                              <DeleteRoundedIcon onClick={() => { excluirProduto(produto.codigo) }}/>
                              </>
                          })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div></>
  );
}

export default NovoPedido;
