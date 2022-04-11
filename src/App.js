import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Note from './components/Note/Note';
import NoteBox from './components/NoteBox/NoteBox';

function App() {
  return (
    <>
      <Header/>
        <Routes>
          <Route path='/' element={<NoteBox/>} />
          <Route path='/:id' element={<Note/>} />
        </Routes>
    </>
  );
}

export default App;
