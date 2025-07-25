import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from '../CheckoutForm/CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Checkout = () => {

    return (
        <Elements stripe={stripePromise}>
            <div className="p-4">
                <h2 className="text-xl  text-center font-semibold mb-4">Request Contact Information</h2>

                <CheckoutForm></CheckoutForm>
            </div>
        </Elements>
    );
};

export default Checkout;