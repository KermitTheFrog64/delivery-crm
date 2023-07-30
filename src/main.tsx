import ReactDOM from "react-dom/client"
import { store, App } from "./app"
import { Provider } from "react-redux"

console.log( 'for gh/dev' );


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
