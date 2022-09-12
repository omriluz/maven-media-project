import React, { useEffect, useState } from "react"
import items from "../api.json"

const ItemList = () => {
  const minPickableTime = new Intl.DateTimeFormat("fr-CA").format(new Date())
  const [date, setDate] = useState(minPickableTime)
  const [currWeekDay, setCurrWeekDay] = useState(new Date(date).getDay() + 1)
  const [filteredItems, setFilteredItems] = useState()

  useEffect(() => {
    setCurrWeekDay(new Date(date).getDay() + 1)
  }, [date])

  useEffect(() => {
    itemsToShow()
  }, [currWeekDay])

  const twoWeeks = new Date(Date.now() + 12096e5)
  const maxPickableTime = new Intl.DateTimeFormat("fr-CA").format(twoWeeks)

  const handleDateChange = ({ target }) => {
    console.log(target.valueAsDate)
    setDate(target.value)
  }

  const itemsToShow = () => {
    const itemsAfterFilter = items?.data?.filter((item) => {
      if (item.times.excludeDates.length) {
        let formattedDate = item.times.excludeDates[0].date
        if (formattedDate.split("T")[0] === date) return false
      }
      const preparedDaysOfWeek = item.times.available_days_of_week.map((day) =>
        (day + 1) % 7 === 0 ? 7 : (day + 1) % 7
      )
      return preparedDaysOfWeek.includes(currWeekDay)
    })
    setFilteredItems(itemsAfterFilter)
  }

  return (
    <div className="flex flex-col w-5/6 gap-10">
      <div className="flex items-center justify-center">
      <input
        type="date"
        value={date}
        name=""
        id=""
        onChange={handleDateChange}
        min={minPickableTime}
        max={maxPickableTime}
      />
      </div>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 place-items-center">
        {filteredItems &&
          filteredItems.map((item) => (
            <div
              key={item?.id}
              className="flex flex-col items-center justify-center"
            >
              <h3 className="text-lg font-semibold text-gray-600">
                {item?.name}
              </h3>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ItemList
