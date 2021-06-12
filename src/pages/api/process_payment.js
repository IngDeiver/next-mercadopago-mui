const mercadopago = require("mercadopago");
mercadopago.configurations.setAccessToken(
  process.env.MERCADO_PAGO_ACCESS_TOKEN
);

export default (req, res) => {
  if (req.method === "POST") {
    const payment_data = {
      transaction_amount: Number(req.body.transactionAmount),
      token: req.body.token,
      description: req.body.description,
      installments: Number(req.body.installments),
      payment_method_id: req.body.paymentMethodId,
      issuer_id: req.body.issuer,
      payer: req.body.payer,
    };

    mercadopago.payment
      .save(payment_data)
      .then( response => {
        res.status(response.status).json({
          status: response.body.status,
          status_detail: response.body.status_detail,
          id: response.body.id,
        });
      })
      .catch( error => {
        res.status(response.status).send(error);
      });
  }
}
