## Amazon Pinpoint Event Trigger Demo

This is a starter template for a simple demo to register endpoints and generating events to show off the capabilities of Amazon Pinpoints event trigger functionality.

## License Summary

This sample code is made available under a modified MIT license. See the LICENSE file.

## How to use

For more information see the Amplify getting started guide at https://aws-amplify.github.io/docs/js/start.

You should be able to get this set up and started by issuing the following commands and following the prompts.

## Setup

### Project setup

- Pull the project and cd to the root of the project directory.

```
npm install
```

### Create AWS Cognito Resources

We will create an Amazon Cognito identity pool that our app will connect to.  This identity pool will authenticate our apps requests and allow permissions to call the Amazon Pinpoint service.

- Proceed to https://console.aws.amazon.com/cognito/create/
- Enter a name for your identity pool.
- Check the box for 'Enable access to unauthenticated identities'.  (Note: we will not be integrating our application with a user pool or 3rd party auth.
- Click 'Create pool'
- Click 'View details'.
- Click view policy document under 'authenticated identities'
- Click edit.
- Your policy should resemble the following:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "mobiletargeting:PutEvents",
                "mobiletargeting:UpdateEndpoint"
            ],
            "Resource": "arn:aws:mobiletargeting:us-east-1:{YOUR_AWS_ACCOUNT_ID:*"
        }
    ]
}
```
- Click view policy document under 'unauthenticated identities'
- Click edit.
- Your policy should resemble the following:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "mobiletargeting:PutEvents",
                "mobiletargeting:UpdateEndpoint"
            ],
            "Resource": "arn:aws:mobiletargeting:us-east-1:{YOUR_AWS_ACCOUNT_ID}:*"
        }
    ]
}
```
- Click Allow to proceed.
- On the following screen note your new identityPoolId - it will be used in your webapp to configure AWS Amplify

#### Create Amazon S3 Bucket to hold events

- Proceed to https://s3.console.aws.amazon.com/s3
- Click 'Create bucket'
- Use bucket default settings by hitting next until its created (*recommended), or provide your own.

#### Create an Amazon Kinesis Firehose to stream events from Pinpoint to your bucket.

- Proceed to https://console.aws.amazon.com/firehose
- Click on 'Data Firehose' in the left side menu
- Click 'Create delivery stream'
- Enter a Delivery stream name
- Check 'Direct PUT  or other sources'
- Click 'Next'
- Leave settings default (Disabled) and click 'Next'
- Check Amazon S3 as destination
- Choose the S3 bucket created in the previous step
- Leave prefix blank
- Hit 'Next'
- Scroll down to IAM role section and click 'Create new or choose' button.
- Click 'Allow'
- Click 'Next'
- Click 'Create delivery stream'

### Create Amazon Pinpoint project and resources

- Proceed to https://console.aws.amazon.com/pinpoint
- Click on 'Create a project'
- Type in a project name and click 'Create'
- Choose 'Configure' on the card that says 'SMS and voice'
- Check the box that says 'Enable the SMS channel for the project'
- Click 'Save changes'
- Click on 'Settings' from the left side menu
- On the 'Email' card choose 'Manage'
- Click on 'Edit'
- Check the box that says 'Enable the email channel for this project'
- Choose 'Verify a new email address'
- Type in your email address
- Check your email and click on the link to confirm your email
- Return to the console and click on 'Save'
- Click on 'Settings' from the left navigation menu
- Click on 'Event stream' from the left navigation menu
- Click on 'Edit'
- Check the box for 'Stream to Amazon Kinesis'
- Choose 'Send events to an Amazon Kinesis Data Firehose stream'
- Select the Stream you created in the previous step
- Choose 'Automatically create a role' under the IAM role option
- Type a unique role name into the box below that selection
- Click the 'Save' button
- Note the project ID of your Amazon Pinpoint Project (availabile in the URL after apps/{your project id} or click on the 'All projects' in the left nav and find your project name, your id will be present next to it in the table.
- We will return to the Amazon Pinpoint console after we set up our web app to further configure our messaging and view analytics.

### Set up web application

- Create a creds.js file in the root of your project directory
- Add the following:
```
export default {
    identityPoolId: '{YOUR_COGNITO_IDENTITY_POOL_ID}',
    appId: '{YOUR_PINPOINT_PROJECT_ID}',
    region: '{THE_AWS_REGION_YOUR_PROJECT_AND_INDENTITY_POOL_ARE_IN}' //e.g. us-east-1
}
```
- if you havn't already - run npm install
- the start the project:
```
npm run start
```
- Visit localhost:9000/index.html to view the app running
- Register an endpoint on the left by filling out the form with your phone or email.
- Click 'Register' to register the endpoint
- Click on 'Send' to send an event

### Re-visit Amazon Pinpoint console to view event analytics and configure messaging

- Proceed to https://console.aws.amazon.com/pinpoint
- Click on the app that you created in a previous step
- Choose Analytics and Events under the left navigation menu
- View the events that have been sent to your project from your web application
- Choose the Event Type 'GeneratedTestEvent' that should exist if you have hit the 'Send' utton to send and event from your application (This may take a couple of minutes to propagate to Amazon Pinpoints dashboard)
- Click on 'Campaigns' from the left navigation menu
- Click on 'Create a campaign'
- Enter a campaign name into the text box
- Click 'Next'
- Choose 'Create a segment'
- Enter a segment name like 'All Users' - you should see at least the 1 endpoint you registered in the estimates card on the right
- Click 'Next' and accept any modals
- Choose 'SMS' or 'EMAIL' depending on how you registered your endpoint in your web application
- Choose a Subject for the message
- For the message body type a message like 'Hello I see your a {{Attributes.role}}' - this will use the dynamic role property the user selected when they registered their endpoint.
- On the schedule page Choose 'Event based'
- Choose the GeneratedTestEvent event and no need to specify the event attributes or value
- Choose a schedule to start the campaign AT LEAST 15 mins from the time you create it or it is not a valid time
- Click 'Next'
- Click 'Create campaign'

### See it in Action!
- Wait until your campaign starts execution time (15 mins from creation)
- Send an event from your application and view the resulting Email or Text!



