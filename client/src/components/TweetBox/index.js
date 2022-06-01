import React, { useState } from 'react';
import './TweetBox.css';
import Avatar from 'react-avatar';
import { Button } from '@material-ui/core';
import { TwitterContractAddress } from '../../config.js';
import { ethers } from 'ethers';
import Twitter from '../../services/TwitterAppContract.json';

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState('');

  const createTweet = async () => {
    let tweet = {
      tweetText: tweetMessage,
      isDeleted: false,
    };

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        );

        await TwitterContract.createTweet(tweet.tweetText, tweet.isDeleted);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log('Error submitting new Tweet', error);
    }
  };

  const sendTweet = (e) => {
    e.preventDefault();

    createTweet();

    setTweetMessage('');
  };

  return (
    <div className='tweetBox'>
      <form>
        <div className='tweetBox__input'>
          <Avatar email='metamask@gmail.com' size='48' round={true} />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type='text'
            className='inputtext'
          />
        </div>

        <Button
          onClick={sendTweet}
          type='submit'
          className='tweetBox__tweetButton'
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
