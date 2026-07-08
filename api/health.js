import { withImmune } from "./_immune";

function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ service: "tamoiostecnologias", status: "up", time: new Date().toISOString() });
}

export default withImmune(handler);
