const router = require("express").Router();
const Answer = require("../models/Answer");


//CREATE ANSWER
router.post("/", async (req, res) => {
  const newAnswer = new Answer(req.body);
  try {
    const savedAnswer = await newAnswer.save();
    res.status(200).json(savedAnswer);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE ANSWER
router.put("/:id", async (req, res) => {
  try {
        const updatedAnswer = await Answer.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedAnswer);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE ANSWER
router.delete("/:id", async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
      try {
        await answer.delete();
        res.status(200).json("Answer has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ANSWER
router.get("/:id", async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL ANSWER
router.get("/", async (req, res) => {
  
  try {
    let  answer = await Answer.find();  
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;