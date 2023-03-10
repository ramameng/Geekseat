import {
  Alert,
  AlertColor,
  Box,
  Button,
  Divider,
  Fade,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik";
import { useState } from "react";
import agent from "../app/api/agent";
import { VillagesFormValues } from "../app/model/villages";
import CloseIcon from "@mui/icons-material/Close";
import { NumberInputField } from "../app/form/NumberInputField";
import * as Yup from "yup";

export default function Main() {
  const [values] = useState<VillagesFormValues>(new VillagesFormValues());
  const [state, setState] = useState({
    open: false,
    message: "",
    severity: "error" as AlertColor,
  });
  const [result, setResult] = useState({
    open: false,
    message: "",
  });

  const schema = Yup.object({
    personA: Yup.object().shape({
      ageOfDeath: Yup.number()
        .typeError("Age of death is must be a number.")
        .required("Age of death is required."),
      yearOfDeath: Yup.number()
        .typeError("Year of death is must be a number.")
        .required("Year of death is required."),
    }),
    personB: Yup.object().shape({
      ageOfDeath: Yup.number()
        .typeError("Age of death is must be a number.")
        .required("Age of death is required."),
      yearOfDeath: Yup.number()
        .typeError("Year of death is must be a number.")
        .required("Year of death is required."),
    }),
  });

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setState({ open: false, message: "", severity: "error" });
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const calculate = async (values: VillagesFormValues) => {
    try {
      const result = await agent.Calulates.calculate(values);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const handleFormSubmit = (values: VillagesFormValues) => {
    calculate(values)
      .catch((error) => {
        setState({ open: true, message: error, severity: "error" });
      })
      .then((result) => {
        if (result !== undefined) {
          setResult({
            open: true,
            message: `The average number of people killed by witch is ${
              result as string
            }`,
          });
        }
      });
  };

  const handleReset = (
    resetForm: () => void,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    setFieldValue("personA.ageOfDeath", Number.NaN);
    setFieldValue("personA.yearOfDeath", Number.NaN);
    setFieldValue("personB.ageOfDeath", Number.NaN);
    setFieldValue("personB.yearOfDeath", Number.NaN);
    resetForm();
    setResult({
      open: false,
      message: "",
    });
  };

  return (
    <>
      <Typography variant="h4" align="center">
        Person Killed
      </Typography>
      <Formik
        validationSchema={schema}
        enableReinitialize
        initialValues={values}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, resetForm, setFieldValue }) => (
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs>
                <Divider>Person A</Divider>
                <Box
                  sx={{
                    display: "flex",
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                    justifyContent: "center",
                  }}
                >
                  <NumberInputField
                    name="personA.ageOfDeath"
                    label="Age Of Death"
                    variant="outlined"
                  />
                  <NumberInputField
                    name="personA.yearOfDeath"
                    label="Year Of Death"
                    variant="outlined"
                  />
                </Box>
              </Grid>
              <Grid item xs>
                <Divider>Person B</Divider>
                <Box
                  sx={{
                    display: "flex",
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                    justifyContent: "center",
                  }}
                >
                  <NumberInputField
                    name="personB.ageOfDeath"
                    label="Age Of Death"
                    variant="outlined"
                  />
                  <NumberInputField
                    name="personB.yearOfDeath"
                    label="Year Of Death"
                    variant="outlined"
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    "& .MuiButton-root": { m: 1, width: "25ch" },
                    justifyContent: "center",
                  }}
                >
                  <Button variant="contained" type="submit">
                    Calculate
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleReset(resetForm, setFieldValue)}
                  >
                    Reset
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Fade in={result.open} timeout={{ appear: 6000, enter: 6000, exit: 0 }}>
          <Paper sx={{ m: 1, padding: 2 }} elevation={4}>
            <Typography variant="h5" color="red">
              {result.message}
            </Typography>
          </Paper>
        </Fade>
      </Box>
      <Snackbar
        open={state.open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
      >
        <Alert onClose={handleClose} severity={state.severity}>
          {state.message}
        </Alert>
      </Snackbar>
    </>
  );
}
