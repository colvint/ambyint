## Ambyint Development Exercise

#### Features

- [Environmental Config](https://github.com/colvint/ambyint#config)
- Effective Google API rate limit [management](https://github.com/colvint/ambyint#challenges)
- Adjustable data location
- Adjustable API delay
- Verbose mode
- Yarn ready
- Chalk highlighted logs

#### Start Geocoding!

- `npm install`
- place your address.txt into the [data directory](https://github.com/colvint/ambyint/tree/master/data)
- `cp .env.example .env` (and configure the app -- see config description below)
- `npm start`

#### Run tests

- `npm test`

#### Config

A [`.env.example` config file](https://github.com/colvint/ambyint/blob/master/.env.example) has been included to allow easy adjustment of key variables affecting geocoding. Copy this file to `.env` and set your desired variables.

```
GOOGLE_MAPS_API_KEY=YOUR_API_KEY (note google billing must be enabled but doesn't require actual purchase)

GOOGLE_API_DELAY=1000 (the number of milliseconds required between geocoding requests)

ADDRESS_DATA_PATH=data/addresses.txt (the location of the fixed-width address data file)

VERBOSE_MODE=true (set to true if you wish to log progress to stdout)
```

#### Challenges

The main challenge was around Google's Geocoder API [rate limits](https://developers.google.com/maps/documentation/geocoding/usage-and-billing). The API imposes a limit of 5000 requests per 100 seconds. Running afoul of this limit results in `403` errors from the API. 

To get around this, the implementation uses the [npm library `line-by-line`](https://www.npmjs.com/package/line-by-line) which supports reliable pausing / resuming of a readable file stream. This allowed the injection of a delay between API requests which effectively resolves the issue.

#### Notes

- Built with node `v11.0.0`
- Mocha [tests](https://github.com/colvint/ambyint/tree/master/test)
- Uses ES6 syntax

#### Further Development

- With minor adjustments, a non-Google geocoding API can be snapped in. e.g. (`src/geocoders/smarty-streets`)
- It would be straightforward to stream address data from a remote source
