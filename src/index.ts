
import http from 'http'
import 'dotenv/config'
import { RingApi } from 'ring-client-api'
//import { skip } from 'rxjs/operators'
//import { readFile, writeFile } from 'fs'
//import { promisify } from 'util'

const hostname:string = '0.0.0.0';
const port:number = 4000;
const server = http.createServer((req: any, res: any) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	const url:any = req.url
	const myUrl = new URL(url, 'http://0.0.0.0:4000')
	const searchParams = myUrl.searchParams
	const myBib = searchParams.get("bid");
	const MyRefreshToken:string = process.env.REFRESH_TOKEN ?? ""
	//console.log("Refresh Token:", MyRefreshToken);


	async function DoorBell(bellId:any) {
		const { env } = process,
		ringApi = new RingApi({
			refreshToken : MyRefreshToken,
			debug: true,
		}),
		locations = await ringApi.getLocations();
		
		for (const location of locations) {
			//const devices = await location.getDevices()         
			const Chimes = location.chimes
			let count = 0
			for (const Chime of Chimes) {
				console.log(`Chime name: ${Chime.name}. ID: ${Chime.id}`)

				if (Chime.id == bellId) {
					//const newRingtone = await Chime.getRingtoneByDescription('Triangle', 'ding')
					Chime.setVolume(2)
					console.log(Chime.name)
					await Chime.playSound('ding')
					count++
					res.end('Hello! Its ' + Chime.name); 
				}
			}

			if (count === 0) {
				res.end('Doorbell not found')
			}
		
		}
	}
  
	switch (myUrl.pathname) {
		case '/doorbell':
			DoorBell(myBib).catch((e: any) => {
				console.error('Example threw an error:', e)
			})
		break;

		default:
			res.end('404 not found')
	}
});

server.listen(port, hostname, () => {
	console.log(
		'Server running'
	)
});