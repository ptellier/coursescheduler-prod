import CurrentTimeSlot from '../3. timeslot/CurrentTimeSlot';
import NextTimeSlot from '../3. timeslot/NextTimeSlot';

const SplitCurrentNextTimeSlot = ({timeSlot}) => {
  return (
      <>
        {timeSlot.isNextTimeSlot 
            ? <NextTimeSlot section={timeSlot.section} timeSlot={timeSlot} />
            : <CurrentTimeSlot section={timeSlot.section} timeSlot={timeSlot} />
        }
    </>
  )
}

export default SplitCurrentNextTimeSlot