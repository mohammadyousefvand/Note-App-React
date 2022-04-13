import React, { useContext } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import './Note.css'
import { BsArrowRight } from 'react-icons/bs'
import { motion } from 'framer-motion'
import { MainContext } from '../context/MainContextProvider'

export default function Note() {

  let paramsId = useParams()
  const { notes } = useContext(MainContext)
  let mainNote = notes.find(note => note.id == paramsId.id)

  const noteItemVariant = {
    hidden: {
      y: "-100vw",
    },
    visible: {
      y: -10,
      transition: {
        duration: .3,
        type: 'spring',
        stiffness: 80,
        when: "beforeChildren",
      },
    },
    exit: {
      y: "-100vw",
    }
  }

  return (
    <>
      {mainNote ? (
        <div className='noteItemBox'>
          <motion.div
            variants={noteItemVariant}
            initial="hidden"
            animate="visible"
            className="textBox">
            <Link className='backLink' to={'/'}>
              <BsArrowRight />
              <span>صفحه قبل</span>
            </Link>
            <h3 className='noteBoxTitle'>{mainNote.title}</h3>
            <p>{mainNote.textNote}</p>
            <span
              className='dateSingleNote'>{mainNote.date}</span>
          </motion.div>
        </div>
      ) : (
        <Navigate to={'/'} />
      )}
    </>
  )
}
