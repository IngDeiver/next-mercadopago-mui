import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Head from "next/head";
import axios from "axios";
import NextLink from "next/link";
import { Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
}));

const tiers = [
  {
    title: "Payment link",
    price: "100",
    description: [
      "Starting to collect through social networks, e-mail or your website is very easy.",
    ],
    buttonText: "Pay",
    buttonVariant: "outlined",
  },
  {
    title: "Checkout Pro",
    subheader: "Most popular",
    price: "2500",
    description: [
      "Checkout Pro is the integration that allows you to charge through our web form from any device in a simple, fast and secure way.",
    ],
    buttonText: "Pay",
    buttonVariant: "contained",
  },
  {
    title: "Checkout API",
    price: "5000",
    description: [
      "Use our APIs to build your own payment experience on your website or mobile app.",
    ],
    buttonText: "Pay",
    buttonVariant: "outlined",
  },
];

export default function Pricing() {
  const classes = useStyles();
  const [pendingTransaction, setpendingTransaction] = React.useState(false);

  const payItem = (item) => {
    setpendingTransaction(true);
    axios
      .post("/api/pay", item, {
        headers: { "content-type": "application/json" },
      })
      .then(({ data }) => {
        window.location.href = data.init_point;
        setpendingTransaction(false);
      })
      .catch((error) => {
        console.error(error.message);
        setpendingTransaction(false);
      });
  };

  return (
    <React.Fragment>
      <Head>
        <title>Ingedeiver | mercado pago | pricings</title>
        <meta charset="utf-8" />
        <meta name="description" content="Simulate payments with mercadopago" />
        <meta name="keywords" content="deiver,mercadopago,next.js,demo,pay" />
        <meta name="author" content="Deiver Guerra Carradcal" />
      </Head>
      <CssBaseline />
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Pricings
        </Typography>
        <Typography align="center" variant="subtitle1">
          In this section you can simulate the purchase of something using three
          different payment methods through the payment market.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container bgcolor="primary" maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ${tier.price}
                    </Typography>
                  </div>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  {tier.title === tiers[1].title && (
                    <Button
                      disabled={pendingTransaction}
                      fullWidth
                      variant={tier.buttonVariant}
                      color="primary"
                      onClick={() =>
                        payItem({ title: tier.title, price: tier.price })
                      }
                    >
                      {tier.buttonText}
                    </Button>
                  )}

                  {tier.title === tiers[2].title && (
                    <NextLink
                      href={{
                        pathname: "/payments/pay",
                        query: { title: tier.title,
                          transaction_amount: tier.price },
                      }}
                    >
                      <Button
                        disabled={pendingTransaction}
                        fullWidth
                        variant={tier.buttonVariant}
                        color="primary"
                      >
                        {tier.buttonText}
                      </Button>
                    </NextLink>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
