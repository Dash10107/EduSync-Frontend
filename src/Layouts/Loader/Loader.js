import React from 'react'
import { Space,Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import "./Loader.css"
export default function Loader() {
    const antIcon = (
        <LoadingOutlined
          style={{
            fontSize: 24,
          }}
          spin
        />
      );
  return (
    <div className='loader'>
    <Space size="middle">
    <Spin  indicator={antIcon} size="large" />
    </Space>
    </div>
  )
}
