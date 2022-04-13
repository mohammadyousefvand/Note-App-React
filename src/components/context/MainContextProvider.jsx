import React, { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export const MainContext = createContext()

export default function MainContextProvider({ children }) {
    const [notes, setNotes] = useState(
        !localStorage.getItem("notes")
            ? localStorage.setItem("notes", JSON.stringify([]))
            : []
    )
    const [title, setTitle] = useState('')
    const [textNote, setTextNote] = useState('')
    const [showInput, setShowInput] = useState(false)
    const [editShow, setEditShow] = useState(false)
    const [editTitle, setEditTitle] = useState("")
    const [editText, setEditText] = useState("")
    const [noteId, setNoteId] = useState()
    const [countTitle, setCountTitle] = useState(0)

    const addNewNote = () => {
        if (title && textNote) {
            setShowInput(false)
            let oldNote = JSON.parse(localStorage.getItem("notes"))
            let newNote = {
                id: notes.length + 1,
                title,
                textNote,
                date: new Date().toLocaleDateString('fa-IR'),
            }
            localStorage.setItem("notes", JSON.stringify([newNote, ...oldNote]))
            setNotes([...notes, newNote])
            setTitle("")
            setTextNote("")
            setCountTitle(0)
        } else {
            toast.warn('لطفا ورودی ها را خالی نگذارید')
        }
    }
    useEffect(() => {
        setNotes(JSON.parse(localStorage.getItem("notes")))
    }, [])

    const removeNote = (noteId) => {
        let newNoteList = notes.filter(note => note.id !== noteId)

        setNotes(newNoteList)
        localStorage.setItem("notes", JSON.stringify(newNoteList))
    }
    const getNote = (noteId) => {
        let editNote = notes.find(note => note.id === noteId)
        setEditTitle(editNote.title)
        setEditText(editNote.textNote)
    }

    const editNoteHandler = () => {
        setEditShow(false)
        let newNotes = [...notes]
        newNotes.forEach(note => {
            if (note.id === noteId) {
                note.title = editTitle
                note.textNote = editText
            }
        })

        setNotes(newNotes)
        localStorage.setItem("notes", JSON.stringify(newNotes))
        toast.success('ویرایش شد')
    }
    return (
        <MainContext.Provider value={{
            notes,
            setNotes,
            title,
            setTitle,
            textNote,
            setTextNote,
            showInput,
            setShowInput,
            editShow,
            setEditShow,
            editTitle,
            setEditTitle,
            editText,
            setEditText,
            noteId,
            setNoteId,
            countTitle,
            setCountTitle,
            addNewNote,
            removeNote,
            getNote,
            editNoteHandler,
        }}>
            {children}
        </MainContext.Provider>
    )
}
