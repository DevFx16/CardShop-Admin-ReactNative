'use strict'
import { AsyncStorage } from 'react-native';

const Url = 'https://cards-cardshop.herokuapp.com/Cards/';

async function Get() {
  try {
    let response = await fetch('https://cards-cardshop.herokuapp.com/Usuarios');
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return null;
  }
}

async function Datos(Key) {
  try {
    return await AsyncStorage.getItem(Key);
  } catch (error) { }
}

async function setDatos(Data, Key) {
  try {
    await AsyncStorage.setItem(Key, JSON.stringify(Data));
  } catch (err) { }
}

function Verificar(Token) {
  return fetch((Url + 'Login'), { method: 'GET', headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Token } })
    .then((Response) => {
      return Response;
    })
    .catch((Error) => {
      return Error;
    })
}

async function Delete(Uri, Id, Token) {
  try {
    return await fetch((Url + Uri + Id), { method: 'DELETE', headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Token }});
  } catch (error) {
    console.error(error);
  }
}

function Login(Json) {
  return fetch((Url + 'Login'), { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: Json })
    .then((Response) => {
      return Response;
    })
    .catch((Error) => {
      return Error;
    })
}

function Post(Json, Tipo, Token) {
  return fetch((Url + Tipo), { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Token }, body: Json })
    .then((Response) => {
      return Response;
    })
    .catch((Error) => {
      return Error;
    })
}

function ReAuth() {
  Card.Datos('User').then((Value) => {
    if (Value !== null) {
      Login(Value).then((Res) => Res.json())
      .then((Respuesta) =>{
        Datos('Datos').then((Value) => {
          if(Value !== null){
            Json = JSON.parse(Value);
            Card.setDatos({ Cards: Json.Cards, Token: Respuesta.token}, 'Datos');
          }
        })
      })
    }
  });
}

module.exports = { Get, Login, Delete, Verificar, Datos, setDatos, Post, ReAuth }