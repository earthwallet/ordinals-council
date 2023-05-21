import { createCors, error, json, Router } from 'itty-router';
import { Redis } from "@upstash/redis/cloudflare";
const prompt = "Superman flying to Jupiter";
const society = 'cncl';
const earth = 'b1d';

// create the CORS pair
const { preflight, corsify } = createCors({
	methods: ['GET', 'POST'],
	origins: ['http://localhost:5173']
  })

// now let's create a router (note the lack of "new")
const router = Router();

// Register preflight middleware
router.all('*', preflight)

	// GET whitelist, return status
	.get('/whitelisted/:id', async ({ params }) => {
		let value = await env.whitelists.get(params.id, { type: "json" });
		if (value) {
			return new Response(value);
		} else {
			return new Response(false);
		}
	})

	// POST mint NFTs { key, signature }, return { nft } : { amount } : { msg }
	.post('/mint', async (request) => {
		const req = await request.json();
		// Authenticate key signature
		let { signed, key } = validSignature(req.key, req.signature);
		// Authenticate device
		if(signed) {
			// Check key is whitelisted
			let nft = await drops.get(`pfp:${key}:${key}`);
			if (nft = 'available') {
				// Push to nft creation queue
				await env.midjourney.send({
					society,
					prompt,
					key
				});
				return new Response({ msg: 'We are creating your NFT and will notify you when ready' });
			} else if (nft == 'queued') {
				return new Response({msg: 'We will notify you when your NFT is ready.'});
			} else if (!nft) {
				let receipt = await cncl.get(`tx:${key}`);
				if (receipt) {
					// Return nft & receipt tx
					return new Response({nft, receipt});
				} else {
					// TODO: Create fee for payment invoice
					let amount = calculateFee(nft.size);
					return new Reponse({ amount, to: earth });
				}
			} else {
				return new Response({msg: 'Not on the list.'});
			}
		} else {
			// Invalid signature
			return new Response({msg: 'Invalid signature.'});
		}	
	})

	// 404 for everything else
	.all('*', () => new Response(false, {msg: 'Not found'}));

export default {
	fetch: (request) => router.handle(request)
	// transform unformed responses
	.then(json)
	// catch any errors
	.catch(error)
	// add CORS headers to all requests,
	// including errors
	.then(corsify)
};
