import { Layout } from "./containers/Layout"
import { Login } from "./pages/Login"
import { initializeFirebase } from "./firebase/firebase"

function App() {

const {app, auth} = initializeFirebase();

  return (
    <>
      <Layout>
        <Login />
      </Layout>
    </>
  )
}

export default App
