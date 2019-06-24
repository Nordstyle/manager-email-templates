import React from 'react';
import { Route } from 'react-router-dom';
import Index from './pages/Index';
import Categories from './pages/Categories';
import Messages from './pages/Messages';
import Header from './components/Header';
import RouterButtons from "./components/RouterButtons";

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <div className='App'>
      <CssBaseline />
      <Header/>
      <Container maxWidth="xl">
        <RouterButtons/>
        <Paper className='wrapper'>
          <Route path='/' exact component={Index}/>
          <Route path='/categories' component={Categories}/>
          <Route path='/messages' component={Messages}/>
        </Paper>
      </Container >
    </div>
  );
}

export default App;
