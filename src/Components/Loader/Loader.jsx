import React from 'react'
import { TailSpin } from 'react-loader-spinner'

export default function Loader() {
  return <div className="flex justify-center items-center">
    <TailSpin
        visible={true}
        height="20"
        width="20"
        color="#1877F2"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
    />
    </div>
}
