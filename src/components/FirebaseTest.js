"use client";
import {db} from "../../firebaseConfig";
import React, {useEffect, useState} from "react";
import { collection, getDocs, query, doc, getDoc, addDoc, deleteDoc, updateDoc, setDoc, where } from "firebase/firestore";

// CREATE
export const createUser = async (obj) => {
  const colRef = collection(db, "games");
  const data = await addDoc(colRef, obj);
  return data.id;
};

// UPDATE
export const updateUser = async (id, obj) => {
  const docRef = doc(db, "games", id);
  await updateDoc(docRef, obj);
};

// READ
export const getgames = async () => {
  const colRef = collection(db, "games");
  const result = await getDocs(query(colRef));
  return getArrayFromCollection(result);
};

// READ WITH WHERE
// Tened en cuenta que el tipo de dato de la condición debe coincidir con el tipo de dato que hay en Firebase o no obtendréis un dato de respuesta
export const getgamesByCondition = async (value) => {
  const colRef = collection(db, "games");
  const result = await getDocs(query(colRef, where("stateOfGame", "==", value)));
  return getArrayFromCollection(result);
};

export const getUserById = async (id) => {
  const docRef = doc(db, "games", id);
  const result = await getDoc(docRef);
  return result.data();
};

// DELETE
export const deleteUser = async (id) => {
  const docRef = doc(db, "games", id);
  await deleteDoc(docRef);
};

export const getArrayFromCollection = (collection) => {
  return collection.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
};

async function fetchDataFromFirestore () {
  const querySnapshot = await getDocs(collection(db, "")); 
}


export default function FirebaseTest({ showNumber }) {
  return (
    <div>
      <p>Cantidad total de jugadores: </p>
      <p className="text-yellow-400">
        Número actual de intentos de esta partida: <span>{showNumber}</span>
      </p>
    </div>
  );
}
