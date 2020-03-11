import React from 'react';
import BlogForm from './BlogForm';
import BlogPost from './BlogPost';
import Home from './Home';
import NotFound from './NotFound';
import { Switch, Route } from 'react-router-dom';

function Routes() {

  return (
    <Switch >
      <Route exact path="/posts/new">
        <BlogForm />
      </Route>
      <Route path="/posts/:postId">
        <BlogPost />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

export default Routes;