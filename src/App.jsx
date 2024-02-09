import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [Password, setPassword]= useState("")

  //useRef hook
  const PasswordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+= "1234567890"
    if(charAllowed) str+= "!@#$%^&*-_+=[]{}~`"

    for(let i=1; i<length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const CopyPasswordToClipboard= useCallback(()=>{
    PasswordRef.current?.select();
    PasswordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect(()=> {
    passwordGenerator()
  },[ length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <>
      
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-4xl text-center text-white mb-4 font-serif' >Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
            type="text"
            value={Password}
            className="outline-none w-full py-1 px-3"
            readOnly
            ref={PasswordRef}
          />
          <button
          onClick={CopyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >copy</button>
        </div>
      <div className='flex text-sm gap-x-4 '>
          <div className='flex items-center gap-x-'>
              <input type='range'
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}
              />
              <label>Length :{length}</label>
          </div>

          <div  className="flex items-center gap-x-1">
                  <input
                  type='checkbox'
                  defaultChecked={numberAllowed}
                  id='numberInput'
                  onChange={()=>{
                    setNumberAllowed((prev)=>!prev);
                  }}
                  />
                  <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input
                type='checkbox'
                defaultChecked={charAllowed}
                id='characterInput'
                onChange={()=>{
                  setCharAllowed((prev)=>!prev);
              }}            
            />
            <label htmlFor='characterInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App