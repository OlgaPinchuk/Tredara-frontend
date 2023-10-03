import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateTimeSelector({ selectedDate, setSelectedDate }) {
  const [minDate, setMinimumDate] = useState();
  const [maxDate, setMaximumDate] = useState();

  useEffect(() => {
    setMinimumDate(getMinimumDateTime());
    setMaximumDate(getMaximumDateTime());
  }, []);

  const getMinimumDateTime = () => {
    const currentDate = new Date();

    // Add 1 hour to the current time
    currentDate.setHours(currentDate.getHours() + 1);
    return currentDate;
  };

  const getMaximumDateTime = () => {
    const currentDate = new Date();

    // Add 3 days to the current time
    currentDate.setDate(currentDate.getDate() + 3);
    return currentDate;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filterPassedTime = (time) => {
    const currentDateTime = new Date();

    const currentDate = new Date();
    const selectedDate = new Date(time);
    currentDate.setHours(currentDate.getHours() + 1);

    const maxDate = new Date();
    maxDate.setDate(currentDateTime.getDate() + 3);
    maxDate.setHours(new Date().getHours());

    return (
      currentDate.getTime() < selectedDate.getTime() &&
      maxDate.getTime() > selectedDate.getTime()
    );
  };

  return minDate && maxDate ? (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="MMMM d, yyyy h:mm aa"
      minDate={minDate}
      maxDate={maxDate}
      filterTime={filterPassedTime}
      placeholderText="Select date and time"
    />
  ) : (
    <div>
      <label>loading</label>
    </div>
  );
}

export default DateTimeSelector;
