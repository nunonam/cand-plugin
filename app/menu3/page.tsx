'use client';

import React from 'react'
import ZoomMtgEmbedded from "@zoomus/websdk/embedded"
import axios from 'axios';

export default function Menu3() {
  console.log('menu3');
  const client = ZoomMtgEmbedded.createClient();

  React.useEffect(() => {
    let meetingSDKElement = document.getElementById('meetingSDKElement');
    client.init({ zoomAppRoot: meetingSDKElement!, language: 'en-US' });

  }, []);

  async function getSignature(meetingNumber: any, role: any) {
    try {
      const { data } = await axios.post('/api/zoom', {
        meetingNumber: meetingNumber,
        role: role
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function join() {
    const { signature, sdkKey } = await getSignature('82505925747', 0);

    client.join({
      sdkKey: sdkKey,
      signature: signature,
      meetingNumber: '82505925747',
      password: 'k4esLr',
      userName: 'nunonam',
      tk: '',
    });
  }

  return (
    <div className="pt-40 text-center">
      <button
        onClick={() => join()}
      >
        Join Meeting
      </button>
      <div id="meetingSDKElement">

      </div>
    </div>
  )
}
