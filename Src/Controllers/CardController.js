'use strict'
import {AsyncStorage} from 'react-native';

const Url = 'https://cards-cardshop.herokuapp.com/Cards/';

async function Get() {
  try {
    let response = await fetch('https://cards-cardshop.herokuapp.com/Usuarios');
    let responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  } catch (error) {
    return null;
  }
}

async function Token() {
  try {
    return await AsyncStorage.getItem("User");
  } catch (error) { }
}

async function SetToken(Data){
  try {
    await AsyncStorage.setItem("User", JSON.stringify(Data));
  } catch (err) {}
}

function Verificar(Token){
  return fetch((Url + 'Login'), { method: 'GET', headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'Authorization' : 'Bearer '+Token }})
    .then((Response) => {
      return Response;
    })
    .catch((Error) => {
      return Error;
    })
}

async function Delete(Uri, Id) {
  try {
    let response = await fetch((Url + Uri + Id), { method: 'DELETE', headers: { Accept: 'application/json', 'Content-Type': 'application/json' } });
    let responseJson = await response.json();
    return responseJson;
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

module.exports = { Get, Login, Delete, Token, SetToken, Verificar }