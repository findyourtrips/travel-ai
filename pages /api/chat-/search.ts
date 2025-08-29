import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;

  const mockResults = [
    { title: "Flight: New York → Miami", description: "Next available flight at 10:30 AM, $220" },
    { title: "Hotel in Miami Beach", description: "3-star stay from $90/night" },
    { title: "Cab from Airport", description: "UberX $35, available in 5 min" },
    { title: "Event: Miami Live Concert", description: "Tonight, tickets from $45" },
  ];

  res.status(200).json({ query: q, results: mockResults });
}
