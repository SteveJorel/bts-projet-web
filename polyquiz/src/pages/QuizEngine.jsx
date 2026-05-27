import { useReducer, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import useFetch from '../hooks/useFetch'

const initialState = { index: 0, score: 0, answers: [], statut: 'playing', selected: null }

function quizReducer(state, action) {
  switch (action.type) {
    case 'START_QUIZ':
      return initialState
    case 'ANSWER_QUESTION': {
      const correct = action.payload.reponse === action.payload.bonne_reponse
      return { ...state, score: correct ? state.score + 1 : state.score, answers: [...state.answers, { ...action.payload, correct }], selected: action.payload.reponse }
    }
    case 'NEXT_QUESTION':
      return { ...state, index: state.index + 1, selected: null }
    case 'FINISH_QUIZ':
      return { ...state, statut: 'finished' }
    default:
      return state
  }
}

function Screen({ children }) {
  return <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#0a0a2e,#1a0a3e,#0a1a2e)', display:'flex', alignItems:'center', justifyContent:'center' }}>{children}</div>
}

function QuizEngine() {
  const [state, dispatch]   = useReducer(quizReducer, initialState)
  const [timeLeft, setTimeLeft] = useState(60)
  const { data: questions, loading, error } = useFetch('/questions.json')
  const { pseudo, setBestScore, setLastAnswers } = useUser()
  const navigate  = useNavigate()
  const timerRef  = useRef(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); dispatch({ type: 'FINISH_QUIZ' }); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  useEffect(() => {
    if (state.statut === 'finished') {
      clearInterval(timerRef.current)
      setBestScore(s => Math.max(s, state.score))
      setLastAnswers(state.answers)
      navigate('/resultats')
    }
  }, [state.statut])

  if (loading) return <Screen><p style={{color:'#a78bfa'}}>Chargement...</p></Screen>
  if (error)   return <Screen><p style={{color:'#f87171'}}>Erreur : {error}</p></Screen>
  if (!questions) return null

  const question = questions[state.index]
  const progress = (state.index / questions.length) * 100

  function handleAnswer(option) {
    if (state.selected) return
    dispatch({ type: 'ANSWER_QUESTION', payload: { reponse: option, bonne_reponse: question.bonne_reponse, libelle: question.libelle } })
    setTimeout(() => {
      if (state.index + 1 >= questions.length) dispatch({ type: 'FINISH_QUIZ' })
      else dispatch({ type: 'NEXT_QUESTION' })
    }, 800)
  }

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#0a0a2e,#1a0a3e,#0a1a2e)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
      <div style={{ width:'100%', maxWidth:'560px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1rem' }}>
          <span style={{ color:'#a78bfa', fontSize:'14px' }}>👤 {pseudo}</span>
          <span style={{ color: timeLeft <= 10 ? '#f87171' : '#60a5fa', fontWeight:700, fontSize:'18px' }}>⏱ {timeLeft}s</span>
          <span style={{ color:'#4ade80', fontSize:'14px' }}>⭐ {state.score} pts</span>
        </div>
        <div style={{ height:'4px', background:'rgba(255,255,255,0.1)', borderRadius:'2px', marginBottom:'1.5rem' }}>
          <div style={{ height:'100%', width:`${progress}%`, background:'linear-gradient(90deg,#7c3aed,#4f46e5)', borderRadius:'2px', transition:'width 0.3s' }} />
        </div>
        <div style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(150,100,255,0.3)', borderRadius:'16px', padding:'2rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1rem' }}>
            <span style={{ fontSize:'11px', padding:'3px 10px', borderRadius:'20px', background:'rgba(167,139,250,0.15)', color:'#a78bfa', border:'1px solid rgba(167,139,250,0.3)' }}>{question.categorie}</span>
            <span style={{ color:'#6b7280', fontSize:'13px' }}>{state.index + 1} / {questions.length}</span>
          </div>
          <h2 style={{ color:'#f3f4f6', fontSize:'18px', fontWeight:600, marginBottom:'1.5rem', lineHeight:1.5 }}>{question.libelle}</h2>
          <div style={{ display:'grid', gap:'10px' }}>
            {question.options.map(option => {
              let bg = 'rgba(255,255,255,0.05)', border = 'rgba(150,100,255,0.2)', color = '#d1d5db'
              if (state.selected) {
                if (option === question.bonne_reponse) { bg = 'rgba(74,222,128,0.15)'; border = '#4ade80'; color = '#4ade80' }
                else if (option === state.selected)    { bg = 'rgba(248,113,113,0.15)'; border = '#f87171'; color = '#f87171' }
              }
              return <button key={option} onClick={() => handleAnswer(option)} style={{ background:bg, border:`1px solid ${border}`, borderRadius:'10px', padding:'12px 16px', color, fontSize:'14px', textAlign:'left', cursor: state.selected ? 'default' : 'pointer', transition:'all 0.2s' }}>{option}</button>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizEngine