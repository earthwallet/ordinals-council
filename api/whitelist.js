import { Router } from 'itty-router';
const { initializeApp } = require("firebase-admin/app");
const { getAppCheck } = require("firebase-admin/app-check");
const firebaseApp = initializeApp();

// now let's create a router (note the lack of "new")
const router = Router();

// GET available drops by type
router.get('/drops', async (request) => {
	let pfp = await env.pfps.get('drops');
	let music = await env.music.get('drops');
	let art = await env.art.get('drops');
	let photo = await env.photo.get('drops');
	return new Response({ pfp, music, art, photo });
});

// POST create a new drop as admin
router.post('/drops', async (request) => {
	// Validate app check token exists
	let { params } = request;
    if (!request.auth == process.env.AUTH_KEY) {
        return new Response(false);
    }

    try {
		let { chain, type, drop, name, img, url, whitelist, available, ends, live } = params;
		let result;
		switch (type) {
			case type == 'pfp':
				result =  await env.pfp.put(`${chain}:${drop}`, { name, img, url, whitelist, available, ends, live });
			case type == 'music':
				result =  await env.music.put(`${chain}:${drop}`, { name, img, url, whitelist, available, ends, live });
			case type == 'art':
				result =  await env.art.put(`${chain}:${drop}`, { name, img, url, whitelist, available, ends, live });
			case type == 'photo':
				result =  await env.photo.put(`${chain}:${drop}`, { name, img, url, whitelist, available, ends, live });
			default:
				break;
		}
		return new Response(result);
    } catch (err) {
        return new Response(false);
    }
});

// POST register for a drop
router.post('/register', async (request) => {
	const appCheckToken = request.header('X-Firebase-AppCheck');
	if (!appCheckToken) return new Response(false);

    try {
		// Authenticate with Earth Wallet
        const appCheckClaims = await getAppCheck().verifyToken(appCheckToken, { consume: true });
		if (appCheckClaims.alreadyConsumed) return new Response(false);

		// Get drop details
		let { account, chain, type, drop, name, img, url, whitelist, available, ends, live } = request.params;
		let details;
		switch (type) {
			case 'pfp':
				details =  await env.pfp.get(`${chain}:${drop}`);
				break;
			case 'music':
				details =  await env.music.get(`${chain}:${drop}`);
				break;
			case 'art':
				details =  await env.art.get(`${chain}:${drop}`);
				break;
			case 'photo':
				details =  await env.photo.get(`${chain}:${drop}`);
				break;
			default:
				return new Response(false);
		}
		// Validate whitelist is open
		let now = new Date(exactDate).getTime();
		let open = now < details.open;
		if (open) {
			// Add user address to whitelist
			let data = await env.whitelists.get(account);
			data[chain][drop] = appCheckToken;
			let registered = await env.whitelists.put(`allow:${}`);
			return new Response(registered);
		} else {
			return new Response(false);
		}
    } catch (err) {
		console.log('Error on drop registration', err);
       return new Response(false);
    }
});

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
