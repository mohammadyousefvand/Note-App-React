import React, { useContext } from 'react'
import { BsPlusCircleDotted } from 'react-icons/bs'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MainContext } from '../context/MainContextProvider'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './NoteBox.css'
import AddNoteModal from '../NoteModal/AddNoteModal'
import EditNoteModal from '../NoteModal/EditNoteModal'

export default function NoteBox() {
    const { notes,
        showInput,
        setShowInput,
        editShow,
        setEditShow,
        setNoteId,
        removeNote,
        getNote, } = useContext(MainContext)

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
            <AddNoteModal />
            <EditNoteModal />
        </>
    )
}
