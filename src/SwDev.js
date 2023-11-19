import React from 'react'

const SwDev = () => {
 
    let swUrl=`${process.env.PUBLIC_URL}/sw.js`;
    navigator.serviceWorker.register(swUrl)
    .then(res=>{
        console.log(res)
    })
}

export default SwDev