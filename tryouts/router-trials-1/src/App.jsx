import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import Faq from './components/Faq';
import Header from './components/Header';
import Home from './components/Home';
import Todo from './components/Todo';
import Todos from './components/Todos';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <div>
      <ErrorBoundary>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='about' element={<About />} />
          <Route path='faq' element={<Faq />} />
          {/* Todos Route */}
          <Route path="/todo" element={<Todos />}>
            <Route index element={<h1 className='page-banner'>Choose one Todo to view it.</h1>} />
            <Route path=':todoId' element={<Todo />} />
          </Route>
          {/* 404 Route */}
          <Route path='*' element={<h1 className='page-banner'>404 Not Found</h1>} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
