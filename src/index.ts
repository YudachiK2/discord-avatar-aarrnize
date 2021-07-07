'use strict'
import express from 'express'
import axios from 'axios'
import fileType from 'file-type'
import canvas from 'canvas'

const GIF = require('gif.node')

const PORT = process.env.PORT || 3000

Promise.all([
    '9l03drB.png',
    '3FYaLnV.png',
    'Yr7oux9.png',
    'Yzs2oRa.png',
    'j87lmeC.png',
    'p4GOTwS.png',
    'J71JiaT.png',
    '5qVvm93.png',
    'Pslq7Fg.png',
    'pWZveSy.png',
    'uSFN4Ds.png',
    'u44vDX9.png',
    'vVI4At0.png',
    'TyrbySp.png',
    '6xVH4Il.png',
    'Ogphmd6.png',
    'Etk577o.png',
    'gTxgdRL.png',
    'K1HNupK.png',
    '4cMBBjt.png',
    'gcZzO8q.png',
    'fze1UWK.png',
    'DKudT4R.png',
    'OxNZRlD.png',
    '5weN7lB.png'
].map(v => new Promise((resolve, reject) => {
    axios({
        url: `https://i.imgur.com/${v}`,
        method: 'get',
        responseType: 'arraybuffer'
    }).then(res => {
        fileType.fromBuffer(res.data)
            .then(fileInfo => {
                if (fileInfo === void 0) {
                    throw new TypeError()
                }

                const img = new canvas.Image
                img.onload = () => resolve(img)
                img.onerror = e => reject(e)
                img.src = `data:${fileInfo.mime};base64,${res.data.toString('base64')}`
            })
            .catch(e => reject(e))
    }).catch(e => reject(e))
})))
    .then(imgs => {

        const app = express()

        app.use(express.json())

        app.get('/', (req, res) => void res.sendStatus(405))
        app.post('/', async (req, res) => {
            const type = req.headers['content-type']

            if (type !== 'application/json') {
                res.sendStatus(400)
                return
            }

            const { image }: { image: string } = req.body

            if (typeof image !== 'string' || image.length === 0) {
                res.sendStatus(400)
                return
            }
            try {
                const imgRes = await axios({
                    url: image,
                    method: 'get',
                    responseType: 'arraybuffer'
                })

                const { mime } = await fileType.fromBuffer(imgRes.data) || {}

                if (typeof mime !== 'string' || mime.split('/')[0] !== 'image') {
                    res.sendStatus(400)
                    return
                }

                const gifBuf = await new Promise((resolve, reject) => {
                    const avatarImg = new canvas.Image
                    avatarImg.onerror = e => reject(e)
                    avatarImg.onload = () => {
                        const cv = new canvas.Canvas(256, 256),
                            ctx = cv.getContext('2d')
                        ctx.drawImage(avatarImg, 0, 0, 256, 256)
                        const imgData = ctx.getImageData(0, 0, cv.width, cv.height),
                            { data } = imgData
                        for (let i = 0; i < data.length; i += 4) {
                            const grayscale = data[i] * .3 + data[i + 1] * .59 + data[i + 2] * .11
                            data[i] = grayscale
                            data[i + 1] = grayscale
                            data[i + 2] = grayscale
                            data[i + 3] = 255
                        }
                        ctx.putImageData(imgData, 0, 0)

                        const resImg = new canvas.Image
                        resImg.onerror = reject
                        resImg.onload = async () => {
                            const gif = new GIF
                            gif.on('finished', (buf: Buffer) => resolve(buf))
                            const cv = new canvas.Canvas(resImg.naturalWidth, resImg.naturalHeight),
                                ctx = cv.getContext('2d')
                            for (const imgOne of imgs) {
                                ctx.clearRect(0, 0, cv.width, cv.height)
                                ctx.drawImage(resImg, 0, 0)
                                ctx.drawImage(imgOne, 0, 0)
                                gif.addFrame(ctx.getImageData(0, 0, cv.width, cv.height), { delay: 1 })
                            }
                            gif.render()
                        }
                        resImg.src = cv.toDataURL('image/png')
                    }
                    console.log(mime)
                    avatarImg.src = `data:${mime};base64,${imgRes.data}`
                })
                res.set('Content-Type', 'image/gif')
                res.send(gifBuf)

            } catch (e) {
                console.error('ERROR', e)
                res.sendStatus(400)
            }
        })

        app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}`))


    })
    .catch(e => console.error('FOR', e))