import joe from './joe.svg';
import './App.css';
import { useState } from 'react';
import getFarms from './helpers/getFarmsBatch';
import AddLiquidity from './helpers/addLiquidity';

function App() {
    const [data, setData] = useState()
    const [loaded, setLoaded] = useState(false);

    async function getAllFarms(){
      let data = await getFarms();
      setData(data)
      setLoaded(true)

    }

    async function handleAdd(id){
      console.log(id)
      await AddLiquidity(id)
    }

  return (
    <div className="App">
      <header className="App-header">
      <img src={joe} width="100" height="120" alt="logo"/>
      <h1>
          Trader Joe Farm manager
        </h1>
        <button onClick={getAllFarms}>Get Farms</button>

        { loaded && 
        <table>
                <thead>
                <tr>
                    <th>Farm Tokens</th>
                    <th>Amount</th>
                    <th>Reward</th>
                </tr>
                </thead>
                <tbody>
                    {
                        data.map((item) => (
                            <tr key = {item.id}>
                                <td>{item.name}</td>
                                <td>{item.amount}</td>
                                <td>{item.rewards}</td>
                                <td><button onClick={() => handleAdd(item.id,)}>Add</button></td>
                                <td><button>Remove</button></td>
                                <td><button>Compound</button></td>
                                <td/>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        }

      </header>
    </div>
  );
}

export default App;
