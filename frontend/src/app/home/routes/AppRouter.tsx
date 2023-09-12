import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../../../shared/components/Layout';
import Home from '../pages/Home';
import InHigh from '../pages/InHigh';
import MostListened from '../pages/MostListened';
import Edition from '../pages/Edition';
import { Song } from '../pages/Song';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/in-high" element={<InHigh />} />
        <Route path="/most-listened" element={<MostListened />} />
        <Route path="/edition" element={<Edition />} />
        <Route path="/song/:songId" element={<Song />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;

