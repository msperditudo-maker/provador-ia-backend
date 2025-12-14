import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { userImage, shirtImage } = req.body;

    if (!userImage || !shirtImage) {
      return res.status(400).json({ error: "Imagens ausentes" });
    }

    const output = await replicate.run(
      "cuuupid/idm-vton:0513734a452173b8173e907e3a59d19a36266e55b48528559432bd21c7d7e985",
      {
        input: {
          human_img: userImage,
          garm_img: shirtImage,
          garment_des: "upper_body"
        }
      }
    );

    return res.status(200).json({
      success: true,
      image: output?.[0] || output
    });

  } catch (err) {
    console.error("ERRO REAL:", err);
    return res.status(500).json({
      error: "Erro ao gerar imagem",
      details: err?.message || err
    });
  }
}
