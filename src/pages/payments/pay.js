import TextField from "@material-ui/core/TextField";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { Box, Button, Paper, Typography } from "@material-ui/core";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const Pay = ({ title }) => {
  const [name, setName] = useState('');
  const [cvc, setCvc] = useState('');
  const [expire, setExpire] = useState('');
  const [number, setNumber] = useState('');
  const [focus, setfocus] = useState('');

  const router = useRouter();

  const onFocus = (state) => {
    setfocus(state)
  }

  return (
    <Box mx={30} mt={5}>
      <Paper>
        <Head>
          <title>Pay {title}</title>
          <meta name="description" content="Pay product section" />
          <meta name="keywords" content={`pay,${title}`} />
          <meta name="author" content="Deiver Guerra Carradcal" />
        </Head>
        <Box p={2}>
          <Box mb={2}>
            <Cards
              cvc={cvc}
              expiry={expire}
              name={name}
              number={number}
              focused={focus}
            />
          </Box>
          <Typography variant="subtitle1" align="center">
            <strong>"Product": </strong>
            {title}
          </Typography>
          <Typography variant="body2" align="center">
            This credit card is a test one, it does not have any type of charge.
          </Typography>
          <form>
            <TextField
              fullWidth
              margin="dense"
              onChange={(e) => setName(e.target.value)}
              size="small"
              variant="outlined"
              placeholder="Name"
              label="Name"
              value={name}
              onFocus={() => onFocus('name')}
            />
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
              onFocus={() => onFocus('number')}
            />
            <TextField
              fullWidth
              margin="dense"
              onChange={(e) => setCvc(e.target.value)}
              size="small"
              variant="outlined"
              type="number"
              placeholder="CVC"
              label="CVC"
              value={cvc}
              onFocus={() => onFocus('cvc')}
            />
            <TextField
              fullWidth
              margin="dense"
              onChange={(e) => setExpire(e.target.value)}
              size="small"
              variant="outlined"
              placeholder="Expiry"
              label="Expiry"
              value={expire}
              onFocus={() => onFocus('expire')}
            />
            <Box display="flex" flexDirection="column">
              <Box my={2}>
                <Button fullWidth variant="contained" color="primary">
                  Pay
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={() => router.back()}
                  fullWidth
                  variant="contained"
                >
                  Back
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export async function getServerSideProps(context) {
  const title = context.query.title;
  return {
    props: { title }, // will be passed to the page component as props
  };
}

export default Pay;
