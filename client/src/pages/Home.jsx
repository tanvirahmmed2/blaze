import React from 'react'
import PageTitle from '../component/PageTitle'
import ProductsSidebar from '../component/ProductsSidebar'

const Home = () => {
    return (
        <>
            <PageTitle title='Home' />
            <div className='w-full flex flex-row justify-around'>

                <ProductsSidebar />
                <h3>All Product</h3>
            </div>
        </>

    )
}

export default Home
