import fixy from 'fixy'
import { compact } from 'lodash'

import fieldMap from './field-map'

export default class Address {
  constructor(addressLine, options) {
    this.geoCoder = options.geoCoder
    this.parsedAddress = this.parse(addressLine)
    this.isHighQuality = null
    this.coordinates = null
  }

  parse(addressLine) {
    return fixy.parse({
      map: fieldMap,
      options: {
        fullwidth: addressLine.length,
        skiplines: null
      }
    }, addressLine)[0]
  }

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

  async geocode() {
    try {
      const response = await this.geoCoder.geocode({ address: this.toString() }).asPromise()
      const { geometry: { location, location_type } } = response.json.results[0]

      this.isHighQuality = location_type === 'ROOFTOP' && response.json.results.length === 1
      this.coordinates = location

      return response
    } catch(err) {
      this.geoCodingError = err

      return err
    }
  }
}