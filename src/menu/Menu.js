import { useState } from "react";
import './Menu.css';

function Menu() {

  const [nomeUsuario, setNomeUsuario] = useState("");
  const [qtdeVeiculos, setQtdeVeiculos] = useState(0);
  const veiculosMax = 9;

  const [placaVeiculo, setPlacaVeiculo] = useState("");
  const [marcaVeiculo, setMarcaVeiculo] = useState("");
  const [modeloVeiculo, setModeloVeiculo] = useState("");
  const [anoVeiculo, setAnoVeiculo] = useState("");
  const [veiculos, setVeiculos] = useState([]);

  let veiculoEditar = null

  function cadastrarVeiculo() {
    if (Number(qtdeVeiculos) > Number(veiculosMax)) {
      alert("AVISO, a garagem está cheia!")
      limparForm();
    }
    else {
      if (veiculoEditar) {
        veiculoEditar.placa = placaVeiculo;
        veiculoEditar.marca = marcaVeiculo;
        veiculoEditar.modelo = modeloVeiculo;
        veiculoEditar.ano = anoVeiculo;
        setVeiculos([...veiculos]);
      }
      else {
        let veiculo = {
          placa: placaVeiculo,
          marca: marcaVeiculo,
          modelo: modeloVeiculo,
          ano: anoVeiculo
        }

        veiculos.push(veiculo);
        setVeiculos([...veiculos]);
        limparForm();
        setQtdeVeiculos(qtdeVeiculos + 1)
      }
    }
  }

  function limparForm() {
    setPlacaVeiculo("");
    setMarcaVeiculo("");
    setModeloVeiculo("");
    setAnoVeiculo("");
  }

  function buscarVeiculo(placaDoVeiculo) {
    for (let i = 0; i < veiculos.length; i++) {
      if (veiculos[i].placa === placaDoVeiculo) {
        return { veiculo: veiculos[i], index: i };
      }
    }
  }

  function editarVeiculo(placaDoVeiculo) {
    const busca = buscarVeiculo(placaDoVeiculo);
    setPlacaVeiculo(busca.veiculo.placa);
    setMarcaVeiculo(busca.veiculo.marca);
    setModeloVeiculo(busca.veiculo.modelo);
    setAnoVeiculo(busca.veiculo.ano);
    veiculoEditar = busca.veiculo;
  }

  function excluirVeiculo(placaDoVeiculo) {
    const busca = buscarVeiculo(placaDoVeiculo);
    setQtdeVeiculos(qtdeVeiculos - 1);
    veiculos.splice(busca.index, 1);
    setVeiculos([...veiculos]);
  }


  return (
    <><div className="cabecalho">
      <img src="https://jmartinsdigital.com.br/wp-content/uploads/2022/04/jmlogob.png"
        width="100px"
        title="J Martins Veículos"></img>
    </div><div className="main">
        <div className="box-menu">
          <div className="topo-box-menu">
            <span>Olá, você tem {qtdeVeiculos} veículos cadastrados.</span>
            <h3>Cadastrar um novo veículo</h3>
          </div>
          <div className="inputs-box-menu">
            <input value={placaVeiculo}
              onChange={(e) => { setPlacaVeiculo(e.target.value) }}
              placeholder="Insira a placa do veículo"></input>

            <input value={marcaVeiculo}
              onChange={(e) => { setMarcaVeiculo(e.target.value) }}
              placeholder="Insira a marca do veículo"></input>
          </div>

          <div className="inputs-box-menu2">
            <input value={modeloVeiculo}
              onChange={(e) => { setModeloVeiculo(e.target.value) }}
              placeholder="Insira o modelo do veículo"></input>

            <input value={anoVeiculo}
              onChange={(e) => { setAnoVeiculo(e.target.value) }}
              placeholder="Insira o ano do veículo"></input>
          </div>

          <div className="botao-cadastro">
            <button onClick={cadastrarVeiculo} className="botao-cadastrar">Cadastrar Veículo</button>
          </div>
          <div className="lista-veiculos">
          <h4>Veículos cadastrados:</h4>
            <ol>
              {
                veiculos.map((veiculo) => {
                  return <li>
                    {veiculo.placa} | {veiculo.marca} | {veiculo.modelo} | {veiculo.ano}
                    <button className="botao-editar" onClick={() => { editarVeiculo(veiculo.placa) }}>Editar</button>
                    <button className="botao-excluir" onClick={() => { excluirVeiculo(veiculo.placa) }}>Excluir</button>
                  </li>
                })
              }
            </ol>
          </div>
        </div>
      </div></>
  );
}

export default Menu;
