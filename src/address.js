import fixy from 'fixy'
import { compact } from 'lodash'

import fieldMap from './field-map'

export default class Address {
  // pass the fixed width address
  // and the geocoder
  constructor(addressLine, options) {
    this.geoCoder = options.geoCoder
    // start off by parsing the address
    this.parsedAddress = this.parse(addressLine)
    this.isHighQuality = null
    this.coordinates = null
  }

  // lean on fixy to parse the fixed-width address
  // https://www.npmjs.com/package/fixy
  parse(addressLine) {
    return fixy.parse({
      map: fieldMap,
      options: {
        fullwidth: addressLine.length,
        skiplines: null
      }
    }, addressLine)[0]
  }

  // teach the address to render itself as a string
  // used in console.log and in the geocoder api call
  toString() {
    const {
      houseNumber,
      streetDirectionPrefix,
      streetName,
      streetSuffix,
      streetDirectionSuffix,
      unitDescriptor,
      unitNumber,
      city,
      state,
      zip
    } = this.parsedAddress

    return compact([
      houseNumber,
      streetDirectionPrefix,
      streetName,
      streetSuffix,
      streetDirectionSuffix,
      unitDescriptor,
      unitNumber,
      city,
      state,
      zip
    ]).join(' ')
  }

  // call the geocoder api
  async geocode() {
    try {
      const response = await this.geoCoder.geocode({ address: this.toString() }).asPromise()
      const { geometry: { location, location_type } } = response.json.results[0]

      // we define a "high-quality" address as one with only one result and of type ROOFTOP
      this.isHighQuality = location_type === 'ROOFTOP' && response.json.results.length === 1
      this.coordinates = location

      return response
    } catch(err) {
      this.geoCodingError = err

      return err
    }
  }
}