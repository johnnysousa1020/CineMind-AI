import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout"
import Home from "../pages/Home";
import Assistant from "../pages/Assistant";
import Movies from "../pages/Movies";
import MovieDeatails from "../pages/MovieDeatails";
import SerieDetails from "../pages/SerieDetails";
import Series from "../pages/Series";
import Search from "../pages/Search";
import Favorites from "../pages/Favorites";
import History from "../pages/History";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

function AppRoutes(){
  console.log("APP Routes")

    return(
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />} >
            <Route path="/" element={<Home />}/>
            <Route path="/assistant" element={<Assistant />}/>
            <Route path="/movies" element={<Movies />}/>
            <Route path="/movies/:id" element={<MovieDeatails />}/>
            <Route path="/series/:id" element={<SerieDetails />}/>
            <Route path="/series" element={<Series />}/>
            <Route path="/search" element={<Search />}/>
            <Route path="/favorites" element={<Favorites />}/>
            <Route path="/history" element={<History />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/settings" element={<Settings />}/>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes