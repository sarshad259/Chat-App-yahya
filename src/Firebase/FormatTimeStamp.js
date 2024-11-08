export const FormatTimestamp = (timestamp) => {

    const date = new Date(timestamp?.seconds * 1000 + Math.floor(timestamp?.nanoseconds / 1000000));
  
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    const weekdayOptions = { weekday: 'short' };
  
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
  
    const formattedWeekday = date.toLocaleDateString('en-US', weekdayOptions);
  
    return `${formattedTime} ${formattedWeekday}`;
  };
  