export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.slice(1);

    // Create a link: /new?url=https://example.com&code=abc
    if (path === "new") {
      const target = url.searchParams.get("url");
      if (!target || !/^https?:\/\//.test(target)) {
        return new Response("Give me a valid ?url=https://...\n", { status: 400 });
      }
      const code = url.searchParams.get("code") || Math.random().toString(36).slice(2, 8);
      await env.LINKS.put(code, target);
      return new Response(`Short link: ${url.origin}/${code}\n`);
    }

    if (!path) {
      return new Response("URL shortener. Try /new?url=https://example.com\n");
    }

    // Look up a short code and redirect
    const target = await env.LINKS.get(path);
    if (!target) return new Response("Not found\n", { status: 404 });
    return Response.redirect(target, 302);
  },
};
