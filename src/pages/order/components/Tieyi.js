import React, { useState } from 'react';
import { Image } from 'antd';

import {white, green, grey, golden, darkgreen, 
    circlepink, golden2, camber, roundness,golden3} from './Images'

const TieyiImage = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Image
        preview={{ visible: false }}
        width={200}
        src={white}
        onClick={() => setVisible(true)}
      />
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
          <Image src={white} />
          <Image src={green} />
          <Image src={grey} />
          <Image src={golden} />
          <Image src={darkgreen} />
          <Image src={circlepink} />
          <Image src={golden2} />
          <Image src={camber} />
          <Image src={roundness} />
          <Image src={golden3} />
        </Image.PreviewGroup>
      </div>
    </>
  );
};

export default TieyiImage;