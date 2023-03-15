import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes } from "react-router";
import CreateBookForm from "./components/CreateBookForm";
import Navbar from "./components/Navbar";
import ListBooks from "./components/ListBooks";
import UpdateBook from "./components/UpdateBook";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<CreateBookForm />} />
        <Route path="/list" element={<ListBooks />} />
        <Route path="/list/update/:id" element={<UpdateBook />} />
        {/* <Route
          path="/display"
          element={<StudentInfo rows={arrayOfStudents} />}
        /> */}
      </Routes>
    </div>
  );
}

export default App;
