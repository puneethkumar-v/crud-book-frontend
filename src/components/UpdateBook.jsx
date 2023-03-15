import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";

import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as yup from "yup";
import axios from "axios";
import { useParams } from "react-router";
// import CircularProgress from "@material-ui/core/CircularProgress";

const UpdateBook = () => {
  const [isbn, setIsbn] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("");

  const isNonMobile = useMediaQuery("(min-width:650px)");

  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const handleFormSubmit = async () => {
    const { data } = await axios.put(
      `http://localhost:5000/api/v1/books/${id}`,
      {
        isbn: isbn,
        name: name,
        price: price,
        author: author,
      }
    );
    alert("DOne");
    setIsbn("");
    setName("");
    setPrice("");
    setAuthor("'");
    window.location.href = "/list";
    console.log(data);
  };
  useEffect(() => {
    const getCurrentBook = async (id) => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/v1/books/${id}`
        );
        setIsbn(data.book.isbn);
        setName(data.book.name);
        setPrice(data.book.price);
        setAuthor(data.book.author);
      } catch (err) {
        console.log(err);
      }
    };
    getCurrentBook(id);
  }, [id]);
  return (
    <Box m="20px" sx={{ height: isNonMobile ? "90vh" : "100%" }}>
      <Box
        m="20px"
        sx={{
          height: isNonMobile ? "80vh" : "100%",
        }}
      >
        <form
          onSubmit={handleFormSubmit}
          style={{
            width: "100%",
            boxShadow: isNonMobile
              ? "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)"
              : null,
            maxWidth: "40rem",
            margin: "0 auto",
            padding: isNonMobile ? "2rem" : null,
            borderRadius: "6px",
          }}
        >
          <Typography
            variant={isNonMobile ? "h3" : "h4"}
            mb="2rem"
            sx={{ textAlign: "center" }}
          >
            UPDATE BOOK FORM
          </Typography>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="ISBN"
              onChange={(e) => setIsbn(e.target.value)}
              value={isbn}
              name="isbn"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              name="name"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Author"
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
              name="author"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              name="price"
              sx={{ gridColumn: "span 2" }}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt="20px"
          >
            {loading ? (
              // <CircularProgress />
              "loading"
            ) : (
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{
                  padding: isNonMobile ? "10px 20px" : null,
                  width: "100%",
                  fontSize: isNonMobile ? "16px" : null,
                  letterSpacing: "0.15rem",
                  fontWeight: "bold",
                }}
              >
                Update Book
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateBook;
