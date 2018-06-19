'use strict'

const Url = 'https://cards-cardshop.herokuapp.com/Cards/';

async function Get(Uri){
  try {
    let response = await fetch((Url+Uri));
    let responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  } catch (error) {
   return null;
  }
}

async function GetId(Uri, Id){
  try {
    let response = await fetch((Url+Uri+Id));
    let responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  } catch (error) {
   return null;
  }
}

async function Delete(Uri, Id){
  try {
    let response = await fetch((Url+Uri+Id));
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

async function Delete(Uri, Id){
  try {
    let response = await fetch((Url+Uri+Id), {method: 'DELETE',headers: {Accept: 'application/json','Content-Type': 'application/json'}});
    let responseJson = await response.json();
    return responseJson;
  }   catch (error) {
    console.error(error);
  }
}

function Login(Json){
  return fetch((Url+'Login'),{method: 'POST',headers: {Accept: 'application/json','Content-Type': 'application/json'}, body: Json})
    .then((Response) => {
      return Response;
    })
    .catch((Error) =>{
      return Error;
  })
}

module.exports = {Get, GetId, Login, Delete}