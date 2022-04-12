import { Navigate, useRoutes } from 'react-router-dom';
import Header from './components/Header/Header';
import Note from './components/Note/Note';
import NoteBox from './components/NoteBox/NoteBox';

function App() {

  let router = useRoutes([
    {path: '/note/:id', element: <Note />},
    {path: '/', element: <NoteBox />,},
    {path: '*', element: <Navigate to='/' />},
  ])

  return (
    <>
      <Header/>
      {router}
    </>
  );
}

export default App;
