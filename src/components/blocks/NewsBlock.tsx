import React from 'react'
import NewsSection from '../asme/NewsSection'
import { useNews } from '../../hooks/useSanity'

const NewsBlock: React.FC = () => {
  const news = useNews()
  return <NewsSection news={news} />
}

export default NewsBlock
