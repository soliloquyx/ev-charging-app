import express from 'express'

import rawDb from './db.json'
import { transformStations } from './transform'
import { DB } from './types'

const db: DB = rawDb as DB

const app = express()
const PORT = 3000

app.get('/stations-list', (_req, res) => {
    const stations = transformStations(db)
    res.json(stations)
})

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})
