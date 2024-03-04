export const configLoader = () => {
  return {
    REDIS_TTL: process.env.REDIS_TTL,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  };
};
