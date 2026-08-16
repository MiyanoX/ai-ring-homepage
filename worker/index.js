export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");
    const redirectsUnknownHtmlToRoot =
      response.status === 307 && response.headers.get("location") === "/";

    if (
      (response.status !== 404 && !redirectsUnknownHtmlToRoot) ||
      !acceptsHtml ||
      !["GET", "HEAD"].includes(request.method)
    ) {
      return response;
    }

    const appShellUrl = new URL(request.url);
    appShellUrl.pathname = "/";
    appShellUrl.search = "";
    return env.ASSETS.fetch(new Request(appShellUrl, request));
  },
};
