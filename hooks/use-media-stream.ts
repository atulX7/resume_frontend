import { useState, useEffect } from 'react'

export function useMediaStream() {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [hasPermission, setHasPermission] = useState(false)

  const requestPermission = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      setStream(mediaStream)
      setHasPermission(true)
      return true
    } catch (error) {
      console.error('Error accessing media devices:', error)
      setHasPermission(false)
      return false
    }
  }

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  return { stream, hasPermission, requestPermission }
}