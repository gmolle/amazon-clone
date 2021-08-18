const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  const {items, email} = req.body

  const transformedItems = items.map((item) => ({
    description: item.description,
    quantity: 1,
    price_data: {
      currency: 'USD',
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ['shr_1JPaRjEueorufED4dZeLmCPc'],
    shipping_address_collection: {
      allowed_countries: [ 
        "US",
        "AT",
        "AR",
        "AU",
        "BE",
        "BG",
        "BO",
        "CA",
        "CH",
        "CL",
        "CO",
        "CR",
        "CY",
        "CZ",
        "DE",
        "DK",
        "DO",
        "EE",
        "EG",
        "ES",
        "FI",
        "FR",
        "GB",
        "GR",
        "HK",
        "HR",
        "HU",
        "ID",
        "IE",
        "IL",
        "IS",
        "IT",
        "LI",
        "LT",
        "LU",
        "LV",
        "MT",
        "MX",
        "NL",
        "NO",
        "NZ",
        "PE",
        "PL",
        "PT",
        "PY",
        "RO",
        "SE",
        "SG",
        "SI",
        "SK",
        "TH",
        "TT",
        "UY"
      ]
    },
    line_items: transformedItems,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map(item => item.image))
    }
  })

  res.status(200).json({id: session.id})
}