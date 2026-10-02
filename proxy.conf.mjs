const port = process.env.API_PORT ?? '3000';

export default {
  '/api': {
    target: `http://localhost:${port}`,
    pathRewrite: { '^/api': '' },
  },
};
