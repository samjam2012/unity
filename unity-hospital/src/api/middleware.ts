import { createProxyMiddleware } from "http-proxy-middleware";

export default (app: any) => {
  app.use(
    createProxyMiddleware("/api-users", {
      target: "http://localhost:8090/"
    })
  );
  app.use(
    createProxyMiddleware("/api-events", {
      target: "http://localhost:4433/"
    })
  );
};
