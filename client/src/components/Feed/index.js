import React, { useState, useEffect } from 'react';
import TweetBox from '../TweetBox';
import Post from '../Post';
import './Feed.css';
import { TwitterContractAddress } from '../../config.js';
import { ethers } from 'ethers';
import Twitter from '../../services/TwitterAppContract.json';

function Feed({ personal }) {
  const [posts, setPosts] = useState([]);
  const [upToDate, setUpToDate] = useState(false);

  const getUpdatedTweets = (allTweets, address) => {
    let updatedTweets = [];
    // Here we set a personal flag around the tweets
    for (let i = 0; i < allTweets.length; i++) {
      if (allTweets[i].username.toLowerCase() === address.toLowerCase()) {
        let tweet = {
          id: allTweets[i].id,
          tweetText: allTweets[i].tweetText,
          isDeleted: allTweets[i].isDeleted,
          username: allTweets[i].username,
          personal: true,
        };
        updatedTweets.push(tweet);
      } else {
        let tweet = {
          id: allTweets[i].id,
          tweetText: allTweets[i].tweetText,
          isDeleted: allTweets[i].isDeleted,
          username: allTweets[i].username,
          personal: false,
        };
        updatedTweets.push(tweet);
      }
    }
    return updatedTweets;
  };

  useEffect(() => {
    const getAllTweets = async () => {
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

          let allTweets = await TwitterContract.getAllTweets();
          setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
          setUpToDate(true);
        } else {
          console.log("Ethereum object doesn't exist");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllTweets();
  }, [upToDate]);

  const updateTweet = (post) => async () => {
    try {
      console.log(post);
      const { ethereum } = window;
      if (ethereum) {
        let updatedText = prompt('Update tweet text', `${post.tweetText}`);
        console.log(updatedText);

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        );

        let TwitterTX = await TwitterContract.updateTweet(
          post.id,
          updatedText,
          post.isDeleted
        );

        if (TwitterTX) setUpToDate(false);
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log('Error updating exisiting Tweet', error);
    }
  };

  const deleteTweet = (key) => async () => {
    console.log(key);

    // Now we got the key, let's delete our tweet
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

        let TwitterTX = await TwitterContract.deleteTweet(key, true);
        if (TwitterTX) setUpToDate(false);
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='feed'>
      <div className='feed__header'>
        <h2>Home</h2>
      </div>

      <TweetBox />

      {posts
        .slice(0)
        .reverse()
        .map((post) => (
          <Post
            key={post.id}
            displayName={post.username}
            text={post.tweetText}
            personal={post.personal}
            updateTweetOnClick={updateTweet(post)}
            deleteTweetOnClick={deleteTweet(post.id)}
          />
        ))}
    </div>
  );
}

export default Feed;
