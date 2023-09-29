import { BrowserRouter, useRoutes } from 'react-router-dom';

import { Layout } from "./containers/Layout"
import { Login } from "./pages/Login"
import { initializeFirebase } from "./firebase/firebase"
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { ModifyTask } from "./pages/ModifyTask";
import { Tasks } from "./pages/Tasks";
import { NavContextProvider } from './context/NavigationContext';
import { NavBar } from './components/NavBar';
import { Test } from './pages/Test';

function App() {

  const AppRoutes = () => {
    const  routes = useRoutes([
      {path: '/', element: <Login />},
      {path: '/home', element: <Home />},
      {path: '/tasks', element: <Tasks />, children: [
        {path: '/tasks/:taskId', element: <ModifyTask />},
        {path: '/tasks', element: <ModifyTask />}
      ]},
      {path: '*', element: <NotFound />},
    ])
    return routes;
  }

const {app, auth} = initializeFirebase();

  return (
    <>
      <BrowserRouter>
        <NavContextProvider>
          <NavBar />
            <Layout>
              <AppRoutes />
            </Layout>
        </NavContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
