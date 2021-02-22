import { React, useState, useEffect } from "react";
import { moeda } from "./utils/formatCurrency";
import InputMask from "react-input-mask";
import "./App.css";
import { calculo } from "./utils/bancaCalculos";

function App() {
  const [capital, setCapital] = useState("");
  const [payout, setPayout] = useState("");

  const [entrada, setEntrada] = useState(0);
  const [entradaInicial, setEntradaInicial] = useState(0);
  const [soros, setSoros] = useState(0);
  const [soros2, setSoros2] = useState(0);
  const [soros3, setSoros3] = useState(0);
  const [gale1, setGale1] = useState(0);
  const [gale2, setGale2] = useState(0);
  const [lossOrdem1, setlossOrdem1] = useState(0);
  const [lossGale1, setlossGale1] = useState(0);
  const [lossGale2, setlossGale2] = useState(0);
  const [lucroN3, setLucroN3] = useState(0);
  const [nunGale, setNunGale] = useState(0);

  const [win, setWin] = useState(false);
  const [loss, setLoss] = useState(false);

  const [totalLoss, setTotalLoss] = useState(0);
  const [nivelSoros, setNivelSoros] = useState(0);

  const [btnWin, setBtnWin] = useState(false);
  const [btnLoss, setBtnLoss] = useState(false);

  const [prejuizo, setTotalPrejuizo] = useState(0.0);

  const [lucroAcumulado, setLucroAcumulado] = useState(0);
  const [valorBanca, setValorBanca] = useState(0);
  const [value, setValue] = useState(false);

  const handleValues = async (e) => {
    e.preventDefault();
    setValue(true);
    const valores = await calculo(capital, payout);

    setEntrada(valores.entrada);
    setEntradaInicial(valores.entrada);
    setSoros(valores.soros);
    setSoros2(valores.soros2);
    setSoros3(valores.soros3);
    setLucroN3(valores.lucroNivel3);
    setGale1(valores.gale1);
    setGale2(valores.gale2);

    setlossOrdem1(valores.lossOrdem1);
    setlossGale1(valores.lossGale1);
    setlossGale2(valores.lossGale2);

    setLoss(false);
    setWin(false);
    setNivelSoros(0);
    setTotalLoss(0);
    setBtnWin(false);
    setBtnLoss(false);
    setTotalPrejuizo(0);
    setLucroAcumulado(0);
    setNunGale(0);
    setValorBanca(0);
  };

  useEffect(() => {
    if (totalLoss === 3) {
      setBtnWin(true);
      setBtnLoss(true);
      setValorBanca((parseFloat(capital) - parseFloat(prejuizo)).toFixed(2));
    }
  }, [totalLoss]); // eslint-disable-line

  const formWinLoss = (e) => {
    e.preventDefault();

    if (win) {
      if (nivelSoros === 0 && nunGale === 0) {
        setEntrada(soros);
        setWin(false);
        setNivelSoros(1);
        setTotalLoss(0);
        setTotalPrejuizo(0);
        setLucroAcumulado(
          (parseFloat(soros) - parseFloat(entradaInicial)).toFixed(2)
        );
      } else if (nivelSoros === 0 && nunGale !== 0) {
        setEntrada(entradaInicial);
        setNunGale(0);
        setTotalLoss(0);
        setTotalPrejuizo(0);
        setLucroAcumulado(
          (parseFloat(soros) - parseFloat(entradaInicial)).toFixed(2)
        );
      } else if (nivelSoros === 1) {
        setEntrada(soros2);
        setWin(false);
        setNivelSoros(2);
        setTotalLoss(0);
        setTotalPrejuizo(0);
        setLucroAcumulado(
          (parseFloat(soros2) + parseFloat(lucroAcumulado)).toFixed(2)
        );
      } else if (nivelSoros === 2) {
        setEntrada(soros3);
        setWin(false);
        setNivelSoros(3);
        setTotalLoss(0);
        setTotalPrejuizo(0);
        setLucroAcumulado(
          (parseFloat(soros3) + parseFloat(lucroAcumulado)).toFixed(2)
        );
      } else if (nivelSoros === 3) {
        setBtnWin(true);
        setBtnLoss(true);
        setTotalPrejuizo(0);
        setNivelSoros(4);
        setLucroAcumulado(
          (parseFloat(lucroN3) + parseFloat(lucroAcumulado)).toFixed(2)
        );
        setValorBanca(
          (
            parseFloat(capital) +
            parseFloat(lucroN3) +
            parseFloat(lucroAcumulado)
          ).toFixed(2)
        );
      }
    } else if (loss) {
      if (nivelSoros === 0 && totalLoss === 0) {
        setEntrada(gale1);
        setNivelSoros(0);
        setTotalLoss(totalLoss + 1);
        setTotalPrejuizo(lossOrdem1);
        setNunGale(1);
      } else if (nivelSoros === 0 && totalLoss === 1) {
        setEntrada(gale2);
        setNivelSoros(0);
        setTotalLoss(totalLoss + 1);
        setTotalPrejuizo(lossGale1);
      } else if (nivelSoros === 0 && totalLoss === 2 && nunGale !== 0) {
        setNivelSoros(0);
        setEntrada(0);
        setTotalLoss(totalLoss + 1);
        setBtnWin(true);
        setBtnLoss(true);
        setTotalPrejuizo(lossGale2);
      } else if (nivelSoros === 0 && totalLoss === 2 && nunGale === 0) {
        setNivelSoros(0);
        setEntrada(0);
        setTotalLoss(totalLoss + 1);
        setBtnWin(true);
        setBtnLoss(true);
        setTotalPrejuizo(
          (parseFloat(entradaInicial) + parseFloat(gale1)).toFixed(2)
        );
      } else if (nivelSoros === 1) {
        setNivelSoros(0);
        setEntrada(gale1);
        setTotalLoss(totalLoss + 1);
        setTotalPrejuizo(entradaInicial);
        setLucroAcumulado(0);
      } else if (nivelSoros === 2) {
        setEntrada(soros);
        setNivelSoros(1);
        setTotalLoss(totalLoss + 1);
        setLucroAcumulado(
          (parseFloat(lucroAcumulado) - parseFloat(soros2)).toFixed(2)
        );
      } else if (nivelSoros === 3) {
        setEntrada(soros2);
        setNivelSoros(2);
        setTotalLoss(totalLoss + 1);
        setBtnWin(false);
        setLucroAcumulado(
          (parseFloat(lucroAcumulado) - parseFloat(soros3)).toFixed(2)
        );
      }
    }
  };
  return (
    <div className="App">
      <form onSubmit={handleValues}>
        <div className="floating-label-input">
          <InputMask
            inputMode="decimal"
            onKeyPress={(event) => {
              if (!/[0-9 , .]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            type="text"
            required
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
          />
          <label htmlFor="capital">Capital</label>
          <span className="line"></span>
        </div>
        <div className="floating-label-input">
          <InputMask
            type="text"
            required
            onKeyPress={(event) => {
              if (!/[0-9 , .]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            value={payout}
            inputMode="decimal"
            onChange={(e) => setPayout(e.target.value)}
          />
          <label htmlFor="payout">Payout</label>
          <span className="line"></span>
        </div>
        <button className="enviar"> Gerar entrada</button>
      </form>
      <h2> Valor Entrada : {entrada} </h2>
      {value && (
        <form onSubmit={formWinLoss}>
          <button
            className="win"
            onClick={() => setWin(true)}
            disabled={btnWin}
          >
            {" "}
            Win{" "}
          </button>
          <button
            className="loss"
            onClick={() => setLoss(true)}
            disabled={btnLoss}
          >
            {" "}
            Loss{" "}
          </button>
        </form>
      )}
      <div className="valores">
        <h4>
          {nivelSoros} x {totalLoss}
        </h4>
        <span className="prejuizo">Prejuizo Total {moeda(prejuizo)}</span>
        <span className="lucro">Lucro acumulado {moeda(lucroAcumulado)}</span>
        {valorBanca !== 0 && <span> Saldo Banca: {moeda(valorBanca)} </span>}
      </div>
    </div>
  );
}

export default App;
