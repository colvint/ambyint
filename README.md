## Ambyint Development Exercise

#### Notes

- Built with node `v10.8.0`
- `npm install`
- `npm start`
- `npm test`

#### Config

A `.env.example` config file has been included to allow easy adjustment of key variables affecting geocoding. Copy this file to `.env` and set your desired variables.

```
GOOGLE_MAPS_API_KEY=YOUR_API_KEY (note google billing must be enabled but doesn't require actual purchase)

GOOGLE_API_DELAY=1000 (the number of milliseconds required between geocoding requests)

ADDRESS_DATA_PATH=data/addresses.txt (the location of the fixed-width address data file)

VERBOSE_MODE=true (set to true if you wish to log progress to stdout)
```

#### Challenges

The main challenges were around Google Geocoder API rate limits. The API imposes a limit of 5000 requests per 100 seconds. To avoid exceeding this limit, this implementation uses npm library `line-by-line` which supports reliable pausing and resuming of reading from a file stream. This, combined with the injection of a delay between API requests, effectively manages [Google's API rate limits](https://developers.google.com/maps/documentation/geocoding/usage-and-billing).