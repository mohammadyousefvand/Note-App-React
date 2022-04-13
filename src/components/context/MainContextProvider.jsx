import React, { createContext, useState } from 'react'

export const MainContext = createContext()

export default function MainContextProvider({ children }) {
    const [notes, setNotes] = useState(
        !localStorage.getItem("notes")
            ? localStorage.setItem("notes", JSON.stringify([]))
            : []
    )
    return (
        <MainContext.Provider value={{ notes, setNotes }}>
            {children}
        </MainContext.Provider>
    )
}
