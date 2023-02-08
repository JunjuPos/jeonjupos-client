import React, {useEffect, useState} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../css/calendarComponent.css'

const CalendarComponent = () => {

    const [value, onChange] = useState(new Date());

    useEffect(() => {
        //  날짜 기간 선택 시
    }, [value])

    return (
        <Calendar
            onChange={onChange}
            formatDay={(locale, date) =>
                date.toLocaleString('en', { day: 'numeric' })
            }
            selectRange={true}
            next2Label={null}
            prev2Label={null}
            showNeighboringMonth={false}
        >
            {/*<Calendar onChange={onChange} value={value} >*/}
        </Calendar>
    )
}

export default CalendarComponent;