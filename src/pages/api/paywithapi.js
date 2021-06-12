// SDK de Mercado Pago
const mercadopago = require ('mercadopago');
// Agrega credenciales
mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

export default  (req, res) => {
    var payment_data = {
        transaction_amount: Number(5000),
        token: "eca1f1b5dad7cce468aba53b54b6bd17",
        description: "description",
        installments: 1,
        payment_method_id: "visa",
        issuer_id: "205",
        payer: {
          email: "emaiexamplel@gmail.com",
          identification: {
            type: "CC",
            number: "23455633"
          }
        }
      };
      
      mercadopago.payment.save(payment_data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
      
}