import React from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import TextField from "@material-ui/core/TextField";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import Image from 'next/image'
import Head from 'next/head'

export default class PaymentForm extends React.Component {
  state = {
    cvc: "123",
    expiry: "11/25",
    name: "Mercado pago demo credict card",
    number: "4013540682746260",
  };

  render() {
    return (
      <Box m={5}>
        <Head>
          <title>Ingedeiver | mercado pago | demo</title>
          <meta name="google-site-verification" content="Ut52bcyQ9SYhekHEYHJUQpTgc0Y0f5aPXVpHwqjFM1o" />
          <meta charset="utf-8"/>
          <meta name="description" content="Demo application with next.js and payment market to simulate payments."/>
          <meta name="keywords" content="deiver,mercadopago,next.js,demo"/>
          <meta name="author" content="Deiver Guerra Carradcal" />
        </Head>
        <Box my={2} color="gray">
          <Typography variant="h3" component="h1" align="center">
              Mercado pago - Demo
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {/* Credict card */}
          <Grid xs={6} item>
            <Paper>
              <Box p={2}>
                <Box  mb={2}>
                  <Cards
                    cvc={this.state.cvc}
                    expiry={this.state.expiry}
                    focused={this.state.focus}
                    name={this.state.name}
                    number={this.state.number}
                  />
                </Box>
                <form>
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    margin="dense"
                    onChange={ (e) => this.setState({ name: e.target.value})}
                    size="small"
                    defaultValue={this.state.name}
                    variant="outlined"
                    placeholder="Name"
                  />
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    margin="dense"
                    size="small"
                    defaultValue={this.state.number}
                    variant="outlined"
                    type="number"
                    placeholder="Card Number"
                    label="Card Number"
                  />
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    margin="dense"
                    size="small"
                    defaultValue={this.state.cvc}
                    variant="outlined"
                    placeholder="CVC"
                    label="CVC"
                  />
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    margin="dense"
                    size="small"
                    defaultValue={this.state.expiry}
                    variant="outlined"
                    placeholder="Expiry"
                    label="Expiry"
                  />
                </form>
              </Box>
            </Paper>
          </Grid>
          {/* Introduction */}
          <Grid xs={6} item>
            <Paper>
              <Box p={1}>
                <Image src="/images/mercadopago-covid.jpg"
                alt="Mercado pago logo"
                width={1000}
                height={600}/>
                <Typography variant="body2" align="center" >
                  The credit card on the left is a test one, it does not have any type of charge.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }
}
