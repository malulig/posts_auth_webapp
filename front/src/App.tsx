import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import LayoutMain from "./layout/Layout";
import store from "./store/store";
import "./App.css";
import Posts from "./containers/Posts/Posts";
import Auth from "./containers/Auth/Auth";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutMain />}>
            <Route index element={<Posts />} />
            <Route path="posts" element={<Posts />} />
            <Route path="auth" element={<Auth />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
