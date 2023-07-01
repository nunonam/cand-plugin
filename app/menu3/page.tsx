'use client';

import React from 'react'
import ZoomMtgEmbedded from "@zoomus/websdk/embedded"
import axios from 'axios';
// import { ZoomMtgEmbedded } from "@zoomus/websdk/embedded"
// import { ZoomMtg } from '@zoomus/websdk';

// ZoomMtg.setZoomJSLib('https://source.zoom.us/2.13.0/lib', '/av');

// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareWebSDK();
// // loads language files, also passes any error messages to the ui
// ZoomMtg.i18n.load('en-US');
// ZoomMtg.i18n.reload('en-US');

export default function Menu3() {
  console.log('menu3');
  // React.useEffect(() => {
  //   return new Promise(async (resolve, reject) => {
  //     const ZoomEmbed = (await import('@zoomus/websdk/embedded')).default;
  //     resolve(ZoomEmbed.createClient());
  //   }).then(async (client) => {
  //     // signature here

  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }, []);
  const client = ZoomMtgEmbedded.createClient();

  // const meetingSDKElement = document.getElementById('meetingSDKElement');
  // client.init({ zoomAppRoot: meetingSDKElement!, language: 'en-US' });

  React.useEffect(() => {
    let meetingSDKElement = document.getElementById('meetingSDKElement');
    client.init({ zoomAppRoot: meetingSDKElement!, language: 'en-US' });

  }, []);

  // var authEndpoint = ''
  // var sdkKey = ''
  // var meetingNumber = '123456789'
  // var passWord = ''
  // var role = 0
  // var userName = 'React'
  // var userEmail = ''
  // var registrantToken = ''
  // var zakToken = ''
  // var leaveUrl = 'http://localhost:3000'

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

  // function startMeeting(signature: any) {
  //   document.getElementById('zmmtg-root').style.display = 'block'

  //   ZoomMtg.init({
  //     leaveUrl: leaveUrl,
  //     success: (success: any) => {
  //       console.log(success)

  //       ZoomMtg.join({
  //         signature: signature,
  //         sdkKey: sdkKey,
  //         meetingNumber: meetingNumber,
  //         passWord: passWord,
  //         userName: userName,
  //         userEmail: userEmail,
  //         tk: registrantToken,
  //         zak: zakToken,
  //         success: (success: any) => {
  //           console.log(success)
  //         },
  //         error: (error: any) => {
  //           console.log(error)
  //         }
  //       })

  //     },
  //     error: (error: any) => {
  //       console.log(error)
  //     }
  //   })
  // }

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
