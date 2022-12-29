const date = require('date-fns')
// const{format} = reuire('date-fns')
const uuid = require('uuid')
// const {v4 : uuid} = require('uuid')
const fs = require('fs')
const path = require('path')


const createLogItem = (message) => {
    const dateTime = `${date.format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    return `${uuid.v4()}\t${dateTime}\t${message}\n`
}

const saveLogItem = (logItem) => {
    if(!fs.existsSync(path.join(__dirname, 'logs'))){
        fs.mkdir(path.join(__dirname, 'logs'), (err) => {
            if(err) console.error(err)
        })
    }

    fs.appendFile(path.join(__dirname, 'logs', 'log-events.txt'), 
    logItem, (err) => {
        if(err) console.error(err)
    })
}

const logEvent = (message) => saveLogItem(createLogItem(message))

module.exports = {logEvent}
// logEvents("Interesting Loki")