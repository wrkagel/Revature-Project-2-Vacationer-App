export default interface Event{
    id: string
    title: string
    desc: string
    startTime: number
    endTime: number
    location: string
    status: "On Schedule" | "Cancelled"
}