import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51McmUSBD7fEX0fZc09hgcXnW4c0dIkvPkic0gZt9NAAW7Zh699pc8EoC83BHBcBwzl1X3Ec3VFTkoSQ1WLbhqdC600f44kjAR6'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from server
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
