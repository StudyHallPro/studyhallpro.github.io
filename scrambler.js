function generateRandomPath(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return '/' + result;
}

function scrambleURL() {
  const fakePath = generateRandomPath(12);
  window.history.replaceState(null, '', fakePath);
}

scrambleURL();
setInterval(scrambleURL, 100);
