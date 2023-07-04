'use client';

import React from 'react'
// import ZoomMtgEmbedded from "@zoomus/websdk/embedded"
import axios from 'axios';
import { SuspensionViewType } from '@zoomus/websdk/embedded';
// import { ZoomMtg } from '@zoomus/websdk';

export default function Menu3() {
  const [error, setError] = React.useState<string>('');
  console.log('menu3');
  // const [client, setClient] = React.useState<any>(null);

  // React.useEffect(() => {
  //   if (client) {
  //     let meetingSDKElement = document.getElementById('meetingSDKElement');
  //     client.init({ zoomAppRoot: meetingSDKElement!, language: 'en-US' });
  //   }

  // }, [client]);

  const dynamicImport = async () => {
    const ZoomMtgEmbedded = (await import('@zoomus/websdk/embedded')).default;
    const client = ZoomMtgEmbedded.createClient();
    return client;
    // console.log('dynamicImport');
  }

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

  async function join(role = 0) {
    try {
      const client = await dynamicImport();
      const meetingSDKElement = document.getElementById('meetingSDKElement');
      client.init({
        zoomAppRoot: meetingSDKElement!,
        language: 'en-US',
        customize: {
          video: {
            defaultViewType: 'gallery' as SuspensionViewType,
            viewSizes: {
              default: {
                width: 640,
                height: 360,
              },
              ribbon: {
                width: 640,
                height: 360,
              },
            }
          }
        }
      });

      const { signature, sdkKey } = await getSignature('82505925747', role);



      client.join({
        sdkKey: sdkKey,
        signature: signature,
        meetingNumber: '82505925747',
        password: 'k4esLr',
        userName: 'nunonam',
        tk: '',
        zak: '',
      });
    } catch (error) {
      setError('Error joining meeting');
      console.log(error);
    }
  }

  // async function joinFull() {
  //   try {
  //     ZoomMtg.setZoomJSLib('https://source.zoom.us/2.13.0/lib', '/av')
  //     // loads WebAssembly assets
  //     ZoomMtg.preLoadWasm()
  //     ZoomMtg.prepareWebSDK()
  //     // loads language files, also passes any error messages to the ui
  //     ZoomMtg.i18n.load('en-US')
  //     ZoomMtg.i18n.reload('en-US')

  //     ZoomMtg.init({
  //       leaveUrl: 'http://www.zoom.us',
  //       success: async (success: any) => {
  //         console.log(success)

  //         const { signature, sdkKey } = await getSignature('82505925747', 0);

  //         ZoomMtg.join({
  //           signature: signature,
  //           meetingNumber: '82505925747',
  //           userName: 'nunonam',
  //           sdkKey: sdkKey,
  //           passWord: 'k4esLr',
  //           success: (success: any) => {
  //             console.log(success)
  //           },
  //           error: (error: any) => {
  //             console.log(error)
  //           }
  //         })

  //       },
  //       error: (error: any) => {
  //         console.log(error)
  //       }
  //     })
  //   } catch (error) {
  //     setError('Error joining meeting');
  //     console.log(error);
  //   }
  // }

  return (
    <div className="container">
      <div className="flex flex-row justify-center gap-4 py-4">
        <button
          className="rounded-full bg-blue-500 text-white px-4 py-2"
          onClick={() => join(0)}
        >
          Join Meeting as Component
        </button>
        <button
          className="rounded-full bg-blue-500 text-white px-4 py-2"
          onClick={() => join(0)}
          disabled={true}
        >
          Join Meeting as Full Screen
        </button>
        <button
          className="rounded-full bg-gray-500 text-white px-4 py-2"
          onClick={() => join(1)}
          disabled={true}
        >
          Start Meeting
        </button>
      </div>
      {!!error && (
        <div className="px-4 py-3 leading-normal text-red-100 bg-red-700 rounded-lg" role="alert">
          <p>{error}</p>
        </div>
      )}
      {/* <div id="zmmtg-root"></div>
      <div id="aria-notify-area"></div> */}

      <div id="meetingSDKElement">

      </div>
    </div>
  )
}
