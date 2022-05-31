// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title Twitter Decentralised Application Contract
 */
contract TwitterAppContract {
    event NewTweet(address recipient, uint256 tweetId);
    event UpdateTweet(address recipient, uint256 tweetId, bool isDeleted);
    event DeleteTweet(uint256 tweetId, bool isDeleted);

    struct Tweet {
        uint256 id;
        address username;
        string tweetText;
        bool isDeleted;
    }

    Tweet[] private tweets;

    // Mapping of Tweet id to the wallet address of the user
    mapping(uint256 => address) tweetToOwner;

    /**
     * @dev Creates a new tweet with the given tweet text and isDeleted status.
     * @param _tweetText The text of the tweet.
     * @param _isDeleted The deteted status of the tweet.
     */
    function createTweet(string memory _tweetText, bool _isDeleted) external {
        uint256 tweetId = tweets.length;
        tweets.push(Tweet(tweetId, msg.sender, _tweetText, _isDeleted));
        tweetToOwner[tweetId] = msg.sender;
        emit NewTweet(msg.sender, tweetId);
    }

    /**
     * @dev function to get all tweets in the feed
     */
    function getAllTweets() external view returns (Tweet[] memory) {
        Tweet[] memory temp = new Tweet[](tweets.length);
        uint256 counter = 0;
        for (uint256 i = 0; i < tweets.length; i++) {
            if (tweets[i].isDeleted == false) {
                temp[counter] = tweets[i];
                counter++;
            }
        }

        Tweet[] memory feedTweets = new Tweet[](counter);
        for (uint256 i = 0; i < counter; i++) {
            feedTweets[i] = temp[i];
        }
        return feedTweets;
    }

    /**
     * @dev Update tweet by changing its isDeleted status (hidding it) and creating a new tweet with the new tweet text.
     * @param _tweetId The tweet (to be updated) id.
     * @param _newTweetText The new text of the tweet.
     * @param _isDeleted The isDeteted status of the tweet.
     */
    function updateTweet(
        uint256 _tweetId,
        string memory _newTweetText,
        bool _isDeleted
    ) external {
        if (tweetToOwner[_tweetId] == msg.sender) {
            uint256 newTweetId = tweets.length;
            tweets[_tweetId].isDeleted = true;
            tweets.push(
                Tweet(newTweetId, msg.sender, _newTweetText, _isDeleted)
            );
            tweetToOwner[newTweetId] = msg.sender;

            emit UpdateTweet(msg.sender, _tweetId, _isDeleted);
        }
    }

    /**
     * @dev Delete a tweet according to its id
     * @param _tweetId The tweet (to be deleted) id.
     * @param _isDeleted The isDeteted status of the tweet.
     */
    function deleteTweet(uint256 _tweetId, bool _isDeleted) external {
        if (tweetToOwner[_tweetId] == msg.sender) {
            tweets[_tweetId].isDeleted = _isDeleted;
            emit DeleteTweet(_tweetId, _isDeleted);
        }
    }
}
