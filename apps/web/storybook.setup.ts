// Suppress MSW browser worker deserialization errors in Vitest browser environment.
// These occur when the service worker sends response messages for non-MSW requests
// (e.g. static assets) that lack the expected serialized request data.
globalThis.addEventListener('unhandledrejection', (event) => {
  if (
    event.reason instanceof TypeError &&
    event.reason.message.includes("Cannot read properties of undefined (reading 'url')")
  ) {
    event.preventDefault()
  }
})
