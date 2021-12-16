import axios from 'axios'
import { Request, Response } from 'node-fetch';



export async function GetDirection(params: any) {
    console.log("request now is here")
    const key = process.env.MAP_QUEST_USER_KEY;
    const url = `http://www.mapquestapi.com/directions/v2/optimizedroute?key=${key}&json={"locations":${params}}`
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

}