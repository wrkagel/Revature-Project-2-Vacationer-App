export default interface Problem {
  id: string;
  category: string;
  reportTime: number;
  desc: string;
  status: "new" | "reviewed";
}
