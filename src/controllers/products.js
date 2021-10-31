exports.createProduct = (req, res, next) => {
    console.log(req.body)
  res.json({ 
      message: "Success Create Product", 
      data: [
          {
              id: 1,
              nama: req.body.name,
              harga : req.body.harga
          }
      ] });
  next();
};

exports.getAllProducts = (req,res,next)=>{
    res.json({
        message: "Success Get All Products",
        data: [
            {
                id:1,
                nama:"Burger",
                harga:5000
            }
        ]
    })
}
