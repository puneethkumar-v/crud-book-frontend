import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";

import React from "react";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as yup from "yup";
import axios from "axios";
// import CircularProgress from "@material-ui/core/CircularProgress";

const CreateBookForm = () => {
  const initialValues = {
    isbn: "",
    name: "",
    author: "",
    price: "",
  };
  const checkoutSchema = yup.object().shape({
    isbn: yup.string().required("required"),
    name: yup.string().required("required"),
    author: yup.string().required("required"),
    price: yup.number().required("required"),
  });
  const isNonMobile = useMediaQuery("(min-width:650px)");

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (values, { resetForm }) => {
    setLoading(true);
    const { data } = await axios.post(
      `http://localhost:5000/api/v1/books/`,
      values
    );
    setLoading(false);
    resetForm(initialValues);
  };

  return (
    <Box m="20px" sx={{ height: isNonMobile ? "90vh" : "100%" }}>
      <Box
        m="20px"
        sx={{
          height: isNonMobile ? "80vh" : "100%",
        }}
      >
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form
              onSubmit={handleSubmit}
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
                REGISTER BOOK FORM
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.isbn}
                  name="isbn"
                  error={!!touched.isbn && !!errors.isbn}
                  helperText={touched.isbn && errors.isbn}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Author"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.author}
                  name="author"
                  error={!!touched.author && !!errors.author}
                  helperText={touched.author && errors.author}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price}
                  name="price"
                  error={!!touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
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
                    ADD BOOk
                  </Button>
                )}
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default CreateBookForm;
