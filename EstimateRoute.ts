import axios from 'axios'
import { Request, Response } from 'node-fetch';



export async function GetDirection(req: Request, res: Response) {
    console.log("request now is here")
    const key = "Byx5OzTCURc6o90ZccmVAyR6ZcSRCNka";
    const body = {
        "locations": [
            "Denver, CO",
            "Westminster, CO",
            "Boulder, CO"
        ],
        "options": {
            "allToAll": true
        }
    }
/*     const coordinates = [[
        34.0426752,
        5.0102272],[
        34.0899780,
        64.0899829    
        ]
    ]; */
    const coordinates = { "locations": ["Denver,CO", "Westminster,CO", "Boulder,CO"] }
    // ?coordinates=-117.17282,32.71204;-117.17288,32.71225?access_token=${key}
    const url = `http://www.mapquestapi.com/directions/v2/optimizedroute?key=JjNSyq9PNgTGeUAfJBNqz9hS8SATLfJ6&json={"locations":["34.0426752,5.0102272","35.0899780,5.0102272 "]}`
    let data;
    try {
        data = await axios.get(url)
            .then(data => {
            console.log({reso : data.data});
            return data;
        })
    } catch (err) {
        console.log(err);
    }
    const rsl = data?.data
    console.log({results:rsl.route.locations});
    return ({data : rsl});
/*     {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),

        } */
}