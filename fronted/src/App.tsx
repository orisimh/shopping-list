import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Order from "./components/Order";

function App() {

  return (
    <Router>
      <Routes>

        {/* Public route */}
        {/* <Route path="/" element={<Login />} /> */}

        {/* Protected routes */}
        {/* <Route element={<ProtectedLayout />}> */}
        <Route path="/order" element={<Order />} />
          {/* <Route path="/deals" element={<List />} /> */}
        {/* </Route> */}

      </Routes>
    </Router>
  );
}

export default App;