import Auth from '@aws-amplify/auth';
import Analytics from '@aws-amplify/analytics';

import awsconfig from './aws-exports';

// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);
// send analytics events to Amazon Pinpoint
Analytics.configure(awsconfig);

const Result = document.getElementById('Result');
const EventButton = document.getElementById('EventButton');
const RegisterButton = document.getElementById('RegisterButton');
const Role = document.getElementById('Role');
const Address = document.getElementById('Address');

RegisterButton.addEventListener('click', (evt) => {
    let address = Address.value;
    let channelType = address.includes("@")?'EMAIL':'SMS';
    
    Analytics.updateEndpoint({
	address: address,
	attributes: { role: [ Role.value ] },
	channelType: channelType,
	optOut: 'NONE'
    }).then( (evt) => {
        const url = 'https://console.aws.amazon.com/pinpoint/home/?region=us-east-1#/apps/'+awsconfig.aws_mobile_analytics_app_id+'/analytics/events';
        Result.innerHTML = '<p>Registered endpoint wth address ' + address + ' with type ' + channelType + ' and role ' + Role.value + '.</p>';
    });
});

let EventsSent = 0;

EventButton.addEventListener('click', (evt) => {
    Analytics.record({
	name: 'customTriggerEvent',
	attributes: { role: Role.value }
    }).then( (evt) => {
        const url = 'https://console.aws.amazon.com/pinpoint/home/?region=us-east-1#/apps/'+awsconfig.aws_mobile_analytics_app_id+'/analytics/events';
        Result.innerHTML += '<p>Event '+(++EventsSent)+' sent.</p>';
    });
});
