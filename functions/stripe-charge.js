const stripe = require('stripe')('sk_test_51IHlWfHPBErOcR5bssqnVfRWhdDtPVWL9su28UzHpDCVrgUatK0TjIIyPPmWMAkxu3LG8e1egPhk6n8QwG7QU5UV00Lqf213f6')

exports.handler = async function (event) {
  const {
      tokenId,
      email,
      name,
      description,
      amount
  } = JSON.parse(event.body)

  const customer = await stripe.customers.create({
      description: email,
      source: tokenId
  })

  await stripe.charges.create({
      customer: customer.id,
      amount,
      name,
      description,
      currency: 'usd'
  })
}