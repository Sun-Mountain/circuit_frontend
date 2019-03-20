import React from 'react';
import { List, Typography } from 'antd';

const Circuit = (props) => {
    return (
        <div>
    <h3 style={{ marginBottom: 16 }}>Default Size</h3>
    <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={props.data}
        renderItem={item => (
            <List.Item>
                <Typography.Text mark><a href={`/${item.id}`}>{item.name}</a></Typography.Text> {item.description}
            </List.Item>
        )}
    />
  </div>
    )
}

export default Circuit;