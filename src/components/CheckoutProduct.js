import { StarIcon } from "@heroicons/react/solid"
import Image from "next/image"
import Currency from 'react-currency-formatter'
import { useDispatch } from "react-redux"
import {addToBasket, removeFromBasket} from '../slices/basketSlice'

const CheckoutProduct = ({id, title, price, rating, description, category, image, hasPrime}) => {
  const dispatch = useDispatch()

  const addItemToCart = () => {
    const product = {
      id, 
      title, 
      price, 
      rating,
      description, 
      category, 
      image,
      hasPrime
    }

    // Sending the product as an action to the REDUX store
    dispatch(addToBasket(product))
  }

  const removeItemFromCart = () => {
    // Remove item from REDUX
    dispatch(removeFromBasket({id}))
  }

  return (
    <div className='grid grid-cols-5 border-b pb-5'>
      <Image 
        src={image}
        height={200}
        width={200}
        objectFit='contain'
      />

      {/* Middle */}
      <div className='col-span-3 mx-5'>
        <p>{title}</p>
        <div className='flex'>
          {Array(rating).fill().map((_,idx) => (
            <StarIcon key={idx} className='h-5 text-yellow-500'/>
          ))}
        </div>

        <p className='text-xs my-2 line-clamp-3'>{description}</p>
        <Currency quantity={price}/>

        {hasPrime && (
          <div className='flex items-center space-x-2 -mt-1'>
            <img loading='lazy' src="https://links.papareact.com/fdw" alt="" className='w-12'/>
            <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
          </div>
        )}
      </div>

      {/* Right add/remove buttons */}
      <div className='flex flex-col space-y-2 my-auto justify-self-end'>
        <button className='button' onClick={addItemToCart}>Add to Cart</button>
        <button className='button' onClick={removeItemFromCart}>Remove from Cart</button>
      </div>
    </div>
  )
}

export default CheckoutProduct
