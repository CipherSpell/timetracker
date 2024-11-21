'use server'

export const startTimer = async () => {
  try {
    const backendHost = process.env.BACKEND_HOST || 'http://backend:8080'
    await fetch(`${backendHost}/timers/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (e) {
    console.log(e)
  }
}

export const stopTimer = async () => {
  console.log('timer stopped false')
  try {
    const backendHost = process.env.BACKEND_HOST || 'http://backend:8080'
    await fetch(`${backendHost}/timers/stop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (e) {
    console.log(e)
  }
}

export const pauseTimer = async () => {
  try {
    const backendHost = process.env.BACKEND_HOST || 'http://backend:8080'
    await fetch(`${backendHost}/timers/pause`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (e) {
    console.log(e)
  }
}
