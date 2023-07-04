

import React from 'react';
// import renderPlugin from 'plugin-module';

export default async function Plugin() {
  const renderPlugin = (await import('plugin-module')).default;
  console.log('renderPlugin');
  return (
    <div className="pt-40 text-center">
      {await renderPlugin('VAKE')}
    </div>
  )
}
