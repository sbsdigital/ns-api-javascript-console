const msal = require('@azure/msal-node');

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL Node configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/configuration.md 
 */
const msalConfig = {
	auth: {
		clientId: '7430531e-8ce8-4eaf-ac9b-c4e83aba04ac',
		authority: process.env.AAD_ENDPOINT + 'fa07cb78-c80f-48b3-b560-7d4f6d566228',
		clientSecret: process.env.CLIENT_SECRET,
	}
};

/**
 * With client credentials flows permissions need to be granted in the portal by a tenant administrator.
 * The scope is always in the format '<resource>/.default'. For more, visit: 
 * https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow 
 */
const tokenRequest = {
	scopes: ['api://dedb5554-7c2d-4cc1-9fb4-514315a4387c/.default'],
};

const apiConfig = {
	uri: 'https://sit.sbs.digital/api/cim17/9/MeterReadings2/get',
};

/**
 * Initialize a confidential client application. For more info, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/initialize-confidential-client-application.md
 */
const cca = new msal.ConfidentialClientApplication(msalConfig);

/**
 * Acquires token with client credentials.
 * @param {object} tokenRequest 
 */
async function getToken(tokenRequest) {
	return await cca.acquireTokenByClientCredential(tokenRequest);
}

module.exports = {
	apiConfig: apiConfig,
	tokenRequest: tokenRequest,
	getToken: getToken
};
