/* SE/SA Performance Hub Mock API */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = {
  "kpis": [
    {
      "name": "Win Rate",
      "value": 0.31
    },
    {
      "name": "Pipeline",
      "value": 750000
    },
    {
      "name": "Meetings",
      "value": 12
    }
  ],
  "opps": [
    {
      "id": "OPP-1",
      "name": "Zip World",
      "stage": "Discovery"
    },
    {
      "id": "OPP-2",
      "name": "JumpYard",
      "stage": "Proposal"
    }
  ],
  "notes": [
    {
      "id": "N-1",
      "text": "Kickoff next week"
    }
  ],
  "jobs": [
    {
      "id": "J-1",
      "title": "Inspect gate A",
      "status": "queued"
    }
  ],
  "devices": [
    {
      "id": "D-1",
      "type": "RFID",
      "alive": true
    },
    {
      "id": "D-2",
      "type": "Locker",
      "alive": false
    }
  ],
  "heartbeats": [
    {
      "deviceId": "D-1",
      "ts": 1234567890
    },
    {
      "deviceId": "D-2",
      "ts": 1234567800
    }
  ],
  "resources": [
    {
      "id": "R-1",
      "name": "Room A",
      "capacity": 6
    },
    {
      "id": "R-2",
      "name": "Room B",
      "capacity": 8
    }
  ],
  "availability": [
    {
      "resourceId": "R-1",
      "slot": "10:00",
      "available": true
    },
    {
      "resourceId": "R-1",
      "slot": "11:00",
      "available": false
    }
  ],
  "methods": [
    {
      "id": "adyen_card",
      "label": "Card"
    },
    {
      "id": "amazon_pay",
      "label": "Amazon Pay"
    }
  ],
  "venues": [
    {
      "id": "V-1",
      "name": "HQ"
    },
    {
      "id": "V-2",
      "name": "Park West"
    }
  ],
  "events": [
    {
      "id": "E-1",
      "type": "checkin",
      "venueId": "V-1"
    }
  ],
  "summary": {
    "events": 1024,
    "users": 87,
    "errors": 3
  },
  "assets": [
    {
      "id": "A-1",
      "name": "intro.mp4",
      "url": "https://cdn.example/intro.mp4"
    }
  ],
  "runbooks": [
    {
      "id": "RB-1",
      "title": "Restart Kiosk"
    },
    {
      "id": "RB-2",
      "title": "Refund Flow"
    }
  ]
};

app.get('/api/kpis', (req,res)=>{ res.json(db.kpis); });
app.get('/api/opps', (req,res)=>{ res.json(db.opps); });
app.post('/api/notes', (req,res)=>{ db.notes.push({ id: 'N-' + (db.notes.length+1), ...req.body }); res.json({ok:true}); });

app.get('/', (req,res)=>res.json({ name: "SE/SA Performance Hub API", ok:true }));



const port = 4101;
app.listen(port, ()=>console.log("API listening on http://localhost:"+port));
