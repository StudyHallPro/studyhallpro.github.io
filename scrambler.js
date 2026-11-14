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
  try {
    window.history.replaceState(null, '', fakePath);
  } catch (e) {
    // Prevents script errors if Safari temporarily throttles updates
  }
}

// Run immediately when the page loads
scrambleURL();

// Cycle every 350ms to stay safely under Safari's 100-calls-per-30-seconds limit
setInterval(scrambleURL, 350);
