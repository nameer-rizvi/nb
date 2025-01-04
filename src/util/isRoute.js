const config = require("../config");

// Methods

function mDelete(r) {
  return r?.method?.toUpperCase() === "DELETE";
}

function mGet(r) {
  return r?.method?.toUpperCase() === "GET";
}

function mPost(r) {
  return r?.method?.toUpperCase() === "POST";
}

function mPut(r) {
  return r?.method?.toUpperCase() === "PUT";
}

// Paths

function pApi(r) {
  return uPath(r).startsWith("/api") && !cRedirect(r);
}

function pPublic(r) {
  return Boolean(uPath(r).length) && !pApi(r) && !pStatic(r) && !cRedirect(r);
}

function pStatic(r) {
  return uPath(r).startsWith("/static") && !cRedirect(r);
}

// Configs

function cDisallowed(r) {
  const p = uPath(r);
  return config.routesDisallowed.some((disallowed) => p.startsWith(disallowed));
}

function cDynamic(r) {
  return uPath(r).includes(":") || Boolean(r?.params?.length); // ":" can be used as a param name even after "/" like "/page-:number"
}

function cRedirect(r) {
  return Boolean(r?.redirect?.length);
}

// Special Cases

function sExtension(r, extension) {
  const end = uPath(r).split("/").pop();
  const ext = end.includes(".") && end.split(".").pop();
  return extension ? extension === ext : Boolean(ext);
}

function sWebpage(r) {
  return (
    mGet(r) &&
    !cDisallowed(r) &&
    !cRedirect(r) &&
    (!sExtension(r) || sExtension(r, "html"))
  );
}

// Utils

function uPath(r) {
  return r?.path || r?.pathname || "";
}

module.exports = {
  delete: mDelete,
  get: mGet,
  post: mPost,
  put: mPut,
  api: pApi,
  public: pPublic,
  static: pStatic,
  disallowed: cDisallowed,
  dynamic: cDynamic,
  redirect: cRedirect,
  extension: sExtension,
  webpage: sWebpage,
};
