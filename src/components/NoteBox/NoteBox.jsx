import React, { useEffect, useState } from 'react'
import './NoteBox.css'
import './NoteItem.css'
import { BsPlusCircleDotted } from 'react-icons/bs'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function NoteBox() {

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

    const noteVariant = {
        hidden: {
            scale: 0
        },
        visible: {
            scale: 1,
            transition: {
                duration: .6,
            }
        },
        hover: {
            y: -5,
        }
    }

    return (
        <>
            <ToastContainer
                position="top-left"
            />
            <div className={`noteContainer ${(showInput || editShow) && 'blurBackGround'}`}>
                <div className="defaultBox" onClick={() => setShowInput(true)}>
                    <BsPlusCircleDotted className='addNoteIcon' />
                    <p className='addNoteTitle'>افزودن یادداشت</p>
                </div>
                {notes.map(note => (
                    <motion.div
                        whileHover="hover"
                        variants={noteVariant}
                        initial="hidden"
                        animate="visible"
                        key={note.id} className="noteBox">
                        <div className='headerNoteItem'>
                            <p className='NoteHeaderTitle'>{note.title}</p>
                        </div>
                        <Link className="mainNoteItem" to={`/${note.id}`}>
                            <div>
                                <p>{note.textNote}</p>
                            </div>
                        </Link>
                        <div className="footerNoteItem">
                            <div className='btnBoxFooter'>
                                <div className='deleteIconbox'>
                                    <AiFillDelete onClick={() => removeNote(note.id)} className='deleteBtn' />
                                </div>
                                <div className='editIconbox'>
                                    <AiFillEdit onClick={() => {
                                        getNote(note.id)
                                        setNoteId(note.id)
                                        setEditShow(true)
                                    }} className='editBtn' />
                                </div>
                            </div>
                            <div>
                                <span className='dateNote'>{note.date}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className={`inputBoxContainer ${showInput && 'showInputBox'}`}>
                <div className="inputBox">
                    <div className='letterCount'>
                        <span>{countTitle} </span>
                        <span>/</span>
                        <span> 35</span>
                    </div>
                    <label htmlFor="tilte">عنوان یادداشت</label>
                    <input maxLength={35} value={title} onChange={(e) => {
                        setCountTitle(e.target.value.length)
                        setTitle(e.target.value)
                    }} type="text" id='title' />
                </div>
                <div className="inputBox">
                    <label htmlFor="text">متن یادداشت</label>
                    <textarea value={textNote} onChange={(e) => setTextNote(e.target.value)} id="text"></textarea>
                </div>
                <div className='btnBox'>
                    <button onClick={addNewNote} className='saveBtn'>ذخیره</button>
                    <button onClick={() => setShowInput(false)} className='canselBtn'>لغو</button>
                </div>
            </div>
            <div className={`inputBoxContainer ${editShow && 'showInputBox'}`}>
                <div className="inputBox">
                    <label htmlFor="tilte">ویرایش عنوان</label>
                    <input maxLength={5} value={editTitle} onChange={(e) => { setEditTitle(e.target.value) }} type="text" id='title' />
                </div>
                <div className="inputBox">
                    <label htmlFor="text">ویرایش متن</label>
                    <textarea value={editText} onChange={(e) => setEditText(e.target.value)} id="text"></textarea>
                </div>
                <div className='btnBox'>
                    <button onClick={editNoteHandler} className='saveBtn'>ویرایش</button>
                    <button onClick={() => setEditShow(false)} className='canselBtn'>لغو</button>
                </div>
            </div>
        </>
    )
}
