import React from 'react';
import { List } from 'antd';

const Circuit = (props) => {
    return (
    <div className="list-container">
        <h2>Circuits</h2>
        <List
            dataSource={props.data}
            renderItem={item => (
                <div className="circuit-list-item">
                    <a href={`circuits/${item.id}`} className="circuit-link">{item.name}</a>
                    <br />
                    {item.description}
                </div>
            )}
        />
    </div>
    )
}

export default Circuit;