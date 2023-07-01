import jwt from 'jsonwebtoken';

export default function handler(req: any, res: any) {
  console.debug('req.body', req.body);

  console.debug('process.env.ZOOM_CLIENT_ID', process.env.ZOOM_CLIENT_ID);
  console.debug('process.env.ZOOM_CLIENT_SECRET', process.env.ZOOM_CLIENT_SECRET);

  const iat = Math.round((new Date()).getTime() / 1000) - 30;

  const signature = jwt.sign(JSON.stringify({
    sdkKey: process.env.ZOOM_CLIENT_ID,
    mn: req.body.meetingNumber,
    role: req.body.role,
    iat: iat,
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  }), process.env.ZOOM_CLIENT_SECRET!, { header: { alg: 'HS256', typ: 'JWT' } });

  res.status(200).json({
    signature: signature,
    sdkKey: process.env.ZOOM_CLIENT_ID,
  })
}