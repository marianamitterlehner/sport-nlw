// 1080 -> 18:00

export function convertMinutesHours(min: number) {
    const hours = Math.floor(min / 60);
    const minutes = min % 60;

   return `${String(hours).padStart(2,'0')} : ${String(minutes).padStart(2,'0')} `
}