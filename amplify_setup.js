import Analytics from '@aws-amplify/analytics';
import Auth from '@aws-amplify/auth';
import Credentials from './creds.js';

export const initializeAmplify = () => {
    const amplifyConfig = {
        identityPoolId: Credentials.identityPoolId,
        region: Credentials.region
    };

    const analyticsConfig = {
        AWSPinpoint: {
            // Amazon Pinpoint App Client ID
            appId: Credentials.appId,
            // Amazon service region
            region: Credentials.region,
            mandatorySignIn: false
        }
    };

    Auth.configure(amplifyConfig);
    Analytics.configure(analyticsConfig);
};

export const recordEvent = () => {
    Analytics.record({
        name: 'GeneratedTestEvent'
    });
};

export const registerEndpoint = (data) => {
    Analytics.updateEndpoint({
        address: data.Phone ? `+1${data.Phone}` : data.Email,
        channelType: data.Address == 'Phone' ? 'SMS' : 'EMAIL',
        attributes: {
            name: [ data.Name ],
            role: [ data.Role ]
        },
        optOut: 'NONE'
    }).then((data) => console.log(data));
};
