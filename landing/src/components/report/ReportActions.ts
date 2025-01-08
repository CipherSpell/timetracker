'use server'

export const getFocusDetails = async () => {
  try {
    const backendHost = process.env.BACKEND_HOST || 'http://backend:8080'
    //TODO: make API call to backend to fetch report data
    await fetch(`${backendHost}`)
  } catch (e) {
    console.log(e)
  }
}
