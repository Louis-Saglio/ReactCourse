import React, {useEffect, useState, useCallback} from "react";


function choice(array) {
  return array[Math.floor(Math.random() * array.length)]
}

const words = [
  ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'donec'],
  ['seven', 'world', 'about', 'again', 'heart', 'pizza', 'water', 'happy', 'sixty', 'board', 'month', 'Angel', 'death', 'green', 'music', 'fifty', 'three', 'party', 'piano', 'Kelly', 'mouth', 'woman', 'sugar', 'amber', 'dream', 'apple', 'laugh'],
  'perfect, Tuesday, country, pumpkin, special, America, freedom, picture, husband, monster, seventy, Melissa, nothing, jessica, sixteen, morning, journey, history, Georgia, fifteen, amazing, rihanna, January, dolphin, teacher, forever, kitchen, holiday, Madison, welcome, Jupiter, justice, diamond'.split(', '),
  'California, everything, aboveboard, Washington, basketball, weathering, characters, literature, perfection, volleyball, depression, homecoming, technology, maleficent, watermelon, appreciate, relaxation, convection, government, abominable, salmonella, strawberry, aberration, retirement, television, contraband, Alzheimers, silhouette, friendship, punishment, loneliness, university'.split(', '),
]


export default function Keybr() {
  const [typedWord, setTypedWord] = useState("")
  const [timer, setTimer] = useState(5)
  const [level, setLevel] = useState(0)
  const [score, setScore] = useState(0)
  const [state, setState] = useState("running")

  const getWord = useCallback(
    () => {
      let chosenWord;
      if (level < words.length) {
        chosenWord = choice(words[level])
      } else {
        chosenWord = ""
      }
      return chosenWord
    },
    [level]
  )

  const [word, setWord] = useState(getWord())

  useEffect(() => {
    const interval = setInterval(() => {setTimer(prev => {
      if (prev > 0) { return prev - 1 } else {return 0}
    })}, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (timer === 0) {
      setState("lost")
    }
  }, [timer])

  useEffect(() => {
    if (score === 5) {
      setScore(0)
      setLevel(prev => prev + 1)
    }
  }, [score])

  useEffect(
    () => {
      if (level === words.length + 1) {
        setState("won")
      }
    },
    [level]
  )

  useEffect(
    () => {
      if (typedWord !== word.slice(0, typedWord.length)) {
        setTypedWord(prev => prev.slice(0, -1))
      } else if (typedWord === word) {
        setTypedWord('')
        setWord(getWord())
        setTimer(5)
        setScore(prev => prev + 1)
      }
    },
    [typedWord, word, getWord]
  )

  function renderRunningGame() {
    return <div>
      <p>{word}</p>
      <input value={typedWord} onChange={event => setTypedWord(event.target.value)}/> {timer}
    </div>
  }

  return <div>
    {state === "running" ? renderRunningGame() : state}
    <p>Score : {score} / 5</p>
    <p>Level : {level}</p>
  </div>
}