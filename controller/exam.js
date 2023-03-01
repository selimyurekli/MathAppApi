
const getTest = async function(req,res, next){

    const test1 = {
        "questions":[
            {"index":"1","image":"questions/selim.jpeg","correctAnswer":"A", "subject":"Reel Sayılar"},
            {"index":"2","image":"questions/selim.jpeg","correctAnswer":"A", "subject":"Reel Sayılar"},
            {"index":"3","image":"questions/selim.jpeg","correctAnswer":"A", "subject":"Reel Sayılar"},
            {"index":"4","image":"questions/selim.jpeg","correctAnswer":"A", "subject":"Reel Sayılar"}
        ]
    };

    const index = req.params.index;
    res.status(200).json({success:true, test:test1});


}

export {getTest};
