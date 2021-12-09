import React, { useState } from 'react';
import { Image } from 'antd';

import {t1, t2, t3, t4} from './Images'




const TtaiImage = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Image
        preview={{ visible: false }}
        width={200}
        src={t1}
        onClick={() => setVisible(true)}
      />
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
          <Image src={t1} />
          <Image src={t2} />
          <Image src={t3} />
          <Image src={t4} />
        </Image.PreviewGroup>
      </div>
    </>
  );
};

export default TtaiImage;