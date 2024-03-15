export async function loadConfig() {
  const data = await import('../dummy.config.js')
  return data;
}