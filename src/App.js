import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import Dashboard from "./components/layout/dashboard";
import Users from "./components/pages/users";
import Login from "./components/pages/login";
import Logout from "./components/logout";
// import Category from "./components/pages/category";
import Signup from "./components/pages/signup";
import Protected from "./components/session/ProtectedRoute";
import ExpRecAmount from "./components/pages/exprecamount";
import AmountHistory from "./components/pages/amounthistory";
import OrderBooks from "./components/pages/orderbooks";
import ReceivedBooksAmount from "./components/pages/receivebooksamount";
import RBA from "./components/pages/rba";
import Screen from "./components/pages/menu/screen";

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Protected Component={Dashboard}/>} />
          <Route path="/users" element={<Protected Component={Users} />} />
          <Route path="/expenses_receive_amount" element={<Protected Component={ExpRecAmount} />} />
          <Route path="/amount_history" element={<Protected Component={AmountHistory} />} />
          <Route path="/order_books" element={<Protected Component={OrderBooks} />} />
          <Route path="/receive_books_amount" element={<Protected Component={ReceivedBooksAmount} />} />
          <Route path="/receive_books_amount2" element={<Protected Component={RBA} />} />
          <Route path="/screen" element={<Protected Component={Screen} />} />
          {/* <Route path="/category" element={<Category />} /> */}          
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
