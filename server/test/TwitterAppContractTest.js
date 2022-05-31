const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Twitter App Contract', function () {
  let Twitter, twitter, owner, totalTweets, totalMyTweets;

  const OTHER_USERS_TWEETS = 20;
  const OWNER_TWEETS = 7;

  beforeEach(async () => {
    TwitterApp = await ethers.getContractFactory('TwitterAppContract');
    [owner, address1, address2] = await ethers.getSigners();
    twitter = await TwitterApp.deploy();

    (totalTweets = []), (totalMyTweets = []);

    // Creating 20 tweets by other users
    for (let id = 0; id < OTHER_USERS_TWEETS; id++) {
      let tweet = {
        tweetText: 'Other user tweet #' + id,
        username: address1,
        isDeleted: false,
      };

      await twitter
        .connect(address1)
        .createTweet(tweet.tweetText, tweet.isDeleted);
      totalTweets.push(tweet);
    }

    // Creating 7 tweets by the owner
    // Starting from 20 till 27
    for (
      let id = OTHER_USERS_TWEETS;
      id < OWNER_TWEETS + OTHER_USERS_TWEETS;
      id++
    ) {
      let tweet = {
        username: owner,
        tweetText: 'Owner tweet #' + id,
        isDeleted: false,
      };

      await twitter.createTweet(tweet.tweetText, tweet.isDeleted);
      totalTweets.push(tweet);
      totalMyTweets.push(tweet);
    }
  });

  describe('Create Tweet', () => {
    it('should emit NewTweet event', async () => {
      let tweet = {
        tweetText: 'New Tweet',
        isDeleted: false,
      };

      await expect(await twitter.createTweet(tweet.tweetText, tweet.isDeleted))
        .to.emit(twitter, 'NewTweet')
        .withArgs(owner.address, OTHER_USERS_TWEETS + OWNER_TWEETS);
    });
  });

  describe('Get All Tweets', () => {
    it('should return the correct number of total tweets', async () => {
      const tweetsFromChain = await twitter.getAllTweets();
      expect(tweetsFromChain.length).to.equal(
        OTHER_USERS_TWEETS + OWNER_TWEETS
      );
    });
  });

  describe('Update Tweet', () => {
    it('should emit UpdateTweet event', async () => {
      const TWEET_ID = 26; // Belongs to the owner
      const TWEET_NEW_TEXT = 'new tweet text';
      const TWEET_DELETED = false;

      await expect(
        await twitter
          .connect(owner)
          .updateTweet(TWEET_ID, TWEET_NEW_TEXT, TWEET_DELETED)
      )
        .to.emit(twitter, 'UpdateTweet')
        .withArgs(owner.address, TWEET_ID, TWEET_DELETED);
    });
  });

  describe('Delete Tweet', () => {
    it('should emit delete tweet event', async () => {
      const TWEET_ID = 1; // Belongs to other users
      const TWEET_DELETED = true;

      await expect(
        twitter.connect(address1).deleteTweet(TWEET_ID, TWEET_DELETED)
      )
        .to.emit(twitter, 'DeleteTweet')
        .withArgs(TWEET_ID, TWEET_DELETED);
    });
  });
});
