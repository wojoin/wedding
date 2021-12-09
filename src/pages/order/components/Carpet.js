import React, { useState } from 'react';
import { Image } from 'antd';
import {c1, c2} from './Images'


const CarpetImage = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Image
        preview={{ visible: false }}
        width={200}
        src={c1}
        onClick={() => setVisible(true)}
      />
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
          <Image src={c1} />
          <Image src={c2} />
        </Image.PreviewGroup>
      </div>
    </>
  );
};

export default CarpetImage;