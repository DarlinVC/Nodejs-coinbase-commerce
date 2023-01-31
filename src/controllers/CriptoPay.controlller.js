// configs
const { ENV } = require("../configs/configs");

// COINBASE
const { Client, resources, Webhook } = require("coinbase-commerce-node");

const { Charge } = resources;

async function CoinbasePayment(req, res) {
  try {
    if (!req.body.amount || req.body.amount.length)
      return res.status(404).send("AmountEmptyOrDontExist");
    const token = req.headers.authorization.substr(7);
    /* extracting the payload to extract user id in the
       payment process data.
    */
    const user = jwt.decode(token, { complete: true });

    // Start Payment process
    Client.init(ENV.Coinbase_configs.API_KEY);

    // Data for the payment process.
    const chargeData = {
      name: "CryptoPay",
      description: "",
      local_price: {
        amount: req.body.amount,
        currency: "USD",
      },
      metadata: {
        _idUser: user.payload._id,
      },
      pricing_type: "fixed_price",
      redirect_url: `${ENV.Global.DOMAIN}success-payment`,
    };

    // Creating the payment process
    const newCharge = await Charge.create(chargeData);

    // Sending the url to complete the payment process.
    return res.status(200).send({
      pass: true,
      msg: newCharge.hosted_url,
    });
  } catch (e) {
    return res.status(500).send("SomethingIsWrong");
  }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns : code status http 
 */
async function PaymentHandler(req, res) {
  const rawBody = req.rawBody;
  const signature = req.headers["x-cc-webhook-signature"];
  const webhooksecret = ENV.Coinbase_configs.WEBHOOK_SECRET;

  let event;

  try {
    // Variable that captures the status of the transaction.
    event = Webhook.verify(rawBody, signature, webhooksecret);

    if (event.type == "charge:pending")
      return res.status(200).send("PendingPayment");
    else if (event.type == "charge:failed")
      return res.status(400).send("PaymentFailed");
    else if (event.type == "charge:confirmed")
    /* 
      Here you can put the actions to follow after the payment
      is confirmed.

      For example: you can put the deposited balance to be added
      to the user, etc.
    */
      return res.status(200).send("PaymentCompleted");
  } catch (e) {
    console.error(e);
    return res.status(500).send("SomethingIsWrong");
  }
}

export { CoinbasePayment, PaymentHandler };
