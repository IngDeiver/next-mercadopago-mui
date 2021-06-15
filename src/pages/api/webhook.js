const mercadopago = require("mercadopago");
mercadopago.configurations.setAccessToken(
  process.env.MERCADO_PAGO_ACCESS_TOKEN
);

export default (req, res) => {
    if(req.method === "POST"){
        console.log("Webhook:", req.body);
        res.status(200).send('OK')
    }
}