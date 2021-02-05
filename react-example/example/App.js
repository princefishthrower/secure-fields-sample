import React, { useState } from 'react'
import clx from 'classnames'

import Transaction from './Transaction'

import SecureFields from '../src'

// Styled input fields
import StyledFields from './fields'

export default function SecureFieldExample() {
  const [transactionId, setTransactionId] = useState('')
  const [paymentMethod, setPaymentMethod] = useState()
  const [isReady, setIsReady] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const handleChange = (data) => {
    let p = data.fields.cardNumber.paymentMethod
      ? data.fields.cardNumber.paymentMethod
      : false

    setError(false)
    setPaymentMethod(p)
  }

  const handleValidate = (data) => {
    if (!data.fields.cardNumber.valid) {
      setError('card')
    }

    if (!data.fields.cvv.valid) {
      setError('cvv')
    }
  }

  const handleSuccess = (data) => {
    console.log(data)
    if (data.transactionId) {
      setMessage(`Data submitted successfully with transaction # ${data.transactionId}\n\n
Card Brand: ${data.cardInfo.brand}\n
Card Type: ${data.cardInfo.type}\n
Card Country: ${data.cardInfo.country}\n
Card Issuer: ${data.cardInfo.issuer}\n
Card Usage: ${data.cardInfo.usage}`)
    } else if (data.error) {
      setMessage(data.error)
      setError(true)
    }
  }

  return <div >
    <h1 style={{ fontFamily: 'Helvetica, sans-serif', fontWeight: 300 }}>Datatrans SecureFields Demo</h1>

    {/* Demo to get a transactionID */}
    <Transaction transactionId={transactionId} setTransactionId={setTransactionId} />

    {transactionId && <div className='col-half'>
      <SecureFields
        transactionId={transactionId}
        production={false /* Default: false */}
        fields={{
          cardNumber: 'card-number',
          cvv: 'cvv-number'
        }}
        onReady={() => { setIsReady(true) }}
        onSuccess={handleSuccess}
        onValidate={handleValidate}
        onChange={handleChange}
        onError={(data) => {
          if (data.error) {
            setMessage(data.error)
          } else {
            setMessage(data)
          }
          setError(true)
          setIsReady(true)
        }}
      />
      <StyledFields
        paymentMethod={paymentMethod}
        isReady={isReady}
        error={error}
      />
      {message && <div style={{maxWidth: '400px', margin: '20px auto'}}>
        <p className={clx('message', {
          error,
          success: !error
        })}>{message}</p>
        </div>
      }
    </div>}
  </div>
}
