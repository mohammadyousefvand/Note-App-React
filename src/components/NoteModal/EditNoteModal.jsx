import React, { useContext } from 'react'
import { MainContext } from '../context/MainContextProvider'
import './NoteModal.css'

export default function EditNoteModal() {
    const { editShow,
        editTitle,
        editText,
        editNoteHandler,
        setEditTitle,
        setEditText,
        setEditShow, } = useContext(MainContext)

    return (
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
    )
}
