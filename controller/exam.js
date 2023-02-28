import test1 from "../test1.json"  assert { type: 'json' }


const getTest = async function(req,res, next){

    const index = req.params.index;
    res.status(200).json({success:true, test:test1});


}

export {getTest};
