import CurrentTimeSlot from '../3. timeslot/CurrentTimeSlot';
import NextTimeSlot from '../3. timeslot/NextTimeSlot';

const SplitCurrentNextTimeSlot = ({timeSlot, isInOverlapGroup}) => {
  return (
      <>
        {timeSlot.isNextTimeSlot 
            ? <NextTimeSlot section={timeSlot.section} timeSlot={timeSlot} isInOverlapGroup={isInOverlapGroup} />
            : <CurrentTimeSlot section={timeSlot.section} timeSlot={timeSlot} isInOverlapGroup={isInOverlapGroup} />
        }
    </>
  )
}

export default SplitCurrentNextTimeSlot