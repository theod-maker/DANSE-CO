import React from 'react'
import NewsSection from '../asme/NewsSection'
import { fallbackDisciplines, fallbackVenues, fallbackSiteInfo, fallbackNews, fallbackInstructors, fallbackPricing } from '../../lib/fallbackContent'

const NewsBlock: React.FC = () => {
  const news = fallbackNews
  return <NewsSection news={news} />
}

export default NewsBlock
