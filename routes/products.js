const router = require("express").Router();
const Product = require("../models/Product");


//CREATE PRODUCT
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE PRODUCT
router.put("/:id", async (req, res) => {
  try {
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
      try {
        await product.delete();
        res.status(200).json("Product has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCT
router.get("/", async (req, res) => {
  
  try {
    let  product = await Product.find();  
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
