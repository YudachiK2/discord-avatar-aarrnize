'use strict'
import express from 'express'
import axios from 'axios'
import fileType from 'file-type'
import canvas from 'canvas'

const PORT = process.env.PORT || 3000

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
            responseType: 'stream'
        })

        const { mime } = await fileType.fromStream(imgRes.data) || {}

        if (typeof mime !== 'string' || mime.split('/')[0] !== 'image') {
            res.sendStatus(400)
            return
        }

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
        ].map(v => new Promise((reject, resolve) => {
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
                console.log(imgs)
            })
            .catch(e => console.error(e))
    } catch (e) {
        console.error(e)
        res.sendStatus(400)
    }
})

const listener = app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}`))