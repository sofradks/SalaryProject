"use client";

import { Button } from "antd";
import { Positions } from "../components/positions";
import { useEffect, useState } from "react";
import { createPosition, deletePosition, getAllPositions, PositionRequest, updatePosition } from "../services/position";
import Title from "antd/es/skeleton/Title";
import { CreateUpdatePosition, Mode } from "../components/CreateUpdatePosition";

export default function PositionPage()
{
    const defaultValues = {
        name: "",
        hours: 0,
        salary: 0,
    } as Position

    const [values,setValues] = useState<Position>(defaultValues);

    const [positions, setPositions] = useState<Position[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] =useState(false);
    const [mode, setMode] = useState(Mode.Create);

    useEffect(() => {
        const getPositions = async () =>{ 
            const positions = await getAllPositions();
            setLoading(false);
            setPositions(positions);
        };
        getPositions();
    }, [])

    const handleCreatePosition = async (request: PositionRequest) => {
        await createPosition(request);
        closeModal();
        
        const positions = await getAllPositions();
        setPositions(positions);
    };

    const handleUpdatePosition =async (id:string, request: PositionRequest) => {
        await updatePosition(id,request);
        closeModal();

        const positions = await getAllPositions();
        setPositions(positions);
    };

    const handleDeletePosition = async (id: string) => {
        await deletePosition(id);
        closeModal();

        const positions = await getAllPositions();
        setPositions(positions);
    };

    const openModal = () => {
        setMode(Mode.Create);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setValues(defaultValues);
        setIsModalOpen(false);
    };

    const openEditModal = (position: Position) => {
        setMode(Mode.Edit);
        setValues(position);
        setIsModalOpen(true);
    };

    
    return ( 
        <div>
            <div style={{display: "flex", justifyContent: "end", margin: "2vh"}}><Button type="primary" onClick={() => openModal()}>Добавить</Button></div>
            
            <CreateUpdatePosition mode={mode} 
                values={values} 
                isModalOpen={isModalOpen} 
                handleCreate={handleCreatePosition} 
                handleUpdate={handleUpdatePosition}
                handleCancel={closeModal}
            />

            {loading ? (
            <Title>Loading</Title>
            ) : (
                <Positions positions={positions} 
                handleDelete={handleDeletePosition} 
                handleOpen={openEditModal}
                />
            )}
        </div>
    )
}