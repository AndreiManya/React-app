import React from 'react';
import PostListItem from  '../post-list-item/';

import './post-list.css';

const PostList = ({posts, onDelete, onLike, onImportant}) => { 
  const elements = posts.map((item) => {
    return (
      <li key={item.id} className="list-group-item">
        <PostListItem 
          {...item}
          onDelete= {() => onDelete(item.id)} 
          onLike = {() => onLike(item.id)} 
          onImportant = {() => onImportant(item.id)} 
        />
      </li>
    )
  })
  
  return ( 
    <ul className="app-list list-group">
      {elements}
    </ul>
  )
}

export default PostList;