function addChoiceToLog (input, type) {
  const currentdate = new Date()
  const datetime = currentdate.getDate() + '/' +
              (currentdate.getMonth() + 1) + '/' +
              currentdate.getFullYear() + ' @ ' +
              currentdate.getHours() + ':' +
              currentdate.getMinutes() + ':' +
              currentdate.getSeconds() + ' IST'
  const log = { input: input, date: datetime }
  const URL = 'http://localhost:9001/log/' + type
  try {
    axios.post(URL, log)
      .then(response => {
        if (response.data.status === 1) {
          console.log('log added')
        } else {
          console.log('An error occured, try again :(')
        }
      })
  } catch (e) {
    console.log('Error is ' + e)
  }
}
