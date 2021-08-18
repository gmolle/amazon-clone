import Header from "../components/Header"
import Image from 'next/image'
import { useSelector } from "react-redux"
import { selectItems, selectTotal } from "../slices/basketSlice"
import CheckoutProduct from "../components/CheckoutProduct"
import Currency from 'react-currency-formatter'
import { useSession, getSession } from "next-auth/client"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
const stripePromise = loadStripe(process.env.stripe_public_key)

const Checkout = () => {
  const items = useSelector(selectItems)
  const total = useSelector(selectTotal)
  const [session] = useSession()

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // Call the backend to create a checkout session...
    const checkoutSession = await axios.post('/api/create-checkout-session', 
    {
      items: items,
      email: session.user.email
    })

    // Redirect user/customer to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id
    })

    if (result.error) alert(result.error.message)
    
  }

  return (
    <div className='bg-gray-100 top'>
      <Header />
      
      <main className='lg:flex max-w-screen-2xl mx-auto'>
      {/* Left */}
      <div className='flex-grow m-5 shadow-sm'>
        <Image 
          src='https://links.papareact.com/ikj'
          width={1020}
          height={250}
          objectFit='contain'
        />

        <div className='flex flex-col p-5 space-y-10 bg-white min-h-[75vh]'>
          <h1 className='text-3xl border-b pb-4'>
            {items.length === 0 ? 'Your Amazon Cart is empty' : 'Shopping Cart'}
          </h1>

          {items.map(({id, title, rating, price, description, category, image, hasPrime}, idx) => (
            <CheckoutProduct 
              key={idx}
              id={id}
              title={title}
              rating={rating}
              price={price}
              description={description}
              category={category}
              image={image}
              hasPrime={hasPrime}
            />
          ))}

        </div>
      </div>
      
      {/* Right */}
      {items.length > 0 && (
        <div className='flex flex-col bg-white p-10 shadow-md sm:mx-5 md:mb-5'>
            <>
              <h2 className='whitespace-nowrap'>Subtotal ({items.length} items): 
                <span className='font-bold ml-1'>
                  <Currency quantity={total}/>
                </span>
              </h2>
              <button onClick={createCheckoutSession} role='link' disabled={!session} className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
              </button>
            </>
        </div>
      )}

      </main>
    </div>
  )
}

export default Checkout

export async function getServerSideProps(context) {
  const session = await getSession(context)
  
  return {props: {
    session
  }}
}
