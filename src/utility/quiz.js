import { hiraganaData } from './mock_hiragana.js'
import { data as vocabData } from './mock.js'

export function generateQuizData() {
  const combined = [...hiraganaData, ...vocabData]
  const item = combined[Math.floor(Math.random() * combined.length)]

  //soal hiragana
  if (item.char) {
    const pool = hiraganaData.map(d => d.romaji)

    return {
      pertanyaan: `Apa romaji dari "${item.char}"?`,
      jawabanBenar: item.romaji,
      pilihan: shuffle([
        item.romaji,
        ...getDistractors(item.romaji, pool)
      ])
    }
  }

  //soal kosakata
  const pool = vocabData
    .filter(d => d.kategori === item.kategori)
    .map(d => d.arti)

  return {
    pertanyaan: `Apa arti dari "${item.hiragana}" (${item.romaji})?`,
    jawabanBenar: item.arti,
    pilihan: shuffle([
      item.arti,
      ...getDistractors(item.arti, pool)
    ])
  }
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5)
}

function getDistractors(correct, pool) {
  return shuffle(pool.filter(p => p !== correct)).slice(0, 3)
}