require("cross-fetch/polyfill");
const simpul = require("simpul");
const delay = require("./delay");
const log = require("./log");
const rateLimitMap = new Map();

async function fetcher(url, option = {}) {
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

  url = new URL(url);

  if (query) url.search = new URLSearchParams(query);

  const contentType = req.headers?.["Content-Type"];

  if (contentType === "application/x-www-form-urlencoded") {
    req.body = new URLSearchParams(data || {});
  } else if (simpul.isJSON(data)) {
    req.body = JSON.stringify(data);
  }

  let attempt = 1;

  const response = {};

  while (attempt <= retry) {
    if (rateLimit.length === 2) {
      const lastRequestTime = rateLimitMap.get(url.hostname) || 0;

      const timeSinceLastRequest = Date.now() - lastRequestTime;

      const requestInterval = rateLimit[1] / rateLimit[0];

      if (timeSinceLastRequest < requestInterval) {
        await delay(requestInterval - timeSinceLastRequest);
      }

      rateLimitMap.set(url.hostname, Date.now());
    }

    const controller = new AbortController();

    const timeout = setTimeout(function onTimeout() {
      log.fetch(`request aborted ("${url.hostname}")`, "warn");
      controller.abort();
    }, timeoutLimit);

    try {
      if (attempt === 1) {
        log.fetch(`request sent ("${url.hostname}")`);
      } else {
        log.fetch(`request sent ("${url.hostname}#${attempt}")`);
      }

      const res = await fetch(url, { signal: controller.signal, ...req });

      response.status = res.status;

      if (res.ok) {
        response.data = await res[parser]();

        if (attempt === 1) {
          log.fetch(`response received ("${url.hostname}")`);
        } else {
          log.fetch(`response received ("${url.hostname}#${attempt}")`);
        }

        response.error = null;

        break; // Break out of the retry loop.
      } else {
        const errorText = await res.text();

        const errorJson = simpul.parsejson(errorText) || {};

        let error =
          parseError(errorJson) ||
          errorJson.errors?.map(parseError).join("; ") ||
          errorText;

        if (!error || error.includes("<html") || error.includes("<!DOCTYPE")) {
          error = res.statusText || res.status?.toString();
        }

        if (simpul.isString(error)) {
          error = simpul.cleanstring(error);
        }

        throw new Error(error);
      }
    } catch (error) {
      log.fetch(error, "error");

      response.error = error.toString();

      attempt++;
    } finally {
      clearTimeout(timeout);
    }
  }

  if (response.error && throwError) throw new Error(response.error);

  return response;
}

function parseError(error = {}) {
  if (simpul.isString(error)) {
    return error;
  } else if (simpul.isObject(error)) {
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
