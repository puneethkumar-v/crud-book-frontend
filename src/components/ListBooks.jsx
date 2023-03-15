import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";
import { Tab, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ListBooks = () => {
  const [books, setBooks] = useState([]);
  const getBooks = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/v1/books/`);
    console.log("hi");
    setBooks(data.book);
  };
  useEffect(() => {
    getBooks();
    // books.map((book) => console.log(book));
    console.log(books);
  }, []);

  const handleDelete = async (isbn) => {
    let url = `http://localhost:5000/api/v1/books/${isbn}`;

    axios.delete(url).then((res) => {
      const del = books.filter((book) => isbn !== book.isbn);
      setBooks(del);
    });
  };

  return (
    <Container>
      <Typography variant="h2" m="2rem" sx={{ textAlign: "center" }}>
        Book Details
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>SL No</TableCell>
              <TableCell align="center">ISBN</TableCell>
              <TableCell align="center">BOOK NAME</TableCell>
              <TableCell align="center">AUTHOR</TableCell>
              <TableCell align="center">PRICE</TableCell>
              <TableCell align="center">OPERATION 1</TableCell>
              <TableCell align="center">OPERATION 2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book, id) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {id + 1}
                </TableCell>
                <TableCell align="center">{book.isbn}</TableCell>
                <TableCell align="center">{book.name}</TableCell>
                <TableCell align="center">{book.author}</TableCell>
                <TableCell align="center">{book.price}</TableCell>
                <TableCell align="center">
                  <button onClick={() => handleDelete(book.isbn)}>
                    Delete
                  </button>
                </TableCell>
                <TableCell align="center">
                  <Link to={`update/${book.isbn}`}>Edit</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ListBooks;
