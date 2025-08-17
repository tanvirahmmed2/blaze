import React from 'react'
import PageTitle from '../component/PageTitle'
import ProductsSidebar from '../component/ProductsSidebar'
import Counter from '../component/Counter'

const Home = () => {
    return (
        <>
            <PageTitle title='Home' />
            <div className='w-full flex flex-row justify-around'>
                <div className='flex-1'>
                    <ProductsSidebar />

                </div>
                <div className='flex-3'>
                    <h3>All Product</h3>
                    <Counter/>

                </div>
            </div>
        </>

    )
}

export default Home
