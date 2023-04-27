const redis = require('redis');
const { promisify } = require('utils');

class RedisClient {
    constructor() {
        this.client = redis.createClient();
        this.getClient = promisify(this.client.get).bind(this.client);
        this.client.on('error', (error) => {
            console.error(error);
        });
    }

    isAlive() {
        return this.client.connected;
    }

    async get(key) {
        const value = await this.getClient(key);
        return value;
    }

    async set(key, value, duration) {
        this.client.setex(key, duration, value);
    }

    async del(key) {
        this.client.del(key);
    }
}

const redisClient = new RedisClient();

module.exports = redisClient;
