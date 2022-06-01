import React, { useState, useEffect } from 'react';
import Feed from './components/Feed';
import './App.css';

function App() {
  const [error, setError] = useState(null);
  const [currentAccount, setCurrentAccount] = useState('');
  const [correctNetwork, setCorrectNetwork] = useState(false);

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        setError('Metamask not detected');
        return;
      }

      checkCorrectNetwork();

      if (correctNetwork) {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });

        setCurrentAccount(accounts[0]);
      } else {
        return;
      }
    } catch (error) {
      console.log('Error connecting to metamask', error);
    }
  };

  // Checks if wallet is connected to the rinkeby network
  const checkCorrectNetwork = async () => {
    const { ethereum } = window;
    let chainId = await ethereum.request({ method: 'eth_chainId' });

    const rinkebyChainId = '0x4';

    if (chainId !== rinkebyChainId) {
      setError('You are not connected to the Rinkeby Testnet!');
      setCorrectNetwork(false);
    } else {
      setCorrectNetwork(true);
    }
  };

  useEffect(() => {
    connectWallet();
  });

  return (
    <>
      {currentAccount === '' ? (
        <div className='Button__wrapper'>
          <button className='MetaMask__LoginButton' onClick={connectWallet}>
            <svg
              className='MetaMask__LoginButton-SVG'
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                d='M8.49 3.5L1.492.5l-1 3 2 8.5 18.995-.5 2-8-1.5-3-6.499 3H8.49z'
                fill='#763D16'
              ></path>
              <path d='M6.99 12h10.998v7H6.99v-7z' fill='#333'></path>
              <path fill='#333' d='M7.99 17h5.998v3H7.99z'></path>
              <path
                d='M1.581 10.664a.609.609 0 0 1 .126.585l-1.484 4.59a.517.517 0 0 0 0 .356l1.296 4.445c.104.334.438.522.752.417l4.452-1.231c.188-.063.397 0 .564.125l.773.626c.021.021.021.021.042.021l1.923 1.336c.104.062.23.104.355.104H13.6c.125 0 .25-.042.355-.104l1.923-1.336c.02 0 .02-.02.042-.02l.773-.627a.663.663 0 0 1 .564-.125l4.452 1.231c.335.084.669-.104.753-.417l1.295-4.445a.517.517 0 0 0 0-.355l-1.483-4.591a.599.599 0 0 1 .125-.585l1.588-7.116a.536.536 0 0 0-.02-.313L23.024.417c-.105-.334-.48-.5-.815-.375l-6.94 2.587a.744.744 0 0 1-.208.042H8.917c-.083 0-.146-.02-.209-.042L1.77.042c-.334-.126-.71.041-.815.375l-.92 2.818a.524.524 0 0 0-.02.313l1.567 7.116zm12.415 3.59l.522-1.085c.063-.126.23-.188.356-.126l1.254.564c.23.104.209.438-.042.522l-1.756.521a.285.285 0 0 1-.334-.396zm-.104-7.534c-.126-.105-.126-.313.02-.397l7.9-5.405a.252.252 0 0 1 .377.125l.982 2.692c.021.042.021.084 0 .147l-1.61 6.198a.226.226 0 0 1-.292.146l-4.347-1.169c-.042 0-.063-.02-.084-.042L13.891 6.72zm-3.825 12.814l.146-1.21c0-.063.042-.126.105-.168l.292-.208c.042-.021.084-.042.126-.042h2.466c.042 0 .104.02.125.042l.293.208c.063.042.083.105.104.167l.126 1.21a.243.243 0 0 1-.23.272h-3.344c-.105 0-.21-.125-.21-.271zM7.85 13.607l1.254-.564a.27.27 0 0 1 .356.126l.522 1.085c.105.208-.104.438-.334.375l-1.777-.521c-.23-.063-.25-.397-.02-.501zM.808 3.86c-.021-.042 0-.105 0-.146l.982-2.672c.063-.146.251-.208.376-.125l7.9 5.405a.244.244 0 0 1 .022.397L7.14 9.015a.159.159 0 0 1-.084.042L2.71 10.226a.226.226 0 0 1-.293-.146L.807 3.86z'
                fill='#F36D34'
              ></path>
            </svg>
            Connect with MetaMask
          </button>
          {error && (
            <div style={{ color: 'red', fontStyle: 'bold', fontWeight: '600' }}>
              {error}
            </div>
          )}
        </div>
      ) : correctNetwork ? (
        <div className='app'>
          <Feed />
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
          <div>----------------------------------------</div>
          <div>Please connect to the Rinkeby Testnet</div>
          <div>and reload the page</div>
          <div>----------------------------------------</div>
        </div>
      )}
    </>
  );
}

export default App;
