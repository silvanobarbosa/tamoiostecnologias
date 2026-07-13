import { withImmune } from "./_immune.js";

function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ service: "tamoiostecnologias", time: new Date().toISOString(), conformant: true, findings: [] });
}

export default withImmune(handler);
