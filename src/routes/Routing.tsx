// Routing.js
import { Routes, Route } from "react-router-dom";
import Layout from "../shared/components/Layout";


function Routing() {

  return (
      <Routes>
        <Route path="/" element={<Layout />}>         
        </Route>

      </Routes>
  );
}

export default Routing;
