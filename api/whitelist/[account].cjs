const { Redis } = require("@upstash/redis");

// Get an accounts whitelist status
export default function handler(request, response) {
  /**
   * Redis.fromEnv() will read the following from environment variables:
   * - UPSTASH_REDIS_REST_URL
   * - UPSTASH_REDIS_REST_TOKEN
   */
  const redis = Redis.fromEnv();
  await redis.set("foo", "bar");
  const whitelisted = await redis.get(req.account);

  return response.send({ body: `whitelisted: ${whitelisted}` });
  
};