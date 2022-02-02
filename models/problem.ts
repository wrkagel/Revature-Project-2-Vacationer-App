

export default interface problem {
    id:string,
    category: string,
    reportTime: number,
    desc: string,
    status: "new" | "reviewed"
}