const roundedValue = (value) => {
  return parseFloat(value.toFixed(2))
}

const simpleAdditiveWeighting = (criteria, alternatives) => {
  const result = []

  criteria.forEach((criterion, index) => {
    const scorePerCriteria = []
    alternatives.forEach((alternative) => {
      scorePerCriteria.push(alternative.scores[index])
    })

    const maxValue = Math.max(...scorePerCriteria)
    const minValue = Math.min(...scorePerCriteria)

    alternatives.forEach((alternative) => {
      const score = criterion.isBenefit
        ? roundedValue(alternative.scores[index] / maxValue)
        : roundedValue(minValue / alternative.scores[index])

      const resultIndex = result.findIndex((res) => res.id === alternative.id)
      if (resultIndex >= 0) {
        result[resultIndex].scores.push(roundedValue(score * criterion.weight))
      } else {
        result.push({
          id: alternative.id,
          namaCalon: alternative.namaCalon,
          date: alternative.date,
          scores: [roundedValue(score * criterion.weight)],
        })
      }
    })
  })

  result.forEach((res) => {
    res.scores = roundedValue(res.scores.reduce((acc, curr) => acc + curr, 0))
  })

  return result.sort((a, b) => {
    if (a.scores < b.scores) return 1
    if (a.scores > b.scores) return -1
    return 0
  })
}

export default simpleAdditiveWeighting
