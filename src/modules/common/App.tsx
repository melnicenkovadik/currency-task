import {Suspense} from 'react';
import {Route, Link, Outlet, Routes} from "react-router-dom";
import Converter from "../Converter";
import Courses from "../Courses";
import Loader from './Loader';

function App() {

    return (
        <div className="converter-app">
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={
                        <Suspense fallback={<Loader/>}>
                            <Converter />
                        </Suspense>}/>
                    <Route path="/courses" element={
                        <Suspense fallback={<Loader/>}>
                            <Courses/>
                        </Suspense>
                    }/>
                </Route>
            </Routes>
        </div>
    );
}

function Layout() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Converter</Link>
                    </li>
                    <li>
                        <Link to="/courses">Courses</Link>
                    </li>
                </ul>
            </nav>
            <hr/>
           <Outlet/>
        </div>
    );
}

export default App;
