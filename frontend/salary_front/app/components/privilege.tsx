import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { text } from 'stream/consumers';

interface Props{
    privileges: Privilege[];
    handleDelete: (id:string) => void;
    handleOpen: (privilege: Privilege) => void;
}


export const Privileges = ({privileges, handleDelete, handleOpen}: Props) => {

    const columns: TableProps<Privilege>['columns']  = [
        {
          title: 'Наименование',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Надбавка',
          dataIndex: 'allowance',
          key: 'allowance',
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
    privileges.map((privilege : Privilege) => (
        dataSource.push({
            id: privilege.id,
            name: privilege.name,
            allowance: privilege.allowance,
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