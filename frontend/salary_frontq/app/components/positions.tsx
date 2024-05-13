import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { text } from 'stream/consumers';

interface Props{
    positions: Position[];
    handleDelete: (id:string) => void;
    handleOpen: (position: Position) => void;
}


export const Positions = ({positions, handleDelete, handleOpen}: Props) => {

    const columns: TableProps<Position>['columns']  = [
        {
          title: 'Наименование',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Запланированные часы',
          dataIndex: 'hours',
          key: 'hours',
        },
        {
          title: 'Оклад',
          dataIndex: 'salary',
          key: 'salary',
        },
        {
        title: 'Действие',
        key: 'action',
        render: (_, record) => (
          <Space >
            <Button onClick={() => handleOpen(record)}>Изменить</Button>
            <Button danger onClick={() => handleDelete(record.id) }>Удалить</Button>
          </Space>
        ),
        },
      ];
    

    let dataSource: any[] | undefined = [];
    positions.map((position : Position) => (
        dataSource.push({
            id: position.id,
            name: position.name,
            hours: position.hours,
            salary: position.salary,
        })
    ));
    return (
        <div className="Table" >
            {
                <Table dataSource={dataSource} columns={columns} />
            }
            
        </div>
        
    )
}