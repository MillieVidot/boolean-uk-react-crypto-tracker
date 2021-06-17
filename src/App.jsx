import { useEffect, useState } from "react"

import MainDetail from "./components/MainDetail"
import SideListItem from "./components/SideListItem"
import { getCRIPTO_LIST } from "./api"

function App() {
  const [criptoList, setCriptoList] = useState([])
  // This piece of state keeps the id from the selected coin to be displayed in the MainDetail component
  const [selectedCriptoID, setSelectedCriptoID] = useState(null)

  const selectedCripto = criptoList.find(item => item.id === selectedCriptoID)
  console.log("selectedCriptoID", selectedCriptoID)

  // This function gives you whether a coin has been selected or not
  // You will need this for the SideListItem component
  function isSelectedCripto(id) {
    return selectedCriptoID === id
  }

  useEffect(() => {
    getCRIPTO_LIST().then(setCriptoList)
  }, [])

  return (
    /* These (<> </>) are called React Fragments, and allow us to return more than one top element */
    <>
      <aside className="side-list">
        <ul>
          {criptoList.map(item => (
            <SideListItem
              key={item.id}
              isSelectedCripto={isSelectedCripto}
              selectCripto={setSelectedCriptoID}
              item={item}
            />
          ))}
        </ul>
      </aside>
      <main className="main-detail">
        {selectedCriptoID ? (
          <MainDetail selectedCripto={selectedCripto} />
        ) : (
          "Select a coin bro!"
        )}
      </main>
    </>
  )
}

export default App
