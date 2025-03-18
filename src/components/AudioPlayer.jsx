import React, { useState, useEffect, useRef } from 'react'
import { SpeakerWaveIcon, SpeakerXMarkIcon, MusicalNoteIcon } from '@heroicons/react/24/solid'

const AudioPlayer = ({ audioSource }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showSongInfo, setShowSongInfo] = useState(false)
  const [error, setError] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (!audioSource) {
      setError(true)
      return
    }

    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.4 // Set initial volume to 40%
          await audioRef.current.play()
          setIsPlaying(true)
        }
      } catch (error) {
        console.log('Auto-play prevented:', error)
      }
    }

    // Try to play audio when component mounts
    playAudio()
  }, [audioSource])

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        await audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  if (error || !audioSource) {
    return null // Don't render the player if there's no audio file
  }

  return (
    <div 
      className="fixed bottom-4 right-4 z-50 flex items-center gap-3"
      onMouseEnter={() => setShowSongInfo(true)}
      onMouseLeave={() => setShowSongInfo(false)}
    >
      {showSongInfo && (
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg animate-fade-in">
          <p className="text-pink-600 font-medium flex items-center gap-2">
            <MusicalNoteIcon className="h-4 w-4" />
            Dandelions - Ruth B
          </p>
        </div>
      )}
      <button
        onClick={togglePlay}
        className="bg-pink-100 hover:bg-pink-200 text-pink-600 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 relative group"
      >
        {isPlaying ? (
          <SpeakerWaveIcon className="h-6 w-6" />
        ) : (
          <SpeakerXMarkIcon className="h-6 w-6" />
        )}
        <span className="absolute -top-8 right-0 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm">
          {isPlaying ? 'Pause Music' : 'Play Music'}
        </span>
      </button>
      <audio ref={audioRef} loop>
        <source src={audioSource} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}

export default AudioPlayer 