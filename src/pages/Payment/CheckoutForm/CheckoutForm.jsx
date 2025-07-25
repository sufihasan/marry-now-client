import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, Label, TextInput } from "flowbite-react";
// import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = () => {
    const { biodataId } = useParams(); // From route like /checkout/:biodataId
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();

    const mutation = useMutation({
        mutationFn: async (paymentInfo) => {
            const res = await axiosSecure.post("/checkout/request-contact", paymentInfo);
            return res.data;
        },
        onSuccess: async (data) => {
            console.log(data.transactionId);
            const transactionId = data.transactionId;
            // const clientSecret = data.clientSecret;
            Swal.fire({
                icon: 'success',
                title: 'Payment Successful!',
                // text: "Your request is pending for admin approval",
                html: `<p>Your request is pending for admin approval</p> <br/> 
                <strong>Transaction ID:</strong> <code>${transactionId}</code>
                `,
                confirmButtonText: 'Go to My Parcels',
            });
            // Swal.fire("Success", "Your request is pending for admin approval.", "success");
        },
        onError: (err) => {
            Swal.fire("Error", err.message || "Something went wrong", "error");
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            Swal.fire("Card Error", error.message, "error");
            return;
        }
        else {
            console.log('payment method', paymentMethod);


        }

        const paymentInfo = {
            biodataId,
            userName: user?.displayName,
            userEmail: user?.email,
            amount: 5, // USD
            paymentMethodId: paymentMethod.id,
        };



        mutation.mutate(paymentInfo);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <div>
                <Label>Biodata ID</Label>
                <TextInput readOnly value={biodataId} />
            </div>
            <div>
                <Label>Your Email</Label>
                <TextInput readOnly value={user?.email} />
            </div>
            <div>
                <Label>Card Details</Label>
                <CardElement className="border p-2 rounded-md" />
            </div>
            <Button type="submit" disabled={!stripe || mutation.isLoading}>
                {mutation.isLoading ? "Processing..." : "Pay $5 & Request"}
            </Button>
            {/* <Button type="submit" disabled={!stripe}>
                {"Pay $5 & Request"}
            </Button> */}
        </form>
    );
};

export default CheckoutForm;
