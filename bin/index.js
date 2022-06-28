#!/usr/bin/env node

// read in env settings
require('dotenv').config();

const yargs = require('yargs');

const fetch = require('./fetch');
const auth = require('./auth');

const options = yargs
    .usage('Usage: --op <operation_name>')
    .option('op', { alias: 'operation', describe: 'operation name', type: 'string', demandOption: true })
    .argv;

const meterReadingsArgs = '{\"reading\":[{\"reason\":\"billing\",\"reasonSpecified\":false,\"timePeriod\":{\"end\":\"2022-06-02T00:00:00\",\"endSpecified\":true,\"start\":\"2022-05-26T00:00:00\",\"startSpecified\":true}}],\"readingQuality\":[],\"readingType\":[{\"mRID\":\"0.0.5.4.1.1.12.0.0.0.0.0.0.0.0.3.72.0\"}],\"usagePoint\":[{\"mRID\":\"43d01f47-12fe-4bf1-baaa-11780d4e2bec\"}]}';

async function main() {
    console.log(`You have selected the following : ${options.op}`);

    switch (yargs.argv['op']) {
        case 'getUsers':

            try {
                const authResponse = await auth.getToken(auth.tokenRequest);
                const users = await fetch.callApi(auth.apiConfig.uri, authResponse.accessToken);
                console.log(users);
            } catch (error) {
                console.log(error);
            }

            break;
        case 'getMeterReadings':
            try {
                const authResponse = await auth.getToken(auth.tokenRequest);
                const readings = await fetch.callPostApi(auth.apiConfig.uri, meterReadingsArgs, authResponse.accessToken);
                console.log(readings);
            } catch (error) {
                console.log(error);
            }

            break;
        default:
            console.log('Select a Graph operation first');
            break;
    }
};

main();