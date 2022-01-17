import './App.css';
import { useState,useEffect } from 'react';

function TuoteForm({lisaaTuote,nimi,maara,setNimi,setMaara}) {
  return (
    <div>
      <form onSubmit={lisaaTuote}>
        <div>
          Tuotenimi:
          <input id="nimi" 
            type="text" 
            value={nimi} 
            name="nimi" 
            onChange={({target}) => setNimi(target.value)}/>
        </div>
        <div>
          Määrä:
          <input id="maara"
            type="text"
            value={maara}
            name="maara"
            onChange={({target}) => setMaara(target.value)}/>
        </div>
        <button id="postbutton" type="submit">post</button>
      </form>
    </div>
  )
}
function YksiTuote({tuote}) {
  const [ostettu, setOstettu] = useState(false);
  const onOstettu = {
    backgroundColor: ostettu ? 'green' : '',
  }
  const osta = () => {
    setOstettu(!ostettu)
  }
  return (
    <div className='lista' style={onOstettu} onClick={osta}>
      {tuote.nimi} {tuote.maara}
    </div>
  )
}

function TuoteLista({tuotteet}) {
  return (
    <div>
      {tuotteet.map((tuote) => (
        <div key={tuote.nimi}>
          <YksiTuote tuote={tuote}/>
        </div>
      ))}
    </div>
  )
}

function App() {
  const [tuotteet, setTuotteet] = useState([/*{'nimi':'maito','maara':1},{'nimi':'kalja','maara':4}*/]);
  const [nimi, setNimi] = useState("");
  const [maara, setMaara] = useState("");
  const [value,setValue] = useState(0)
  const colors = [
    'green',
    'red',
    'blue',
    'yellow',
    'orange',
    'black'
  ]
  useEffect(() => {
     setInterval(() => {
      setValue((v) => (v === 6 ? 0: v+1))
    },1000)
  }, [])
  const vari = {color: colors[value]}

  const lisaaTuote = (e) => {
    e.preventDefault()
    //console.log('nimi',nimi, 'määrä',maara)
    setTuotteet(tuotteet.concat({
      nimi:nimi,
      maara:maara
    }))
    setTuotteet(tuotteet.concat({
      nimi: sekoittaja(nimi),
      maara: maara
    }))
  }
  const sekoittaja = (tuote) => {
    let sekoittamaton = tuote.split('')
    console.log(sekoittamaton)
    let sekoitettu = []
    let lopputulos = ''
    for (let i = 0; i < tuote.length;i++) {
      const randNum = Math.floor(Math.random()*sekoittamaton.length)
      console.log('numero', randNum)
      console.log('sekoittamaton nyt',sekoittamaton)
      console.log(i,'sekoittamaton pituus',sekoittamaton.length)
      sekoitettu.push(sekoittamaton[randNum])
      sekoittamaton.splice(randNum,1)
      console.log(sekoitettu)
    }
    lopputulos = sekoitettu.join('')
    return lopputulos
  }


  return (
    <div>
      <p style={vari}>Hassunhauska Vekkuli Ostos-lista</p>
      <p>Voit merkitä ostetut klikkaamalla</p>
      <TuoteForm lisaaTuote={lisaaTuote} nimi={nimi} maara={maara} setNimi={setNimi} setMaara={setMaara}/>
      <TuoteLista tuotteet={tuotteet}/>
    </div>
  );
  
}

export default App;
