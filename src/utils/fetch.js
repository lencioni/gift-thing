function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function fetch(url, options = {}) {
  // Send cookies with fetch requests
  const fetchOptions = Object.assign({ credentials: 'same-origin' }, options);

  return window.fetch(url, fetchOptions)
    .then(checkStatus);
}
