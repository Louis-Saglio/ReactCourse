import React, {useEffect, useState} from "react";


function choice(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function useTimer(initialTime, tickDelay){
  const [timeLeft, setTimeLeft] = useState(initialTime)

  useEffect(() => {
    if(timeLeft <= 0){
      return () => null
    }
    const interval = setInterval(() => {
      setTimeLeft(prevValue => {
        if(prevValue - tickDelay <= 0){
          return 0
        }
        return prevValue - tickDelay
      })
    },tickDelay)

    return () => {
      clearInterval(interval)
    }
  },[timeLeft, tickDelay])

  useEffect(() => {
    setTimeLeft(initialTime)
  },[initialTime])


  return timeLeft
}


export default function Keybr() {
  const [words, setWords] = useState(
    [
      ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'donec'],
      ['seven', 'world', 'about', 'again', 'heart', 'pizza', 'water', 'happy', 'sixty', 'board', 'month', 'Angel', 'death', 'green', 'music', 'fifty', 'three', 'party', 'piano', 'Kelly', 'mouth', 'woman', 'sugar', 'amber', 'dream', 'apple', 'laugh'],
      'perfect, Tuesday, country, pumpkin, special, America, freedom, picture, husband, monster, seventy, Melissa, nothing, jessica, sixteen, morning, journey, history, Georgia, fifteen, amazing, rihanna, January, dolphin, teacher, forever, kitchen, holiday, Madison, welcome, Jupiter, justice, diamond'.split(', '),
      'California, everything, aboveboard, Washington, basketball, weathering, characters, literature, perfection, volleyball, depression, homecoming, technology, maleficent, watermelon, appreciate, relaxation, convection, government, abominable, salmonella, strawberry, aberration, retirement, television, contraband, Alzheimers, silhouette, friendship, punishment, loneliness, university'.split(', '),
    ]
  )
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [currentTypedWord, setCurrentTypedWord] = useState("")
  const [timer, setTimer] = useState()
  const [ended, setEnded] = useState(false)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(0)
  const [currentWord, setCurrentWord] = useState(choice(words[level]))

  function onInput(event) {
    if (timer === undefined) {
      setTimer(setTimeout(loose, 5000))
    }
    if (event.target.value[currentLetterIndex] === currentWord[currentLetterIndex]) {
      setCurrentLetterIndex((prev) => prev + 1)
      setCurrentTypedWord(prev => prev + event.target.value[currentLetterIndex])
    }
    if (event.target.value === currentWord) {
      setCurrentTypedWord("")
      setCurrentLetterIndex(0)
      setCurrentWord(choice(words[level]))
      setScore(prev => prev + 1)
      clearTimeout(timer)
      setTimer(setTimeout(loose, 5000))
      if (score > 5) {
        setLevel(prev => prev + 1)
        setScore(0)
      }
    }
  }

  function loose() {
    setEnded('lost')
  }

  function renderPlayingSession() {
    return (
      <div>
        <h2>Level {level}</h2>
        <p>{currentWord}</p>
        <input value={currentTypedWord} onChange={onInput}/>
      </div>
    )
  }

  function renderEndScreen() {
    return (
      <div>
        <h2>You have {ended}</h2>
        <p>Your level is {level}</p>
        <p>Your score is {score}</p>
      </div>
    )
  }

  let html;
  if (ended) {
    html = renderEndScreen()
  } else {
    html = renderPlayingSession()
  }
  return html
}