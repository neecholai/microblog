import React, { useState, useEffect } from 'react';
import BlogPostList from './BlogPostList';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { initializeTitles } from './actions';
import MicroblogApi from './MicroblogApi';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect( () => {
    const displayTitles = async () => {
      const titles = await MicroblogApi.getTitles();
      setIsLoading(false);
      dispatch(initializeTitles(titles));
    };
    displayTitles();
  }, [])

  return (
    <div>
      <h2>Welcome to <b>Microblog</b>, the best blog on the web</h2>
      {
        isLoading
          ? <p>Loading...</p>
          : <BlogPostList />
      }
    </div>
  )
}

export default Home;