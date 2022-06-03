# Solidity Dapp Twitter Clone

<p align="center">
    <a href="https://solidity-dapp-twitter-clone-eliasafara.netlify.app/" alt="Netlify" target="_blank">
        <img src="https://api.netlify.com/api/v1/badges/e8f2e766-888b-4954-8500-1b647d84db99/deploy-status" /></a>
    <a href="https://ethereum.org/en/" alt="Ethereum" target="_blank">
        <img src="https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white" /></a>
    <a alt="LICENSE">
        <img src="https://img.shields.io/badge/License-MIT-blue.svg" /></a>
    <a href="https://github.com/EliasAfara/Solidity-Dapp-Twitter-Clone" target="_blank">
        <img src="https://img.shields.io/github/repo-size/EliasAfara/Solidity-Dapp-Twitter-Clone"
            alt="Github repo size"></a>
    <a href="https://github.com/EliasAfara" target="_blank">
        <img src="https://img.shields.io/github/followers/eliasafara?label=Follow&style=social"
            alt="follow on Github"></a>
    <a href="https://twitter.com/intent/follow?screen_name=thegrindev" target="_blank">
        <img src="https://img.shields.io/twitter/follow/thegrindev?style=social&logo=twitter"
            alt="follow on Twitter"></a>
</p>

Decentralised light-twitter clone. Check [Demo](https://solidity-dapp-twitter-clone-eliasafara.netlify.app/)

## Development Steps

- Development of a CRUD API in Solidity
- Deployment to Rinkeby
- Development of a front-end to interact with the smart contracts

## Learning Objectives and Outcomes

To learn how to lead an Ethereum project, end-to-end:

- Solidity development
- Unit tests
- Deployment

## Specs

- Any user should be able to read all the tweets
  - All the tweets should be ordered in a chronological order (either of 2 ways)
- Any user should be able to write tweets
- A user should be able to update a tweet he wrote
- A user should be able to delete a tweet he wrote
  - Deleting a tweet should NOT affect the access to the other tweets
  - Deleting a tweet should NOT affect the order of the other tweets
- Smart contract(s) should be deployed to Ropsten
- Smart contract(s) should be tested with at least 80% line coverage

## Project Requirment/Setup

1. You need to create a virtual wallet [Metamask](https://metamask.io/) account and select "Rinkeby Test Network", I recommend reading this [article](http://www.alchemy.com/overviews/rinkeby-testnet).
2. To get testnet Ether (ETH) in order to test and troubleshoot our decentralized application, I recommend checking [Chainlink](https://faucets.chain.link/rinkeby) and [Rinkeby Faucet](https://rinkebyfaucet.com/).
3. You have to create an account on [Alchemy](https://www.alchemy.com/) and generate an API key by creating an app. This will allow us to make requests to the Rinkeby Test Network. If you’re not familiar with testnets, check out [this guide](https://docs.alchemy.com/alchemy/guides/choosing-a-network#rinkeby). I also recommend going over this [Alchemy documentation](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract) as it explains every step throughly.
4. After cloning the repo and creating your accounts and generating the API key, now you have to create a `.env` same as [.env.example](https://github.com/EliasAfara/Solidity-Dapp-Twitter-Clone/blob/master/server/.env.example) and fill in your keys.


## 🐑 Clone locally

Make sure you have installed [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [Node.js](https://nodejs.org/en/) (Please install **16.14.0**, I recommend using [nvm](https://github.com/nvm-sh/nvm)).

Then clone the repo, install dependencies and start the server by running all these commands:

```text
git clone https://github.com/EliasAfara/Solidity-Dapp-Twitter-Clone.git
cd Solidity-Dapp-Twitter-Clone/server
npm i
cd ../client
npm i
```

### Test the Smart Contract

```Bash
cd server
npx hardhat test
```

Results in all 4 tests passing:

```text
  Twitter App Contract
    Create Tweet
      ✔ should emit NewTweet event
    Get All Tweets
      ✔ should return the correct number of total tweets (65ms)
    Update Tweet
      ✔ should emit UpdateTweet event
    Delete Tweet
      ✔ should emit delete tweet event


  4 passing (3s)
```

## Deployment

```Bash
cd server
npx hardhat run scripts/deploy.js --network rinkeby
```

copy the genereated contract address and paste it in the [config](https://github.com/EliasAfara/Solidity-Dapp-Twitter-Clone/blob/master/client/src/config.js)

> **_NOTE:_** You can also run the scripts inside package.json inside the server dir.

## Making Your First Transaction

After deploying your smart contract, you can copy the generated contract address and check it out on [Rinkeby Etherscan](https://rinkeby.etherscan.io/).

## - License

```text
MIT License

Copyright (c) 2020 Happy Singh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.```

