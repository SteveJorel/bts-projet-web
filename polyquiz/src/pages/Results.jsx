import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

function Results() {
  const { pseudo, bestScore, lastAnswers, setPseudo } = useUser()
  const navigate = useNavigate()

  const ratio = useMemo(() => {
    if (!lastAnswers.length) return 0
    return Math.round((lastAnswers.filter(a => a.correct).length / lastAnswers.length) * 100)
  }, [lastAnswers])

  const score = lastAnswers.filter(a => a.correct).length

  function handleReplay() { navigate('/quiz') }
  function handleLogout() { setPseudo(null); navigate('/') }

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#0a0a2e,#1a0a3e,#0a1a2e)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
      <div style={{ width:'100%', maxWidth:'520px' }}>
        <div style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(150,100,255,0.3)', borderRadius:'20px', padding:'2rem', textAlign:'center', marginBottom:'1.5rem' }}>
          <div style={{ fontSize:'3rem', marginBottom:'0.5rem' }}>{ratio >= 80 ? '🏆' : ratio >= 50 ? '🎯' : '💪'}</div>
          <h1 style={{ fontSize:'1.8rem', fontWeight:700, background:'linear-gradient(90deg,#a78bfa,#60a5fa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:'0.5rem' }}>Résultats</h1>
          <p style={{ color:'#9ca3af', marginBottom:'1.5rem' }}>👤 {pseudo}</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px', marginBottom:'1.5rem' }}>
            {[['Score', `${score}/10`, '#a78bfa'], ['Ratio', `${ratio}%`, '#4ade80'], ['Record', `${bestScore}/10`, '#fbbf24']].map(([label, val, color]) => (
              <div key={label} style={{ background:'rgba(0,0,0,0.3)', borderRadius:'10px', padding:'12px' }}>
                <div style={{ fontSize:'20px', fontWeight:700, color }}>{val}</div>
                <div style={{ fontSize:'11px', color:'#6b7280', marginTop:'2px' }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:'10px' }}>
            <button onClick={handleReplay} style={{ flex:1, background:'linear-gradient(135deg,#7c3aed,#4f46e5)', border:'none', borderRadius:'10px', padding:'12px', color:'#fff', fontWeight:600, cursor:'pointer' }}>🔄 Rejouer</button>
            <button onClick={handleLogout} style={{ flex:1, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(150,100,255,0.3)', borderRadius:'10px', padding:'12px', color:'#a78bfa', fontWeight:600, cursor:'pointer' }}>🚪 Quitter</button>
          </div>
        </div>
        <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(150,100,255,0.2)', borderRadius:'16px', padding:'1.5rem' }}>
          <h3 style={{ color:'#a78bfa', fontSize:'14px', marginBottom:'1rem', letterSpacing:'1px' }}>DÉTAIL DES RÉPONSES</h3>
          {lastAnswers.map((a, i) => (
            <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'10px', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize:'16px' }}>{a.correct ? '✅' : '❌'}</span>
              <span style={{ fontSize:'13px', color: a.correct ? '#4ade80' : '#f87171', lineHeight:1.4 }}>{a.libelle}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Results