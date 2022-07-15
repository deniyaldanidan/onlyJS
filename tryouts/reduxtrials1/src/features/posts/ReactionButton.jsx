import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addReaction } from './postsSlice';

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}

const ReactionButton = ({post, muted}) => {

    const dispatch = useDispatch();

    const reactionButtons = Object.entries(reactionEmoji).map(
        ([emojiName, emoji], index)=>(
                <button key={index} className={`reaction-btn ${muted ? "muted" : "" }`} onClick={()=>!muted && dispatch(addReaction({postId: post.id, reaction: emojiName}))} >
                    {emoji} {post.reactions[emojiName]}
                </button>
            )
        );

    return (
        <div className={`reaction-btns ${muted ? "muted" : ""}`}>
            {reactionButtons}
        </div>
    );
}

ReactionButton.propTypes = {
    post: PropTypes.object.isRequired,
    muted: PropTypes.bool
}

ReactionButton.defaultProps = {
    muted: false
}

export default ReactionButton