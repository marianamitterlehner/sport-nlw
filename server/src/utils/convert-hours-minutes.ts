// 18:00 => ['18','00'] => [18,00]

export function convertHoursMinutes(hourString: string) {
    const [hour, minutes] = hourString.split(':').map(Number)

    const minutesAmount = (hour * 60) + minutes;

    return minutesAmount;
}