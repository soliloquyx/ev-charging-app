import express from 'express'
import fs from 'fs'

import rawDb from './db.json'
import { transformChargingSession, transformStationInfo, transformStations } from './transform'
import { ChargingSession, DB } from './types'
import { Dto } from '../shared'

const db: DB = rawDb as DB

const app = express()
const PORT = 3000

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})

app.get('/stations-list', (_req, res: express.Response<Dto.Station[]>) => {
    const stations = transformStations(db)
    res.json(stations)
})

app.get(
    '/station-info/:id',
    (
        req: express.Request<{ id: string }>,
        res: express.Response<Dto.StationInfo | { error: string }>
    ) => {
        const stationId = Number(req.params.id)

        const stationInfo = transformStationInfo(db, stationId)

        if (!stationInfo) return res.status(404).json({ error: 'Station not found' })

        res.json(stationInfo)
    }
)

app.post(
    '/charging-sessions',
    (
        req: express.Request<{}, {}, Dto.NewChargingSession>,
        res: express.Response<Dto.ChargingSession | { error: string }>
    ) => {
        const newSession = req.body

        const nextId = db.chargingSessions.length + 1

        const sessionToSave: ChargingSession = {
            ...newSession,
            id: nextId,
        }

        db.chargingSessions.push(sessionToSave)

        fs.writeFile('./db.json', JSON.stringify(db, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save session' })
            }
        })

        const response = transformChargingSession(db, sessionToSave)

        res.status(201).json(response)
    }
)

app.get(
    '/charging-sessions/latest',
    (_req: express.Request, res: express.Response<Dto.ChargingSession | { error: string }>) => {
        const sessions = db.chargingSessions

        if (!sessions.length) {
            return res.status(404).json({ error: 'No charging sessions found' })
        }

        const latest = sessions[sessions.length - 1]!

        const response = transformChargingSession(db, latest)

        res.json(response)
    }
)
