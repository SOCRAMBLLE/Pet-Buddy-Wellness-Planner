import "./Calendar.css";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import CalendarModule from "react-calendar";
import Time from "./Time.js";

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);

  return (
    <>
      <h1 className="header">React Calendar</h1>
      <div>
        <CalendarModule
          onChange={setDate}
          value={date}
          onClickDay={() => setShowTime(true)}
          locale="en-EN"
        />
      </div>

      {date.length > 0 ? (
        <p>
          <span>Start:</span>
          {date[0].toDateString()}
          &nbsp; &nbsp;
          <span>End:</span>
          {date[1].toDateString()}
        </p>
      ) : (
        <p>
          <span>Selected date: </span>
          {date.toDateString()}
        </p>
      )}
      <Time showTime={showTime} date={date} />
    </>
  );
};

export default Calendar;
