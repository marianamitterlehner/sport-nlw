import express, { response } from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client'

import { convertHoursMinutes } from './utils/convert-hours-minutes';
import { convertMinutesHours } from './utils/convert-minutes-hours';


const app = express();
app.use(express.json());
const prisma = new PrismaClient({
    log: ['query']
});

app.use(cors());


//pegar os jogos
app.get('/games', async (request, response) => {

    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    })

    return response.json(games);
});

//criar um anuncio
app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body = request.body;

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHoursMinutes(body.hourStart),
            hourEnd: convertHoursMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    })

    return response.status(201).json(ad);
})


//pegar o anuncio de cada game
app.get('/games/:id/ads', async (request, response) => {

    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where: {
            gameId: gameId
        },
        orderBy: {
            createdAt: 'desc',
        }
    })

    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesHours(ad.hourStart),
            hourEnd: convertMinutesHours(ad.hourEnd)
        }
    }))
})

//pegar o discord
app.get('/ads/:id/discord', async (request, response) => {

    const adId = request.params.id;
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    })

    return response.json({
        discord: ad.discord
    })
})

app.listen(3000);