import { useEffect, useState } from "react"
import { getCriptoUpdateUrl } from "../constants"
import { getSTATUS_UPDATES } from "../api"

import NewsCard from "./NewsCard"

// This function give us the current time in seconds
function getCurrentTime() {
  return Math.round(Date.now() / 1000)
}

/*
  Use this function with the updated_at timestamp you get from each coin item in the API response
 */
function convertToSeconds(dateValue) {
  // This guard is needed due to the API discrepancies in handling dates
  return typeof dateValue === "string"
    ? Math.round(Date.parse(dateValue) / 1000)
    : dateValue
}

export default function MainDetail({ selectedCripto }) {
  const { name, symbol, current_price, last_updated } = selectedCripto
  const [currentTime, setCurrentTime] = useState(getCurrentTime())
  const [statuses, setStatuses] = useState([])

  const updatedTimeAgo = currentTime - convertToSeconds(last_updated)

  useEffect(() => {
    getSTATUS_UPDATES().then(data => {
      setStatuses(data["status_updates"])
    })
  }, [])

  useEffect(() => {
    console.log("MainDetails is mounting")
    const intervalId = setInterval(() => setCurrentTime(getCurrentTime()), 1000)
    return () => {
      console.log("MainDetail is unmounting")
      clearInterval(intervalId)
    }
  }, [])
  return (
    <>
      <section className="main-detail__central">
        <div className="main-detail__update">
          {/* <!-- Leave this section in for the challenge --> */}
        </div>
        <div className="main-detail__name">
          <h2>{name}</h2>
          <p>
            <span className="small">a.k.a </span>btc
          </p>
        </div>
        <div className="main-detail__price">
          <p>£{current_price.toFixed(2)}</p>
          <p>Updated {updatedTimeAgo} seconds ago</p>
        </div>
      </section>
      <ul className="newsfeed">
        {statuses.map(status => (
          <NewsCard url={getCriptoUpdateUrl(status.id)} newsItem={status} />
        ))}
      </ul>
    </>
  )
}
