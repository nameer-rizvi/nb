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
  return uPath(r).length > 0 && !pApi(r) && !pStatic(r) && !cRedirect(r);
}

function pStatic(r) {
  return uPath(r).startsWith("/static") && !cRedirect(r);
}

// Configs

function cDisallowed(r) {
  const p = uPath(r);
  for (const disallowed of config.routesDisallowed)
    if (p.startsWith(disallowed)) return true;
  return false;
}

function cDynamic(r) {
  return uPath(r).includes(":") || r?.params?.length > 0; // ":" can be used as a param name even after "/" like "/page-:number"
}

function cRedirect(r) {
  return r?.redirect?.length > 0;
}

// Special Cases

function sExtension(r) {
  const end = uPath(r).split("/").pop();
  if (!end.includes(".")) return false;
  return end.split(".").pop();
}

function sWebpage(r) {
  const ext = sExtension(r);
  return (
    mGet(r) && !cDisallowed(r) && !cRedirect(r) && (!ext || ext === "html")
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
