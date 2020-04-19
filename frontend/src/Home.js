import React, { useEffect, useState } from 'react';
import BlogPostList from './post/BlogPostList';
import { useSelector, useDispatch } from 'react-redux';
import { getTitlesFromApi } from './redux/actions';
import './Home.css';

function Home() {
  const [ranDispatch, setRanDispatch] = useState(false);
  const [noTitles, setNoTitles] = useState(false);
  let titles = useSelector(st => st.titles);
  const dispatch = useDispatch();

  console.log({titles});

  useEffect(() => {
    const runDispatch = async () => {
      await dispatch(getTitlesFromApi());
      setRanDispatch(true);
    }

    if (titles.length === 0 && !ranDispatch) runDispatch();
    if (titles.length === 0 && ranDispatch) setNoTitles(true);
  }, [])

  let mainContentJSX;

  if (noTitles) {
    mainContentJSX = <p>Make the first post!</p>;
  } else if (titles.length === 0) {
    mainContentJSX = <p>Loading...</p>;
  } else {
    mainContentJSX = <BlogPostList />;
  }

  return (
    <div className="Home">
      <h2 className="Home-header">Welcome to <b>Microblog</b>, the best blog on the web</h2>
      {
        mainContentJSX
      }
    </div>
  )
}

export default Home;