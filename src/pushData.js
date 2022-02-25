const { initializeApp } = require('firebase/app')
const { getDatabase, ref, set, push, enableLogging } = require("firebase/database")

require('dotenv').config()

const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    databaseURL: process.env.FB_DB_DATABASE_URL,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.FB_APP_ID
}

initializeApp(firebaseConfig)

let database = getDatabase()

async function pushData(obj) {
    set(push(ref(database, 'datapoints/')), obj)
}

module.exports = pushData