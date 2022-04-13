import React, { useContext } from 'react'
import { MainContext } from '../context/MainContextProvider'
import './NoteModal.css'

export default function AddNoteModal() {
    const { showInput,
        countTitle,
        setCountTitle,
        setTitle,
        title,
        textNote,
        addNewNote,
        setShowInput,
        setTextNote, } = useContext(MainContext)

    return (
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
    )
}
