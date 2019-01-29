async function handler(request) {
  return request.auth.credentials.roles;
}

module.exports = {
  handler,
};
