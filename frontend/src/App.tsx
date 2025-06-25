import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Order from "./components/Order";

function App() {

  return (
    <Router>
      <Routes>

          <Route path="/order" element={<Order />} />
          <Route path="/" element={<Navigate to="/order" replace />} />S

      </Routes>
    </Router>
  );
}

export default App;