import { useEffect, useState } from 'react';
import './styles.scss'
/*
  DESAFIO TÉCNICO - JOGO DA VELHA 

  * descrição
    desenvolva um jogo da velha (tic tac toe) funcional.
    use qualquer técnica de estilização preferida: css modules, sass, styled.

  * tasks
    ? - crie um board de 3x3
    ? - dois jogadores
    ? - ao clicar em um quadrado, preencher com a jogada
    ? - avisar quando o jogo finalizar, caso dê velha avise também
    ? - fazer um risco na sequência vencedora, caso houver
*/

function App() {
  const[data,   setData] = useState([0,0,0,0,0,0,0,0,0])
  const[gamer, setGamer] = useState(1);
  const[winner, setWinner] = useState(null);
  
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const handleClick = (index) => {
    if(data[index] !== 0)
       return ;

    setData((prevState) => {
      const newData = [...data];
      newData[index] = gamer;
      return newData
    })
    
    setGamer(gamer == 1 ? 2 : 1);
  }

  const handleCheckWin = () => {
    for(let values of combinations){
      if((data[values[0]] == 1)&&
         (data[values[1]] == 1)&&
         (data[values[2]] == 1)
      ){
          setWinner(1)
      }

      if((data[values[0]] == 2)&&
         (data[values[1]] == 2)&&
         (data[values[2]] == 2)
      ){
          setWinner(2)
      }      
    }
  }

  const handleCheckEnd = () => {
    let restItems = data.filter(rest => rest == 0);
    
    if(restItems.length == 0)
      setWinner('V')
  }

  const handlePlayAgain = () => {
    setWinner(null);
    setGamer(1);
    setData([0,0,0,0,0,0,0,0,0]);
  }

  useEffect(() => {    
    handleCheckWin();
    handleCheckEnd();
  }, [data]);

  return (
    <>
      <div className='board-game'>
        { 
          data.map((item, index) => {
             return <span className="item horizontal" key={index} onClick={() => handleClick(index)}>                
                { item == 1 && 'X' }
                { item == 2 && 'O' }
             </span>
          })
        }

        { winner && <div className='box-winner'>            
            <span>{ winner == 'V' ? 'Eita, ninguém ganhou... ' : `O Jogador ${winner} venceu!`}</span>
            <button onClick={handlePlayAgain}>JOGAR NOVAMENTE</button>
        </div>
        }
      </div>
    </>
  );
}

export default App;