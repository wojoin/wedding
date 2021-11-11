import React, { useState } from 'react';
import { Image } from 'antd';

import {bm1, bm2} from './Images'

const BumanImage = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Image
        preview={{ visible: false }}
        width={200}
        src={bm1}
        onClick={() => setVisible(true)}
      />
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
          <Image src={bm1} />
          <Image src={bm2} />
        </Image.PreviewGroup>
      </div>
    </>
  );
};

export default BumanImage;