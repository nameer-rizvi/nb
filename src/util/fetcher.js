const utils = require("@nameer/utils");
const log = require("./log");
const delay = require("./delay");
const rateLimitMap = new Map();

async function fetcher(urlString, option = {}) {
  const {
    query,
    data,
    retry = 2,
    rateLimit = [],
    timeoutLimit = 30000,
    parser = "json",
    throwError = true,
    ...req
  } = option;

  const url = new URL(urlString);

  if (query) url.search = new URLSearchParams(query);

  const contentType =
    req.headers?.["Content-Type"] || req.headers?.["content-type"];

  if (contentType === "application/x-www-form-urlencoded") {
    req.body = new URLSearchParams(data || {});
  } else if (utils.isJson(data)) {
    req.body = JSON.stringify(data);
  }

  let attempt = 1;

  const response = {};

  while (attempt <= retry) {
    if (rateLimit.length === 2) {
      const [maxRequests, windowMs] = rateLimit;

      const requestInterval = windowMs / maxRequests;

      const now = Date.now();

      for (const [hostname, lastRequestTime] of rateLimitMap) {
        if (now - lastRequestTime >= requestInterval) {
          rateLimitMap.delete(hostname);
        }
      }

      const lastRequestTime = rateLimitMap.get(url.hostname) || 0;

      const timeSinceLastRequest = now - lastRequestTime;

      if (timeSinceLastRequest < requestInterval) {
        await delay(requestInterval - timeSinceLastRequest);
      }

      rateLimitMap.set(url.hostname, now);
    }

    const controller = new AbortController();

    const tag = attempt === 1 ? url.hostname : `${url.hostname}#${attempt}`;

    const timeout = setTimeout(() => {
      log.fetch(`request aborted ("${tag}")`, "warn");
      controller.abort();
    }, timeoutLimit);

    try {
      log.fetch(`request sent ("${tag}")`);

      const res = await fetch(url, { signal: controller.signal, ...req });

      response.status = res.status;

      if (res.ok) {
        response.data = await res[parser]();

        response.error = null;

        log.fetch(`response received ("${tag}")`);

        break; // Break out of the retry loop.
      }

      const errorText = await res.text();

      const errorJson = utils.parseJson(errorText) || {};

      let error =
        parseError(errorJson) ||
        errorJson.errors?.map(parseError).join("; ") ||
        errorText;

      if (
        !error ||
        error.includes("<html") ||
        error.includes("<!DOCTYPE") ||
        error === "{}"
      ) {
        error = res.statusText || String(res.status);
      }

      if (utils.isString(error)) {
        error = utils.cleanString(error);
      }

      throw new Error(error);
    } catch (error) {
      log.fetch(error, "error");

      response.error = String(error);

      attempt++;
    } finally {
      clearTimeout(timeout);
    }
  }

  if (response.error && throwError === true) throw new Error(response.error);

  return response;
}

function parseError(error = {}) {
  if (utils.isString(error)) {
    return error;
  } else if (utils.isObject(error)) {
    const errors = [];
    for (const key of [
      "error",
      "message",
      "status",
      "description",
      "detail",
      "error_message",
      "error_status",
      "error_description",
      "error_detail",
    ])
      if (error[key]) errors.push(error[key]);
    return errors.join("; ");
  }
}

module.exports = fetcher;
