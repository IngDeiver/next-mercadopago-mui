import React from "react";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import Image from "next/image";
import Head from "next/head";

export default class PaymentForm extends React.Component {
  render() {
    return (
      <Box m={5}>
        <Head>
          <title>Ingedeiver | mercado pago | demo</title>
          <meta
            name="google-site-verification"
            content="Ut52bcyQ9SYhekHEYHJUQpTgc0Y0f5aPXVpHwqjFM1o"
          />
          <meta charset="utf-8" />
          <meta
            name="description"
            content="Demo application with next.js and payment market to simulate payments."
          />
          <meta name="keywords" content="deiver,mercadopago,next.js,demo" />
          <meta name="author" content="Deiver Guerra Carradcal" />
        </Head>
        <Grid container spacing={2}>
          {/* Credict card */}
          <Grid xs={12} md={6} item>
            <Paper>
              <Box pt={2}>
                <Typography  variant="h3" component="h1" align="center">
                  Mercado pago - Demo
                </Typography>
              </Box>
              <Box color="gray" m={2} pb={5.5}>
                <Typography variant="body1">
                  Payment market implementation with next.js and ui material,
                  the data on this page is for testing purposes only. If you
                  choose to pay with a registered user of Mercado Pago, use the
                  following credentials:
                </Typography>
                <Typography>
                  <strong>User: </strong>test_user_88984968@testuser.com
                </Typography>
                <Typography>
                  <strong>Password: </strong>qatest7536
                </Typography>

                <Typography variant="body2" >
                  This credit card is a test one, it does not have any type of
                  charge.
                </Typography>
                <Box color="gray"  >
                  <Typography variant="body1">
                    To make the payment with a card you can use the following
                    test card with any name:
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
              </Box>
            </Paper>
          </Grid>
          {/* Introduction */}
          <Grid xs={12} md={6}  item>
            <Paper>
              <Box p={1}>
                <Image
                  src="/images/mercadopago-covid.jpg"
                  alt="Mercado pago logo"
                  width={1000}
                  height={600}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }
}
