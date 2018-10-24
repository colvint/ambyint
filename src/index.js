import 'dotenv/config'

import LineByLineReader from 'line-by-line'
import util from 'util'
import chalk from 'chalk'

import Address from './address'
import googleMapsClient from './geocoders/google'

const setTimeoutPromise = util.promisify(setTimeout)

// stream in the file line-by-line to conserve RAM
const lr = new LineByLineReader(process.env.ADDRESS_DATA_PATH)

console.log(`Geocoding 1 address every ${process.env.GOOGLE_API_DELAY / 1000} seconds using data in file ${process.env.ADDRESS_DATA_PATH}`)

lr.on('line', addressData => {
  lr.pause() // pause the stream to avoid tripping geocoding service rate limits

  return setTimeoutPromise(process.env.GOOGLE_API_DELAY, new Address(addressData, { geoCoder: googleMapsClient }))
    .then(async address => {
        await address.geocode()

        if (address.geoCodingError && process.env.VERBOSE_MODE) {
          console.error(chalk.red(`Error geocoding ${address} ${address.geoCodingError}`))
        } else {
          if (address.isHighQuality) {
            console.log(chalk.blue(address), 'geocoded to', chalk.bold('LAT:'), chalk.green(address.coordinates.lat), chalk.bold('LNG:'), chalk.green(address.coordinates.lng))
          }
        }

        lr.resume()
      })
})

lr.on('end', () => {
  console.log('Done geocoding!')
})
