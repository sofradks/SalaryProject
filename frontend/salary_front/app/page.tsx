"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import {  getUserToken, UserRequest } from "./services/users";
import { setuid } from "process";
import { items } from "./layout";
import Link from "next/link";
import { redirect } from 'next/navigation'
import { Navigate, Router, useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
//import { routes } from "../layout"

export let token = "";


export default function Home() {

  const router = useRouter()
  const defaultValues = {
    login: "",
    password: "",
  } as UserRequest
  //const [token,setToken] = useState<string>("");
  const [user,setUser] = useState<UserRequest>();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  // const get = () =>
  //   useEffect(() => {
  //     const getToken = async () => { 
  //         if (user == undefined)
  //           setUser(defaultValues);
  //         const token = await getUserToken(user);
  //         setToken(token);
  //     };
  //     getToken();
  //   }, [])

  const makeUser = () =>
    {
      const user = {
        login: login,
        password: password,
      } as UserRequest;
      setUser(user);
      const getToken = async () => { 
        if (user == undefined)
          setUser(defaultValues);
        const tok = await getUserToken(user);
        token = tok.token;
      }
      getToken();
      setTimeout(() => router.push('/position'),1000)
      
    }

  return (
    
    <div >
      <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}>
        <h1 style={{ marginTop:"10%"}}>Вход в систему</h1>
      </div>
      
      <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}>
        <Input
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Логин" 
            style={{margin:"3vh", width:"30%"}}
        />
      </div>
      <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}>
        <Input.Password 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль" 
              style={{margin:"3vh", width:"30%"}}
          />
      </div>
      <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}>
      <Button  type="primary" onClick={() => {
        makeUser();
        }}>
          Войти
        </Button>
      </div>
    </div>
  );
}
