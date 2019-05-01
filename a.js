window.addEventListener('message', (event) => {
  if (event.data.type === 'tutorial') {
    console.log(event.data.message)
  }
})