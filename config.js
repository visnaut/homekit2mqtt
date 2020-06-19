const path = require('path');
const config = require('yargs')
    .env('HOMEKIT2MQTT_ENV_PREFIX' in process.env ? process.env.NEST2MQTT_ENV_PREFIX : "HOMEKIT2MQTT")
    .usage('Usage: $0 [options]')
    .describe('v', 'possible values: "error", "warn", "info", "debug"')
    .describe('m', 'JSON file containing HomeKit Services to MQTT mapping definitions. See Readme.')
    .describe('n', 'instance name. used as prefix for connected topic')
    .describe('u', 'mqtt broker url.')
    .describe('s', 'directory to store homekit data')
    .describe('p', 'port homekit2mqtt is listening on')
    .describe('w', 'port webserver is listening on')
    .describe('x', 'disable webserver')
    .describe('disable-json-parse', 'disable json parsing of received mqtt payloads')
    .boolean('disable-json-parse')
    .describe('insecure', 'allow tls connections with invalid certificates')
    .boolean('insecure')
    .describe('retain', 'if set, ALL MQTT messages sent will have the retain flag set')
    .boolean('retain')
    .describe('h', 'show help')
    .alias({
        h: 'help',
        n: 'name',
        m: 'mapfile',
        u: 'url',
        v: 'verbosity',
        c: 'pincode',
        a: 'username',
        b: 'bridgename',
        p: 'port',
        s: 'storagedir',
        w: 'web-port',
        o: 'web-host',
        x: 'disable-web'
    })
    .default({
        c: '031-45-154',
        u: 'mqtt://127.0.0.1',
        n: 'homekit',
        m: path.join(__dirname, '/example-homekit2mqtt.json'),
        v: 'info',
        a: 'CC:22:3D:E3:CE:F6',
        b: 'MQTT Bridge',
        p: 51826,
        w: 51888,
        o: '0.0.0.0'
    })
    // .config('config')
    .version()
    .help('help')
    .check(argv => {
        if (!String(argv.username).match(/^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/)) {
            throw new Error('Error: Argument username has to be a colon separated 6 byte hex value xx:xx:xx:xx:xx:xx (format of a MAC address)');
        }
        if (!String(argv.pincode).match(/^\d{3}-\d{2}-\d{3}$/)) {
            throw new Error('Error: Argument pincode has to be a eight digit decimal number the format xxx-xx-xxx');
        }
        return true;
    })
    .argv;

module.exports = config;
