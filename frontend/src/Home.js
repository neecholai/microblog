import React, { useEffect } from 'react';
import BlogPostList from './BlogPostList';
import { useDispatch, useSelector } from 'react-redux';
import { getTitlesFromApi } from './actions';

function Home() {
  const isLoading = useSelector(st => st.isLoading)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTitlesFromApi())
  }, [dispatch])

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