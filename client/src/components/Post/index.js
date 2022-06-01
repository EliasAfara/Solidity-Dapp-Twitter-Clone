import React, { forwardRef } from 'react';
import './Post.css';
import Avatar from 'react-avatar';
import UpdateRounded from '@material-ui/icons/UpdateRounded';
import DeleteIcon from '@material-ui/icons/Delete';

const Post = forwardRef(
  (
    { displayName, text, personal, deleteTweetOnClick, updateTweetOnClick },
    ref
  ) => {
    return (
      <div className='post' ref={ref}>
        <div className='post__avatar'>
          <Avatar email='metamask@gmail.com' size='48' round={true} />
        </div>
        <div className='post__body'>
          <div className='post__header'>
            <div className='post__headerText'>
              <h3
                style={{
                  color: personal ? '#50b7f5' : 'rgb(56, 51, 51)',
                }}
              >
                {displayName}
              </h3>
            </div>
            <div className='post__headerDescription'>
              <p>{text}</p>
            </div>
          </div>
          <div className='post__footer'>
            {personal ? (
              <UpdateRounded
                fontSize='small'
                onClick={updateTweetOnClick}
                style={{ cursor: 'pointer' }}
              />
            ) : (
              ''
            )}
            {personal ? (
              <DeleteIcon
                fontSize='small'
                onClick={deleteTweetOnClick}
                style={{ cursor: 'pointer' }}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
