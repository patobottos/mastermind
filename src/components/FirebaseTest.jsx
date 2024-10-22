"use client";
import { db } from "../utilities/firebaseConfig";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

/* OLD CODE BY PABLO
import { collection, getDocs, query, doc, getDoc, addDoc, deleteDoc, updateDoc, setDoc, where } from "firebase/firestore";

// CREATE
export const createGame = async (obj) => {
  const colRef = collection(db, "games");
  const data = await addDoc(colRef, obj);
  return data.id;
};

// UPDATE
export const updateGame = async (id, obj) => {
  const docRef = doc(db, "games", id);
  await updateDoc(docRef, obj);
};

// READ
export const getGames = async () => {
  const colRef = collection(db, "games");
  const result = await getDocs(query(colRef));
  return getArrayFromCollection(result);
};

// READ WITH WHERE
// Tened en cuenta que el tipo de dato de la condición debe coincidir con el tipo de dato que hay en Firebase o no obtendréis un dato de respuesta
export const getGamesByCondition = async (value) => {
  const colRef = collection(db, "games");
  const result = await getDocs(query(colRef, where("stateOfGame", "==", value)));
  return getArrayFromCollection(result);
};

export const getGameById = async (id) => {
  const docRef = doc(db, "games", id);
  const result = await getDoc(docRef);
  return result.data();
};

// DELETE
export const deleteGame = async (id) => {
  const docRef = doc(db, "games", id);
  await deleteDoc(docRef);
};

export const getArrayFromCollection = (collection) => {
  return collection.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
};

*/

// BUG NINZA METHOD
async function fetchDataFromFirestore() {
  try {
    const querySnapshot = await getDocs(collection(db, "games"));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (error) {
    console.error("Error fetching Firestore data:", error);
    return [];
  }
}

export default function FirebaseTest({ showNumber }) {
  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setGameData(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <p>Information from Game database:</p>
      <div>
        {gameData.map((game) => (
          <div key={game.id} className="text-white">
            <p>{game.numberOfTry}</p>
            <p>{game.stateOfGame}</p>
          </div>
        ))}
      </div>
      <p className="text-yellow-400">
        Número actual de intentos de esta partida: <span>{showNumber}</span>
      </p>
    </div>
  );
}
