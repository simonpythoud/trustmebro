import Stripe from 'stripe'

const key = process.env.STRIPE_SECRET_KEY
if (!key) throw new Error('Missing STRIPE_SECRET_KEY')

export const stripe = new Stripe(key, {
	apiVersion: '2025-07-30.basil',
})

export function serializeStripeEvent(event: Stripe.Event): any {
	return JSON.parse(JSON.stringify(event))
}


