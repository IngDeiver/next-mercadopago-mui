// SDK de Mercado Pago
const mercadopago = require ('mercadopago');
// Agrega credenciales
mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
});


export default (req, res) => {
  if(req.method === "POST"){

    // Crea un objeto de preferencia
    let preference = {
      items: [{
        title: req.body.title,
			  unit_price: Number(req.body.price),
			  quantity: 1,
      }],
      back_urls:{
        success:"https://pagos-ingdeiver.vercel.app",
        failure:"https://pagos-ingdeiver.vercel.app",
        pending:"https://pagos-ingdeiver.vercel.app"
      },
      auto_return: "all"
    };

    mercadopago.preferences.create(preference)
    .then(function(response){
      console.log(response.body);
      res.json({ init_point :response.body.init_point })
    }).catch(function(error){
      res.status(500).json({error: error.message})
    });

  } else {
    res.status(200).send("Method not available")
  }
}
