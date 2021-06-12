import TextField from "@material-ui/core/TextField";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import {
  Box,
  Button,
  FormControl,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Divider,
  Container,
  Select,
} from "@material-ui/core";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const PUBLICK_KEY = process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY;
var MercadoPago = null;

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginRight: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  expireStyle: {
    width: 100,
  },
}));

const secureInputCommonOptions = {
  onPaste: () => false,
  onCopy: () => false,
  onCut: () => false,
  onDrag: () => false,
  onDrop: () => false,
  autoComplete: "off",
};

const TransactionSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  cvc: Yup.string().required("Cvc is required"),
  expireMounth: Yup.number("Mounth not is a number").required(
    "Mounth expire is required"
  ),
  expireYear: Yup.number("Year not is a number").required(
    "Year expire is required"
  ),
  number: Yup.number("Card number not is a number").required(
    "Card number is required"
  ),
  docType: Yup.string().required("Doc type is required"),
  docNumber: Yup.number("Identification documneto not is a number").required(
    "Document is required"
  ),
  installment: Yup.string().required("Installment is required"),
  docType: Yup.string().required("Doc type is required"),
});

const Pay = ({ title, transaction_amount }) => {
  const [focus, setfocus] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [paidout, setPaidOut] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      cvc: "",
      expireMounth: "",
      expireYear: "",
      number: "",
      docType: "",
      docNumber: "",
      installment: "",
    },
    validationSchema: TransactionSchema,
  });

  const classes = useStyles();
  const router = useRouter();

  const onFocus = (state) => {
    setfocus(state);
  };

  const pay = (event, cardForm) => {
    event.preventDefault();
    setIsSubmiting(true);

    const {
      paymentMethodId,
      issuerId,
      cardholderEmail: email,
      amount,
      token,
      installments,
      identificationNumber,
      identificationType,
    } = cardForm.getCardFormData();
    console.log("Token =>", token);
    console.log("deviceId => ", MP_DEVICE_SESSION_ID);

    const body = {
      token,
      issuer_id: issuerId,
      payment_method_id:String(paymentMethodId),
      transaction_amount: Number(amount),
      installments: Number(installments),
      description: `Pay ${title}`,
      payer: {
        email,
        identification: {
          type: identificationType,
          number: identificationNumber,
        },
      },
    };

    axios.post("/api/process_payment", body, {
      headers: {
        'X-meli-session-id': MP_DEVICE_SESSION_ID,
        'content-type': 'application/json'
      }
    })
    .then(res => {
      console.log(res)
      setIsSubmiting(false)
      setPaidOut(true)
    })
    .catch(err => {
      console.error(err)
      setIsSubmiting(false)
    })
  };

  function loadCardForm() {
    const productCost = transaction_amount;

    const cardForm = MercadoPago.cardForm({
      amount: productCost,
      autoMount: true,
      form: {
        id: "paymentForm",
        cardholderName: {
          id: "cardholderName",
        },
        cardholderEmail: {
          id: "cardholderEmail",
        },
        cardNumber: {
          id: "cardNumber",
        },
        cardExpirationMonth: {
          id: "cardExpirationMonth",
        },
        cardExpirationYear: {
          id: "cardExpirationYear",
        },
        securityCode: {
          id: "securityCode",
        },
        installments: {
          id: "installments",
        },
        identificationType: {
          id: "identificationType",
        },
        identificationNumber: {
          id: "identificationNumber",
        },
        issuer: {
          id: "issuer",
        },
      },
      callbacks: {
        onFormMounted: (error) => {
          if (error)
            return console.warn("Form Mounted handling error: ", error);
        },
        onSubmit: (event) => pay(event, cardForm),
        onFetching: (resource) => {
          console.log("Fetching resource: ", resource);
        },
      },
    });
  }

  React.useEffect(() => {
    if (!MercadoPago) {
      MercadoPago = new window.MercadoPago(PUBLICK_KEY);
      loadCardForm();
    }
  }, []);

  return (
    <Container maxWidth="md">
      <Paper>
        <Head>
          <title>Pay {title}</title>
          <meta name="description" content="Pay product section" />
          <meta name="keywords" content={`pay,${title}`} />
          <meta name="author" content="Deiver Guerra Carradcal" />
          {/* Mercado Pago segcurity scripts */}
          <script
            src="https://www.mercadopago.com/v2/security.js"
            view="item"
          ></script>
          <script
            src="https://www.mercadopago.com/v2/security.js"
            view="item"
            output="deviceId"
          >
            >
          </script>
        </Head>
        <Box m={5} p={3}>
          <Grid container spacing={1}>
            <Grid item sm={12} md={6}>
              <Box mb={2}>
                <Cards
                  cvc={formik.values.cvc}
                  expiry={`${formik.values.expireMounth}/${formik.values.expireYear}`}
                  name={formik.values.name}
                  number={formik.values.number}
                  focused={focus}
                />
              </Box>
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle1">
                <strong>Product: </strong>
                {title}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Amount: </strong>${transaction_amount}
              </Typography>
              <Typography variant="body2" align="center">
                This credit card is a test one, it does not have any type of
                charge.
              </Typography>
              <Box color="gray">
                <Typography variant="body1">
                  To make the payment with a card you can use the following test
                  card with any name:
                </Typography>
                <Typography>
                  <strong>Credict card number: </strong>4013540682746260
                </Typography>
                <Typography>
                  <strong>CVC: </strong>123
                </Typography>
                <Typography>
                  <strong>Expire: </strong>11/25
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <form id="paymentForm">
            <Box color="gray" mt={3}>
              <Typography variant="h5">Buyer details</Typography>
              <Divider />
            </Box>
            <TextField
              fullWidth
              margin="dense"
              onChange={(e) => formik.setFieldValue("name", e.target.value)}
              value={formik.values.name}
              size="small"
              variant="outlined"
              placeholder="Name"
              label="Name"
              onFocus={() => onFocus("name")}
              inputProps={{
                id: "cardholderName",
              }}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              margin="dense"
              size="small"
              variant="outlined"
              placeholder="Email"
              label="Email"
              type="email"
              onChange={(e) => formik.setFieldValue("email", e.target.value)}
              value={formik.values.email}
              onFocus={() => onFocus("email")}
              inputProps={{
                id: "cardholderEmail",
              }}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <Box display="flex" flexDirection="row">
              <FormControl style={{ width: 50, marginRight: 10 }}>
                <Select
                  native
                  onChange={(e) =>
                    formik.setFieldValue("docType", e.target.value)
                  }
                  value={formik.values.docType}
                  id="identificationType"
                ></Select>
              </FormControl>

              <Box mt={1}>
                <TextField
                  size="small"
                  variant="outlined"
                  onChange={(e) =>
                    formik.setFieldValue("docNumber", e.target.value)
                  }
                  value={formik.values.docNumber}
                  inputProps={{
                    id: "identificationNumber",
                  }}
                  error={
                    formik.touched.docNumber && Boolean(formik.errors.docNumber)
                  }
                  helperText={
                    formik.touched.docNumber && formik.errors.docNumber
                  }
                />
              </Box>
            </Box>
            <Box color="gray" my={2}>
              <Typography variant="h5">Card details</Typography>
              <Divider />
            </Box>
            <Box display="flex" flexDirection="row">
              <Box>
                <TextField
                  fullWidth
                  margin="dense"
                  size="small"
                  variant="outlined"
                  type="number"
                  placeholder="Card Number"
                  label="Card Number"
                  onChange={(e) =>
                    formik.setFieldValue("number", e.target.value)
                  }
                  value={formik.values.number}
                  onFocus={() => onFocus("number")}
                  inputProps={{
                    id: "cardNumber",
                    ...secureInputCommonOptions,
                  }}
                  error={formik.touched.number && Boolean(formik.errors.number)}
                  helperText={formik.touched.number && formik.errors.number}
                />
              </Box>
              <Box mx={2}>
                <TextField
                  style={{ width: 100 }}
                  margin="dense"
                  size="small"
                  variant="outlined"
                  type="number"
                  placeholder="CVC"
                  label="CVC"
                  onChange={(e) => formik.setFieldValue("cvc", e.target.value)}
                  value={formik.values.cvc}
                  onFocus={() => onFocus("cvc")}
                  inputProps={{
                    id: "securityCode",
                    ...secureInputCommonOptions,
                  }}
                  error={formik.touched.cvc && Boolean(formik.errors.cvc)}
                  helperText={formik.touched.cvc && formik.errors.cvc}
                />
              </Box>
              <Box style={{ display: "none" }}>
                <FormControl>
                  <Select native id="issuer"></Select>
                </FormControl>
              </Box>
            </Box>

            <Box display="flex" flexDirection="row">
              <Box>
                <TextField
                  className={classes.expireStyle}
                  margin="dense"
                  size="small"
                  variant="outlined"
                  placeholder="MM"
                  label="MM"
                  onChange={(e) =>
                    formik.setFieldValue("expireMounth", e.target.value)
                  }
                  value={formik.values.expireMounth}
                  onFocus={() => onFocus("expire")}
                  inputProps={{
                    id: "cardExpirationMonth",
                    maxLength: 2,
                    ...secureInputCommonOptions,
                  }}
                  error={
                    formik.touched.expireMounth &&
                    Boolean(formik.errors.expireMounth)
                  }
                  helperText={
                    formik.touched.expireMounth && formik.errors.expireMounth
                  }
                />
              </Box>
              <Box mt={1} mx={1} color="gray">
                <Typography variant="h4"> / </Typography>
              </Box>
              <TextField
                className={classes.expireStyle}
                margin="dense"
                size="small"
                variant="outlined"
                placeholder="YY"
                label="YY"
                onChange={(e) =>
                  formik.setFieldValue("expireYear", e.target.value)
                }
                value={formik.values.expireYear}
                onFocus={() => onFocus("expire")}
                inputProps={{
                  id: "cardExpirationYear",
                  maxLength: 2,
                  ...secureInputCommonOptions,
                }}
                error={
                  formik.touched.expireYear && Boolean(formik.errors.expireYear)
                }
                helperText={
                  formik.touched.expireYear && formik.errors.expireYear
                }
              />
            </Box>

            <Box my={2}>
              <FormControl
                className={classes.formControl}
                fullWidth
                variant="outlined"
              >
                <Select
                  native
                  value={formik.values.installment}
                  onChange={(e) =>
                    formik.setFieldValue("installment", e.target.value)
                  }
                  id="installments"
                >
                  <option>Not installment selected yet</option>
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" flexDirection="column" mt={2}>
              <Button
                disabled={isSubmiting || paidout}
                variant="contained"
                color="primary"
                type="submit"
                id="submit"
                onClick={() => formik.submitForm()}
              >
                { paidout  ? 'Congrulations product pai out' : 'Pay'}
              </Button>
              <Box my={2}>
                <Button
                  onClick={() => router.back()}
                  variant="contained"
                  fullWidth
                >
                  Back
                </Button>
              </Box>
              <input
                type="hidden"
                name="transactionAmount"
                id="transactionAmount"
                defaultValue={transaction_amount}
              />
              <input
                type="hidden"
                name="paymentMethodId"
                id="paymentMethodId"
              />
              <input
                type="hidden"
                name="description"
                id="description"
                value="Pay with mercadoPago"
              />
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export async function getServerSideProps(context) {
  const title = context.query.title;
  const transaction_amount = context.query.transaction_amount;
  return {
    props: { title, transaction_amount }, // will be passed to the page component as props
  };
}

export default Pay;
