const challengeModel = require('../model/challenge-model')
const jwt = require('jsonwebtoken')
const axios = require('axios').default

module.exports = {
    async getToken(request, response) {
        const payload_token = {
            user: '2care_health'
        }

        return response.status(200).send({
            ok: true,
            token: jwt.sign(payload_token, `${process.env.JWTKEY}`)
        })
    },
    async callMethod(request, response) {
        const { cep, data } = request.body

        const today = new Date()
        const parseDate = new Date(data)

        if(today > parseDate) return response.status(400).send({ok: false, error: 'invalid-date-should-be-future'})
        if(parseDate.getDate() > today.getDate() + 7) return response.status(400).send({ok: false, error: 'should-be-7-days-limit'})

        if(!cep || !data) return response.status(400).send({ok: false, error: 'cep-data-is-required'})

        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => {
            if(res.data.erro) return response.status(400).send({ok: false, error: 'invalid-cep'})

            const city = res.data;
            axios(`http://apiadvisor.climatempo.com.br/api/v1/locale/city?country=BR&token=${process.env.CLIMATEMPO}`)
            .then(list => {
                if(list.error) return response.status(400).send({ok: false, error: list.detail})

                const returnedCity = list.data.filter(c => {
                    if(c.name === city.localidade) return c
                })

                if(returnedCity.length === 0) return response.status(400).send({ok: false, error: 'city-not-found'})

                axios(`http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/${returnedCity[0].id}/days/15?token=${process.env.CLIMATEMPO}`)
                .then(forecast => {
                    if(forecast.error) return response.send({ok: false, error: forecast.defail})

                    const parseString = `${parseDate.getFullYear()}-${('0' + (parseDate.getMonth() + 1)).slice(-2)}-${('0' + parseDate.getDate()).slice(-2)}`

                    const forecastFiltered = forecast.data.data.filter(d => {
                        if (d.date === parseString) return d
                    })

                    if(forecastFiltered.length === 0) return response.status(400).send({ok: false, error: 'forecast-not-found'})

                    challengeModel.findOne({
                        localeId: returnedCity[0].id,
                        date: parseString
                    }, async (err, challenge) => {
                        if(err) return response.status(500).send(err)
                        if(challenge) {
                            challengeModel.findOneAndUpdate({
                                '_id.localeId': returnedCity[0].id,
                                '_id.date': parseString
                            }, {
                                content: forecastFiltered[0]
                            }, {
                                new: true
                            }, (err, uptChallenge) => {
                                if(err) return response.status(500).send(err)
                                if(!uptChallenge) return response.status(400).send({ok: false, error: 'cannot-update-entity'})

                                return response.status(200).send({ok: true, uptChallenge})
                            })
                        } else {
                            challengeModel.create({
                                _id: {
                                    localeId: returnedCity[0].id,
                                    date: parseString
                                }, 
                                content: forecastFiltered[0]
                            }, (err, created) => {
                                if(err) return response.status(500).send(err)
                                if(!created) return response.status(400).send({ok: true, error: 'cannot-create-entity' })
    
                                return response.status(200).send({ok: true, created})
                            })
                        }
                    })
                }).catch(error => {
                    return response.status(400).send(error)
                })
            }).catch(error => {
                return response.status(400).send(error)
            })
        }).catch(error => {
            return response.status(400).send(error)
        })
    }
}