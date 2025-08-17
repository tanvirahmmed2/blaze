import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { decrement, increment, incrementbyAmount, reset } from '../app/features/counter/counterSlice'

const Counter = () => {
    const count= useSelector((state)=>state.counterR.count)
    const dispatch= useDispatch()
    const handleIncrement=()=>{

        dispatch(increment())
    }
    const handleIncrementbyfive=()=>{

        dispatch(incrementbyAmount(5))
    }

    const handledecrement=()=>{
        dispatch(decrement())
    }
    const handlereset=()=>{
        dispatch(reset())
    }
  return (
    <div>
      <h2>Counter App</h2>
      <h2 className='font-bold'>Count: {count}</h2>
      <button className=' px-4 border-2 rounded-lg hover:scale-105' onClick={handleIncrement}>+</button>
      <button className=' px-4 border-2 rounded-lg hover:scale-105' onClick={handledecrement}>-</button>
      <button className=' px-4 border-2 rounded-lg hover:scale-105' onClick={handlereset}>o</button>
      <button className=' px-4 border-2 rounded-lg hover:scale-105' onClick={handleIncrementbyfive}>+5</button>

    </div>
  )
}

export default Counter
