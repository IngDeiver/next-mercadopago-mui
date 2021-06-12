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
}));

const Pay = ({ title, transaction_amount }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cvc, setCvc] = useState("");
  const [expireMounth, setExpireMounth] = useState("");
  const [expireYear, setExpireYear] = useState("");
  const [number, setNumber] = useState("");
  const [focus, setfocus] = useState("");
  const [docType, setdocType] = useState("");
  const classes = useStyles();
  const [docNumber, setDocNumber] = useState("");
  const [installment, setInstallment] = useState("");
  const [installments, setInstallments] = useState([]);
  const [isValidCard, setisValidCard] = useState(false);
  const router = useRouter();

  const onFocus = (state) => {
    setfocus(state);
  };


const pay = (event, cardForm) => {
  event.preventDefault();

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
}

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
        </Head>
        <Box m={5} p={3}>
          <Grid container spacing={1}>
            <Grid item sm={12} md={6}>
              <Box mb={2}>
                <Cards
                  cvc={cvc}
                  expiry={`${expireMounth}/${expireYear}`}
                  name={name}
                  number={number}
                  focused={focus}
                  callback={async (type, isValid) => setisValidCard(isValid)}
                />
              </Box>
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle1">
                <strong>Product: </strong>
                {title}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Amount: </strong>
                ${transaction_amount}
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
              onChange={(e) => setName(e.target.value)}
              size="small"
              variant="outlined"
              placeholder="Name"
              label="Name"
              value={name}
              onFocus={() => onFocus("name")}
              inputProps={{
                id: "cardholderName",
              }}
            />
            <TextField
              fullWidth
              margin="dense"
              onChange={(e) => setEmail(e.target.value)}
              size="small"
              variant="outlined"
              placeholder="Email"
              label="Email"
              type="email"
              value={email}
              onFocus={() => onFocus("email")}
              inputProps={{
                id: "cardholderEmail",
              }}
            />

            <Box display="flex" flexDirection="row" my={1}>
              <FormControl variant="outlined" >
                <Select native
                  value={docType}
                  onChange={(e) => setdocType(e.target.value)}
                  id="identificationType"
                ></Select>
              </FormControl>

              <Box mt={1}>
                <TextField
                  onChange={(e) => setDocNumber(e.target.value)}
                  size="small"
                  variant="outlined"
                  value={docNumber}
                  inputProps={{
                    id: "identificationNumber",
                  }}
                />
              </Box>
            </Box>
            <Box color="gray" mt={3}>
              <Typography variant="h5">Card details</Typography>
              <Divider />
            </Box>
            <Box display="flex" flexDirection="row">
              <Box mt={2}>
                <TextField
                  fullWidth
                  margin="dense"
                  onChange={(e) => setNumber(e.target.value)}
                  size="small"
                  variant="outlined"
                  type="number"
                  placeholder="Card Number"
                  label="Card Number"
                  value={number}
                  onFocus={() => onFocus("number")}
                  inputProps={{
                    id: "cardNumber",
                  }}
                />
              </Box>
              <Box mx={2}>
                <TextField
                  style={{width:100}}
                  margin="dense"
                  onChange={(e) => setCvc(e.target.value)}
                  size="small"
                  variant="outlined"
                  type="number"
                  placeholder="CVC"
                  label="CVC"
                  value={cvc}
                  onFocus={() => onFocus("cvc")}
                  inputProps={{
                    id: "securityCode",
                  }}
                />
              </Box>
              <Box ml={2} style={{display:'none'}}>
                <FormControl >
                  <Select native
                    id="issuer"
                  ></Select>
                </FormControl>
              </Box>
            </Box>

            <Box display="flex" flexDirection="row">
              <Box mr={2}>
                <TextField
                  margin="dense"
                  onChange={(e) => setExpireMounth(e.target.value)}
                  size="small"
                  variant="outlined"
                  placeholder="Mounth"
                  label="Mounth"
                  value={expireMounth}
                  onFocus={() => onFocus("expire")}
                  inputProps={{
                    id: "cardExpirationMonth",
                    maxLength: 2,
                  }}
                />
              </Box>

              <TextField
                margin="dense"
                onChange={(e) => setExpireYear(e.target.value)}
                size="small"
                variant="outlined"
                placeholder="Year"
                label="Year"
                value={expireYear}
                onFocus={() => onFocus("expire")}
                inputProps={{
                  id: "cardExpirationYear",
                  maxLength: 2,
                }}
              />
            </Box>

            <Box my={2}>
              <FormControl
                className={classes.formControl}
                fullWidth
                variant="outlined"
              >
                <Select native
                  value={installment}
                  onChange={(e) => setInstallment(e.target.value)}
                  id="installments"
                ></Select>
              </FormControl>
            </Box>
            <Box display="flex" flexDirection="column" mt={2}>
              <Button color="primary" type="submit" disabled={!isValidCard}
                id="submit"
                >
                {isValidCard ? "Pay" : "Invalid credict card"}
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
