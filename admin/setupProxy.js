import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://staging-be.redooceit.com",
      changeOrigin: true,
      pathRewrite: { "^/api": "/api/v1" },
    })
  );
}
