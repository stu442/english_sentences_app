import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSentenceStore } from "@/store/sentence"
import { Volume2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Progress } from '../components/ui/progress'

export default function FlashcardPage() {
  const { sentences, fetchSentences, updateSentence } = useSentenceStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    fetchSentences()
  }, [fetchSentences])

  useEffect(() => {
    const activeCount = sentences.filter(s => s.status === 1).length
    const totalActive = sentences.filter(s => s.status === 0 || s.status === 1).length
    setProgress(totalActive > 0 ? (activeCount / totalActive) * 100 : 0)
  }, [sentences])

  const handleLearn = async () => {
    const currentSentence = sentences[currentIndex]
    await updateSentence({
      id: currentSentence.id,
      status: 2
    })
    
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleListen = () => {
    const expression = encodeURIComponent(sentences[currentIndex].content)
    window.open(`https://youglish.com/pronounce/${expression}/english?`)
  }

  const handleNextExpression = () => {
    let nextIndex = currentIndex + 1
    while (nextIndex < sentences.length && sentences[nextIndex].status === 2) {
      nextIndex++
    }
    if (nextIndex < sentences.length) {
      setCurrentIndex(nextIndex)
    }
  }

  const handlePreviousExpression = () => {
    let prevIndex = currentIndex - 1
    while (prevIndex >= 0 && sentences[prevIndex].status === 2) {
      prevIndex--
    }
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex)
    }
  }

  if (sentences.length === 0) {
    return <div>로딩 중...</div>
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Learn Expressions</h1>

      <Card className="w-full max-w-2xl mx-auto py-5">
        <CardContent className="text-center">
          <p className="text-2xl font-semibold my-4">{sentences[currentIndex].content}</p>
          <div className="flex justify-between items-center">
            <Button onClick={handlePreviousExpression} disabled={currentIndex === 0}>Previous</Button>
            <span>{currentIndex + 1} / {sentences.length}</span>
            <Button onClick={handleNextExpression} disabled={currentIndex === sentences.length - 1}>Next</Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleLearn} disabled={sentences[currentIndex].status === 1}>
            {sentences[currentIndex].status === 1 ? 'Learned' : 'Learn'}
          </Button>
          <Button onClick={handleListen} variant="outline">
            <Volume2 className="mr-2 h-4 w-4" /> Listen on YouGlish
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Learning Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full" />
          <p className="text-center mt-2">{progress.toFixed(0)}% of today&apos;s learning goal achieved</p>
        </CardContent>
      </Card>
    </div>
  )
}