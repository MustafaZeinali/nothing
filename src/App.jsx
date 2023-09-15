

import './App.css'


import React, { useEffect, useState } from 'react';
import AWS from './configAws';

function S3ImageDisplay() {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const s3 = new AWS.S3();
    const bucketName = 'user-test911';

    s3.listObjectsV2({ Bucket: bucketName }, (err, data) => {
      if (err) {
        console.error('Error listing objects:', err);
      } else {
        const urls = data.Contents.map((obj) => {
          return s3.getSignedUrl('getObject', {
            Bucket: bucketName,
            Key: obj.Key,
            Expires: 3600, // Optional: Set the URL expiration time in seconds
          });
        });
        setImageUrls(urls);
      }
    });
  }, []);

  return (
    <div>
      <h1>Images from S3</h1>
      <div>
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Image ${index}`} />
        ))}
      </div>
    </div>
  );
}

export default S3ImageDisplay;
// **DO THIS**:
//   Replace BUCKET_NAME with the bucket name.
//
var albumBucketName = 'BUCKET_NAME';

// **DO THIS**:
//   Replace this block of code with the sample code located at:
//   Cognito -- Manage Identity Pools -- [identity_pool_name] -- Sample Code -- JavaScript
//
// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'REGION'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'IDENTITY_POOL_ID',
});

// Create a new service object
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName}
});

// A utility function to create HTML.
function getHtml(template) {
  return template.join('\n');
}
// its nothing 

