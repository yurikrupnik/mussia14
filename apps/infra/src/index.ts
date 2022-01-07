import * as pulumi from '@pulumi/pulumi';
import * as gcp from '@pulumi/gcp';

const config = new pulumi.Config();

const region = config.get('region') || 'europe-west1';
const project = config.get('project') || 'mussia14';

const temp = new gcp.storage.Bucket('temp-bucket', {
  name: `${project}-temp-bucket`,
  location: region,
  forceDestroy: true,
  labels: {
    type: 'temp',
    team: 'util',
  },
});

// new gcp.eventarc.Trigger('dasd', {
//   name: 'adsdasd',
//   location: region,
//   project: project,
//   destination: {
//     // cloudRunService: {
//     //   service:
//     // }
//   },
// });

// new gcp.firebase.Project('ds', {});
// const s = new gcp.cloudfunctions.HttpCallbackFunction('dsa', {});
// const greeting = new gcp.cloudfunctions.HttpCallbackFunction(
//   'greeting',
//   (req, res) => {
//     res.send(`Greetings from ${req.body.name || 'Google Cloud Functions'}!`);
//   }
// );
