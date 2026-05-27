import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

function Home() {
  const [input, setInput] = useState('')
  const { setPseudo, bestScore } = useUser()
  const navigate = useNavigate()

  function handleStart() {
    if (!input.trim()) return
    setPseudo(input.trim())
    navigate('/quiz')
  }

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#0a0a2e,#1a0a3e,#0a1a2e)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(150,100,255,0.3)', borderRadius:'20px', padding:'3rem', width:'100%', maxWidth:'420px', textAlign:'center' }}>
        <div style={{ fontSize:'3rem', marginBottom:'0.5rem' }}>🧠</div>
        <h1 style={{ fontSize:'2.5rem', fontWeight:700, background:'linear-gradient(90deg,#a78bfa,#60a5fa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:'0.5rem' }}>PolyQuiz</h1>
        <p style={{ color:'#9ca3af', marginBottom:'2rem', fontSize:'14px' }}>F1 · MotoGP · NBA · Manga · Anime</p>
        {bestScore > 0 && <p style={{ color:'#a78bfa', fontSize:'13px', marginBottom:'1rem' }}>🏆 Meilleur score : {bestScore}/10</p>}
        <input
          type="text"
          placeholder="Entre ton pseudonyme..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleStart()}
          style={{ width:'100%', background:'rgba(0,0,0,0.4)', border:'1px solid rgba(150,100,255,0.4)', borderRadius:'10px', padding:'12px 16px', color:'#fff', fontSize:'15px', outline:'none', marginBottom:'1rem' }}
        />
        <button onClick={handleStart} style={{ width:'100%', background:'linear-gradient(135deg,#7c3aed,#4f46e5)', border:'none', borderRadius:'10px', padding:'12px', color:'#fff', fontWeight:700, fontSize:'16px', cursor:'pointer' }}>
          Commencer le Quiz →
        </button>
      </div>
    </div>
  )
}

export default Home