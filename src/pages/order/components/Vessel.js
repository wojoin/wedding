import React, { useState } from 'react';
import { Image } from 'antd';

import {v1, v2, v3, v4, v5, v6, v7, v8, v9} from './Images'

const VesselImage = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Image
        preview={{ visible: false }}
        width={200}
        src={v1}
        onClick={() => setVisible(true)}
      />
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
          <Image src={v1} />
          <Image src={v2} />
          <Image src={v3} />
          <Image src={v4} />
          <Image src={v5} />
          <Image src={v6} />
          <Image src={v7} />
          <Image src={v8} />
          <Image src={v9} />
        </Image.PreviewGroup>
      </div>
    </>
  );
};

export default VesselImage;