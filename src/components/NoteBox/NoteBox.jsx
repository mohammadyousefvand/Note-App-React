import React, { useContext } from 'react'
import { BsPlusCircleDotted } from 'react-icons/bs'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MainContext } from '../context/MainContextProvider'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './NoteBox.css'
import './NoteItem.css'

export default function NoteBox() {
    const { notes,
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
        setNoteId,
        countTitle,
        addNewNote,
        removeNote,
        getNote,
        editNoteHandler,
        setCountTitle, } = useContext(MainContext)

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
                        <Link className="mainNoteItem" to={`/note/${note.id}`}>
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
                    <input maxLength={35} value={editTitle} onChange={(e) => { setEditTitle(e.target.value) }} type="text" id='title' />
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
