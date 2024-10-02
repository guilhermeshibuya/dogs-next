'use client'

import { useEffect, useState } from 'react'
import { VictoryPie, VictoryChart, VictoryBar } from 'victory'
import { StatsData } from '@/types/stats-data'
import styles from './conta-estatisticas.module.css'

type ChartData = {
  x: string
  y: number
}

export default function ContaEstatisticas({ data }: { data: StatsData[] }) {
  const [chart, setChart] = useState<ChartData[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const chartData = data.map((item) => {
      return {
        x: item.title,
        y: Number(item.acessos),
      }
    })

    setTotal(
      data.map(({ acessos }) => Number(acessos)).reduce((a, b) => a + b, 0),
    )
    setChart(chartData)
  }, [data])

  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total}</p>
      </div>
      <div className={styles.graphItem}>
        <VictoryPie
          data={chart}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: ' #fff',
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: '#333',
            },
          }}
        />
      </div>
      <div className={styles.graphItem}>
        <VictoryChart>
          <VictoryBar data={chart} alignment="start" />
        </VictoryChart>
      </div>
    </section>
  )
}
