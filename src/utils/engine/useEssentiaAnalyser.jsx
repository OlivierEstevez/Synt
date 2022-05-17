import { useState, useEffect } from "react"
// import Essentia from "essentia.js/dist/essentia.js-core.es"
// import { EssentiaWASM } from "essentia.js/dist/essentia-wasm.es"

export default function useEssentiaAnalyser(file) {

    const [essentia, setEssentia] = useState(null)

    useEffect(() => {
        window.EssentiaWASM().then( function(EssentiaWasm) {
            setEssentia(new Essentia(EssentiaWasm))
        })
    }, [])

    const audioCtx = new AudioContext()

    const [audioObject, setAudioObject] = useState({})
    const [loading, setLoading] = useState(false)

    async function doEssentia(){
        setLoading(true)
        const audioBuffer = await essentia.getAudioBufferFromURL(file.preview, audioCtx)
        const channelData = audioBuffer.getChannelData(0)
        const vector = await essentia.arrayToVector(channelData)
        const key = await essentia.KeyExtractor(vector)
        const rhythm = await essentia.RhythmExtractor(vector, 1024, 1024, 256, 0.1, 208, 40, 1024, 44100, [], 0.1, false, true)
        const ticks = await essentia.vectorToArray(rhythm.ticks)
        const samples = (Math.round(audioBuffer.duration) - (Math.round(audioBuffer.duration) % 16)) * 4

        // Volume (custom method)
        const filterData = []
        const blockSize = Math.floor(channelData.length / samples)
        for(let i = 0; i < samples; i++){
            let blockStart = blockSize * i
            let sum = 0
            for(let j = 0; j < blockSize; j++){
                sum = sum + Math.abs(channelData[blockStart + j])
            }
            filterData.push(sum / blockSize)
        }
        const normalizeData = filterData.map(n => n * (Math.pow(Math.max(...filterData), -1)))

        setLoading(false)

        setAudioObject({
            // name: file.name.length,
            // size: file.size,
            // lastModified: file.lastModified,
            duration: audioBuffer.duration,
            channels: audioBuffer.numberOfChannels,
            bpm: Math.round(rhythm.bpm, 0),
            scale: key.scale,
            key: key.key.substring(0, 1),
            signature: key.key.length > 1 ? true : false,
            alternate: key.key.length > 1 ? (key.key.substring(1, 2) == "#" ? 1 : 0) : undefined,
            ticks: Array.from(ticks),
            volume: normalizeData
        })
    }

    useEffect(() => {
        if (file) { 
            doEssentia()
        }
    }, [file])

    return {
        audioObject, loading
    }
}