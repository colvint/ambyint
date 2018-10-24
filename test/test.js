import '@babel/polyfill'

import assert from 'assert'

import Address from '../src/address'

describe('Address', function () {
  const fixedWidthAddress = '346                             SUMMER                                  LN                    MAPLEWOOD                     MN55117       '
  const address = new Address(fixedWidthAddress, { geoCoder: {} })

  describe('#parse()', function () {
    it('should resolve the houseNumber', function () {
      assert.equal(address.parsedAddress.houseNumber, '346')
    })

    it('should resolve the streetName', function () {
      assert.equal(address.parsedAddress.streetName, 'SUMMER')
    })

    it('should resolve the streetSuffix', function () {
      assert.equal(address.parsedAddress.streetSuffix, 'LN')
    })

    it('should resolve the city', function () {
      assert.equal(address.parsedAddress.city, 'MAPLEWOOD')
    })

    it('should resolve the state', function () {
      assert.equal(address.parsedAddress.state, 'MN')
    })

    it('should resolve the zip', function () {
      assert.equal(address.parsedAddress.zip, '55117')
    })
  })

  describe('#toString()', function () {
    it('should output the address as a string', function () {
      assert.equal(address.toString(), '346 SUMMER LN MAPLEWOOD MN 55117')
    })
  })
})
